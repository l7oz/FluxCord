/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * The extension hooks most FluxCord plugins are built on, each patched once and shared:
 *  - onSend: change, or stop, a message before it is sent or edited
 *  - onMessageRow: change how a message is drawn in the chat
 *  - addMessageAction: a row in the message long-press sheet
 *  - command: a slash command whose texts are translated
 * Every callback is isolated: one that throws is logged and skipped, the rest still run.
 */

import { t } from "@core/i18n";
import { findAssetId } from "@lib/api/assets";
import { registerCommand } from "@lib/api/commands";
import { ApplicationCommandOptionType, Argument, CommandContext } from "@lib/api/commands/types";
import { intercept } from "@lib/api/flux";
import { after, instead } from "@lib/api/patcher";
import { showToast } from "@lib/ui/toasts";
import { findByName, findByProps } from "@metro";
import { clipboard, messageUtil } from "@metro/common";
import { ActionSheet, ActionSheetRow } from "@metro/common/components";
import type { ReactElement, ReactNode } from "react";
import { Linking, Share } from "react-native";

import { dispatchSoon, getStore, moduleAt } from "./common";

export const MessageActions = () => findByProps("sendMessage", "editMessage");
export const ReactionActions = () => findByProps("addReaction", "removeReaction") ?? moduleAt("actions/ReactionActionCreators.tsx")?.default;
export const HTTP = () => findByProps("getAPIBaseURL", "get");

export async function api(method: "get" | "post" | "patch" | "put" | "del", url: string, body?: unknown): Promise<any> {
    const http = HTTP();
    if (!http?.[method]) throw new Error("Discord's HTTP module wasn't found");
    const res = await http[method]({ url, body, oldFormErrors: true });
    return res?.body ?? res;
}

export function describeError(e: unknown): string {
    if (e instanceof Error) return e.message;
    const error = e as any;
    const message = error?.body?.message ?? error?.message ?? error?.text;
    if (typeof message === "string" && message) return message;
    if (typeof error?.status === "number") return t("The request failed ({status})", { status: error.status });
    return String(e);
}

export const toastError = (e: unknown) => void showToast(describeError(e), findAssetId("CircleXIcon-primary"));

export const currentChannelId = (): string | undefined => getStore("SelectedChannelStore")?.getChannelId?.();
export const getChannel = (id?: string) => (id ? getStore("ChannelStore")?.getChannel?.(id) : undefined);
export const getUser = (id?: string) => (id ? getStore("UserStore")?.getUser?.(id) : undefined);
export const getGuild = (id?: string) => (id ? getStore("GuildStore")?.getGuild?.(id) : undefined);

export function displayName(user: any): string {
    if (!user) return "?";
    return user.globalName ?? user.global_name ?? user.username ?? user.id;
}

export function botMessage(channelId: string, content: string) {
    messageUtil?.sendBotMessage?.(channelId, content);
}

export function copy(text: string, message?: string) {
    clipboard.setString(text);
    showToast(message ?? t("Copied to clipboard"), findAssetId("CopyIcon") ?? findAssetId("LinkIcon"));
}

export function openUrl(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        showToast(t("This isn't a web link, so it wasn't opened"), findAssetId("CircleXIcon-primary"));
        return Promise.resolve();
    }
    return Linking.openURL(url);
}

export const MAX_SHARE_LENGTH = 200_000;

export function share(message: string, title?: string) {
    if (message.length > MAX_SHARE_LENGTH) throw new Error(t("This is too long to share at once ({size} characters)", { size: message.length.toLocaleString() }));
    return Share.share({ message, title });
}

export function generatedIcon(name: string) {
    return moduleAt(`design/components/Icon/native/redesign/generated/${name}.tsx`)?.[name];
}

let nextSoundId = 7300;

export function playSound(url: string, volume = 1) {
    const player = (globalThis as any).NativeModules?.DCDSoundManager;
    if (typeof player?.prepare !== "function") return;
    const id = nextSoundId++;
    player.prepare(url, "music", id, (error: unknown, sound?: { duration?: number; }) => {
        if (error) return;
        player.setVolume?.(id, Math.min(Math.max(volume, 0), 1));
        player.play(id);
        setTimeout(() => player.release?.(id), (sound?.duration ?? 5) * 1000 + 2000);
    });
}

export function nativeColor(color: string): number | undefined {
    const value = (globalThis as any).processColor?.(color);
    return typeof value === "number" ? value : undefined;
}

export function send(channelId: string, content: string, options: Record<string, unknown> = {}) {
    return MessageActions()?.sendMessage(channelId, { content, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] }, undefined, options);
}

export function insertText(channelId: string, text: string): boolean {
    const input = findByProps("getBestActiveInputForChannelId")?.getBestActiveInputForChannelId?.(channelId);
    if (typeof input?.insertText !== "function") return false;
    input.insertText(text);
    return true;
}

export function edit(channelId: string, messageId: string, content: string) {
    return MessageActions()?.editMessage(channelId, messageId, { content });
}

export function deleteMessage(channelId: string, messageId: string) {
    return MessageActions()?.deleteMessage(channelId, messageId);
}

export interface Emoji {
    id?: string | null;
    name: string;
    animated?: boolean;
}

export function parseEmoji(text: string): Emoji | undefined {
    const custom = text.trim().match(/^<(a?):(\w+):(\d+)>$/);
    if (custom) return { id: custom[3], name: custom[2], animated: !!custom[1] };
    const trimmed = text.trim();
    return trimmed ? { id: null, name: trimmed } : undefined;
}

export function react(channelId: string, messageId: string, emoji: Emoji) {
    return ReactionActions()?.addReaction(channelId, messageId, { id: emoji.id ?? null, name: emoji.name, animated: !!emoji.animated });
}

export function loadedMessages(channelId: string): any[] {
    const messages = getStore("MessageStore")?.getMessages?.(channelId);
    return messages?.toArray?.() ?? messages?._array ?? [];
}

export function jumpTo(channelId: string, messageId: string) {
    const jumper = MessageActions()?.jumpToMessage ? MessageActions() : findByProps("jumpToMessage");
    jumper?.jumpToMessage?.({ channelId, messageId, flash: true, returnMessageId: undefined });
}

export function messageLink(channelId: string, messageId: string) {
    const guildId = getChannel(channelId)?.guild_id;
    return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}/${messageId}`;
}

export function parseMessageLink(link: string) {
    const match = link.match(/discord(?:app)?\.com\/channels\/(@me|\d+)\/(\d+)\/(\d+)/);
    return match ? { guildId: match[1] === "@me" ? undefined : match[1], channelId: match[2], messageId: match[3] } : undefined;
}

export const snowflakeTime = (id: string) => Math.floor(Number(id) / 4194304) + 1420070400000;

export function localDay(ms = Date.now()) {
    const date = new Date(ms);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const localSnowflake = () => String(BigInt(Date.now() - 1420070400000) << 22n | BigInt(Math.floor(Math.random() * 4194304)));

export function receiveLocalMessage(channelId: string, message: Record<string, any>) {
    (MessageActions()?.receiveMessage ?? messageUtil?.receiveMessage)?.(channelId, message);
}

export interface SendContext {
    channelId: string;
    editing: boolean;
    message: { content: string; [key: string]: any; };
    options?: { flags?: number; allowedMentions?: any; messageReference?: any; [key: string]: any; };
}

export type SendTransform = (content: string, ctx: SendContext) => string | void | null | Promise<string | void | null>;

const transforms = new Map<string, { order: number; fn: SendTransform; }>();
let unpatchSend: (() => void) | null = null;

export async function runTransforms(channelId: string, message: any, editing: boolean, options?: SendContext["options"]): Promise<boolean> {
    if (!message || typeof message.content !== "string") return true;
    const sorted = [...transforms.entries()].sort((a, b) => a[1].order - b[1].order);
    for (const [key, { fn }] of sorted) {
        try {
            const result = await fn(message.content, { channelId, editing, message, options });
            if (result === null) return false;
            if (typeof result === "string") message.content = result;
        } catch (e) {
            console.error(`[FluxCord] ${key} couldn't process a message`, e);
        }
    }
    return true;
}

function patchSend() {
    if (unpatchSend) return;
    const actions = MessageActions();
    if (!actions) throw new Error("Discord's message actions weren't found");
    const unpatches = [
        instead("sendMessage", actions, async function (this: any, args: any[], original: any) {
            if (args[3] == null || typeof args[3] !== "object") args[3] = {};
            if (!(await runTransforms(args[0], args[1], false, args[3]))) return;
            return original.apply(this, args);
        }),
        instead("editMessage", actions, async function (this: any, args: any[], original: any) {
            if (!(await runTransforms(args[0], args[2], true))) return;
            return original.apply(this, args);
        }),
    ];
    unpatchSend = () => unpatches.forEach(u => u());
}

export function onSend(key: string, fn: SendTransform, order = 0) {
    patchSend();
    transforms.set(key, { order, fn });
    return () => {
        transforms.delete(key);
        if (!transforms.size) {
            unpatchSend?.();
            unpatchSend = null;
        }
    };
}

export function outsideCode(content: string, fn: (text: string) => string): string {
    return content.split(/(```[\s\S]*?```|`[^`\n]*`)/g).map((part, i) => i % 2 ? part : fn(part)).join("");
}

export type IncomingFilter = (message: any) => any;

const MESSAGE_LISTS = new Set(["LOAD_MESSAGES_SUCCESS", "LOAD_MESSAGES_SUCCESS_CACHED", "LOCAL_MESSAGES_LOADED", "LOAD_MESSAGES_AROUND_SUCCESS", "LOAD_RECENT_MENTIONS_SUCCESS"]);
const incomingFilters = new Map<string, IncomingFilter>();
let unpatchIncoming: (() => void) | null = null;

function filterMessage(message: any): any {
    let current = message;
    for (const [key, fn] of incomingFilters) {
        try {
            const result = fn(current);
            if (result === null) return null;
            if (result && typeof result === "object") current = result;
        } catch (e) {
            console.error(`[FluxCord] ${key} couldn't check a message`, e);
        }
    }
    return current;
}

export function onIncomingMessage(key: string, fn: IncomingFilter) {
    if (!unpatchIncoming) {
        const unpatches = [
            intercept(payload => {
                if (!payload.message) return;
                const result = filterMessage(payload.message);
                if (result === null) return false;
                return result !== payload.message ? { message: result } : undefined;
            }, { type: "MESSAGE_CREATE" }),
            ...[...MESSAGE_LISTS].map(type => intercept(payload => {
                if (!Array.isArray(payload.messages)) return;
                let changed = false;
                const messages = payload.messages.flatMap((m: any) => {
                    const result = filterMessage(m);
                    if (result !== m) changed = true;
                    return result === null ? [] : [result];
                });
                return changed ? { messages } : undefined;
            }, { type })),
        ];
        unpatchIncoming = () => unpatches.forEach(u => u());
    }
    incomingFilters.set(key, fn);
    return () => {
        incomingFilters.delete(key);
        if (!incomingFilters.size) {
            unpatchIncoming?.();
            unpatchIncoming = null;
        }
    };
}

export function hideLocally(channelId: string, messageId: string) {
    dispatchSoon({ type: "MESSAGE_DELETE", id: messageId, channelId, fluxcordLocal: true });
}

export type RowDecorator = (row: any, message: any) => void;

const MESSAGE_ROW = 1;
const ROW_CHANGED = 2;
const decorators = new Map<string, RowDecorator>();
const decoratorOrder = new Map<string, number>();
let ordered: Array<[string, RowDecorator]> = [];
const needsRedraw = new Set<string>();

export const RowOrder = { REPLACE: -20, ADJUST: -10, ADD: 0, OVERRIDE: 10, HIDE: 100 } as const;

function sortDecorators() {
    ordered = [...decorators].sort(([a], [b]) => (decoratorOrder.get(a) ?? 0) - (decoratorOrder.get(b) ?? 0));
}
let unpatchRows: (() => void) | null = null;

export function redrawMessage(channelId: string, messageId: string) {
    needsRedraw.add(messageId);
    dispatchSoon({ type: "MESSAGE_UPDATE", message: { id: messageId, channel_id: channelId } });
}

let redrawQueued = false;

export function redrawChannel() {
    if (redrawQueued) return;
    redrawQueued = true;
    setTimeout(() => {
        redrawQueued = false;
        const channelId = currentChannelId();
        if (!channelId) return;
        for (const message of loadedMessages(channelId).slice(-60)) redrawMessage(channelId, message.id);
    }, 100);
}

export function onMessageRow(key: string, fn: RowDecorator, order: number = RowOrder.ADD) {
    if (!unpatchRows) {
        const RowManager = findByName("RowManager");
        if (typeof RowManager?.prototype?.generate !== "function") throw new Error("Discord's message rows weren't found");
        unpatchRows = after("generate", RowManager.prototype, ([args], row) => {
            const message = row?.type === MESSAGE_ROW ? row.message : undefined;
            if (!message || !args?.message) return;
            if (needsRedraw.delete(message.id)) row.changeType = ROW_CHANGED;
            for (const [k, decorate] of ordered) {
                try {
                    decorate(message, args.message);
                } catch (e) {
                    console.error(`[FluxCord] ${k} couldn't decorate a message`, e);
                }
            }
        });
    }
    decorators.set(key, fn);
    decoratorOrder.set(key, order);
    sortDecorators();
    redrawChannel();
    return () => {
        if (decorators.get(key) !== fn) return;
        decorators.delete(key);
        decoratorOrder.delete(key);
        sortDecorators();
        redrawChannel();
        setTimeout(() => {
            if (decorators.size) return;
            unpatchRows?.();
            unpatchRows = null;
            needsRedraw.clear();
        }, 1000);
    };
}

export const textNode = (content: string) => ({ type: "text", content });

export function appendToTimestamp(row: any, text: string) {
    if (typeof row.timestamp === "string" && text && !row.timestamp.endsWith(text)) row.timestamp = `${row.timestamp}${text}`;
}

export interface MessageAction {
    key: string;
    label: (message: any, channel: any) => string;
    icon: string;
    danger?: boolean;
    visible?: (message: any, channel: any) => boolean;
    onPress: (message: any, channel: any) => void;
}

const messageActions = new Map<string, MessageAction>();
let unpatchSheet: (() => void) | null = null;

function findSheet(element: any): any {
    if (!element || typeof element !== "object") return;
    if (Array.isArray(element)) {
        for (const child of element) {
            const found = findSheet(child);
            if (found) return found;
        }
        return;
    }
    if (element.type === ActionSheet) return element;
    return findSheet(element.props?.children);
}

function hideSheet() {
    findByProps("openLazy", "hideActionSheet")?.hideActionSheet?.();
}

function FluxCordActions({ message, channel }: { message: any; channel: any; }) {
    const rows: ReactNode[] = [];
    for (const action of messageActions.values()) {
        try {
            if (action.visible && !action.visible(message, channel)) continue;
            const Icon = generatedIcon(action.icon);
            rows.push(<ActionSheetRow
                key={action.key}
                label={action.label(message, channel)}
                variant={action.danger ? "danger" : undefined}
                icon={Icon ? <ActionSheetRow.Icon IconComponent={Icon} /> : undefined}
                onPress={() => {
                    hideSheet();
                    try {
                        action.onPress(message, channel);
                    } catch (e) {
                        console.error(`[FluxCord] ${action.key} failed`, e);
                    }
                }}
            />);
        } catch (e) {
            console.error(`[FluxCord] ${action.key} couldn't be shown`, e);
        }
    }
    if (!rows.length) return null;
    return <ActionSheetRow.Group>{rows}</ActionSheetRow.Group>;
}

export function addMessageAction(action: MessageAction) {
    if (!unpatchSheet) {
        const module = findByName("LongPressMessageActionSheet", false)
            ?? moduleAt("modules/messages/native/long_press/LongPressMessageActionSheet.tsx");
        if (typeof module?.default !== "function") throw new Error("Discord's message sheet wasn't found");
        unpatchSheet = instead("default", module, (args: any[], Sheet: Function) => {
            const tree = Reflect.apply(Sheet, undefined, args) as ReactElement;
            try {
                const [{ message, channel }] = args;
                const sheet = findSheet(tree);
                if (sheet && message) {
                    const children = [sheet.props.children].flat().filter(Boolean);
                    children.push(<FluxCordActions key="fluxcord-actions" message={message} channel={channel} />);
                    sheet.props.children = children;
                }
            } catch (e) {
                console.error("[FluxCord] couldn't add to the message sheet", e);
            }
            return tree;
        });
    }
    messageActions.set(action.key, action);
    return () => {
        messageActions.delete(action.key);
        if (!messageActions.size) {
            unpatchSheet?.();
            unpatchSheet = null;
        }
    };
}

export interface CommandOption {
    name: string;
    description: string;
    type?: "string" | "integer" | "number" | "boolean" | "user" | "channel" | "role";
    required?: boolean;
    choices?: { name: string; value: string | number; }[];
}

const OPTION_TYPES = {
    string: ApplicationCommandOptionType.STRING,
    integer: ApplicationCommandOptionType.INTEGER,
    number: ApplicationCommandOptionType.NUMBER,
    boolean: ApplicationCommandOptionType.BOOLEAN,
    user: ApplicationCommandOptionType.USER,
    channel: ApplicationCommandOptionType.CHANNEL,
    role: ApplicationCommandOptionType.ROLE,
};

export type CommandArgs = Record<string, any>;

export function command(def: {
    name: string;
    description: string;
    options?: CommandOption[];
    run: (args: CommandArgs, ctx: CommandContext) => unknown;
}) {
    return registerCommand({
        name: def.name,
        description: t(def.description),
        options: (def.options ?? []).map(o => ({
            name: o.name,
            description: t(o.description),
            type: OPTION_TYPES[o.type ?? "string"],
            required: o.required ?? false,
            choices: o.choices?.map(c => ({ name: c.name, displayName: c.name, value: c.value })),
        })) as any,
        async execute(raw: Argument[], ctx: CommandContext) {
            const args: CommandArgs = {};
            for (const a of raw ?? []) args[a.name] = a.value;
            try {
                const result = await def.run(args, ctx);
                if (typeof result === "string") return { content: result };
                if (result && typeof result === "object") return result as any;
            } catch (e) {
                botMessage(ctx.channel.id, t("Something went wrong: {error}", { error: describeError(e) }));
            }
        },
    });
}

export const hookCounts = () => ({
    sendTransforms: transforms.size,
    incomingFilters: incomingFilters.size,
    rowDecorators: decorators.size,
    messageActions: messageActions.size,
});

export const hookRegistries = () => ({ transforms, incomingFilters, decorators, messageActions });
