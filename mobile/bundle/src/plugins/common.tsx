/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Helpers shared by FluxCord's plugins. Everything that touches Discord's modules is resolved lazily and tolerates
 * the module not being there, so a Discord update can turn a feature off but never crash the app.
 */

import { Strings } from "@core/i18n";
import { findAssetId } from "@lib/api/assets";
import { intercept } from "@lib/api/flux";
import { after } from "@lib/api/patcher";
import { findByFilePath, findByStoreName } from "@metro";
import { FluxDispatcher } from "@metro/common";
import { addSectionRow } from "@ui/settings";
import type { ComponentType, ReactElement } from "react";

const storeCache = new Map<string, any>();

export function getStore<T = any>(name: string): T | undefined {
    if (!storeCache.has(name)) {
        const store = findByStoreName(name);
        if (!store) return undefined;
        storeCache.set(name, store);
    }
    return storeCache.get(name);
}

export const currentUserId = (): string | undefined => getStore("UserStore")?.getCurrentUser?.()?.id;

export function guildRoles(guildId: string): Record<string, any> {
    const roleStore = getStore("GuildRoleStore");
    return roleStore?.getRoles?.(guildId)
        ?? roleStore?.getUnsafeMutableRoles?.(guildId)
        ?? getStore("GuildStore")?.getGuild?.(guildId)?.roles
        ?? {};
}

export function onAction<P extends Record<string, any> = Record<string, any>>(type: string, cb: (payload: P & { type: string; }) => unknown, options?: { first?: boolean; }) {
    return intercept(payload => cb(payload as any), { ...options, type });
}

export function subscribe(type: string, cb: (payload: any) => void) {
    const listener = (payload: any) => {
        try {
            cb(payload);
        } catch (e) {
            console.error(`[FluxCord] ${type} listener failed`, e);
        }
    };
    FluxDispatcher.subscribe(type, listener);
    return () => FluxDispatcher.unsubscribe(type, listener);
}

export function dispatchSoon(action: Record<string, any>) {
    setTimeout(() => {
        try {
            FluxDispatcher.dispatch(action);
        } catch (e) {
            console.error(`[FluxCord] dispatching ${action.type} failed`, e);
        }
    }, 0);
}

export function moduleAt<T = any>(path: string): T | undefined {
    return findByFilePath(path) as T | undefined;
}

interface ChatButton {
    key: string;
    side: () => "left" | "right" | "none";
    render: ComponentType;
}

const chatButtons = new Map<string, ChatButton>();
let unpatchChatInput: (() => void) | null = null;

const ACTION_PATHS = {
    left: "modules/chat_input/native/action_buttons/ChatInputActions.tsx",
    right: "modules/chat_input/native/action_buttons/ChatInputRightActions.tsx",
} as const;

export function getChatInputActionButton(): ComponentType<any> | undefined {
    return moduleAt("modules/chat_input/native/action_buttons/ChatInputActionButton.tsx")?.default;
}

function insertButtons(tree: ReactElement, side: "left" | "right") {
    try {
        const node = findInReactTree(tree, n => Array.isArray(n?.props?.children));
        if (!node) return tree;
        const { children }: { children: any[]; } = node.props;
        for (const button of chatButtons.values()) {
            const index = children.findIndex(c => c?.key === `fluxcord-${button.key}`);
            if (index !== -1) children.splice(index, 1);
            if (button.side() !== side) continue;
            const element = <button.render key={`fluxcord-${button.key}`} />;
            if (side === "left") children.push(element);
            else children.unshift(element);
        }
    } catch (e) {
        console.error("[FluxCord] adding chat input buttons failed", e);
    }
    return tree;
}

function patchChatInput() {
    if (unpatchChatInput) return;
    const unpatches: Array<() => unknown> = [];
    for (const side of ["left", "right"] as const) {
        const actions = moduleAt(ACTION_PATHS[side]);
        const unpatch = actions?.default && afterRender(actions, "default", (_, tree) => insertButtons(tree, side));
        if (unpatch) unpatches.push(unpatch);
        else console.warn(`[FluxCord] chat input ${side} actions not found; plugin buttons won't show there`);
    }
    unpatchChatInput = () => unpatches.forEach(u => u());
}

export function afterRender(module: any, key: string, cb: (props: any, rendered: any) => any) {
    const component = module?.[key];
    const patch = (holder: any, name: string) => after(name, holder, ([props], res) => cb(props, res));
    if (typeof component === "function") return patch(module, key);
    if (typeof component?.type === "function") return patch(component, "type");
    if (typeof component?.type?.render === "function") return patch(component.type, "render");
    if (typeof component?.render === "function") return patch(component, "render");
    return null;
}

export function addChatButton(button: ChatButton) {
    chatButtons.set(button.key, button);
    patchChatInput();
    return () => {
        chatButtons.delete(button.key);
        if (!chatButtons.size) {
            unpatchChatInput?.();
            unpatchChatInput = null;
        }
    };
}

export interface ToolboxAction {
    label: () => string;
    icon: string;
    run: () => unknown;
}

const toolboxActions = new Map<string, ToolboxAction>();

export function addToolboxAction(key: string, action: ToolboxAction) {
    toolboxActions.set(key, action);
    return () => void toolboxActions.delete(key);
}

export function addSettingsPage(key: string, page: { title: () => string; icon: string; Page: ComponentType; after?: "FLUXCORD_PLUGINS" | "FLUXCORD_THEMES" | "FLUXCORD_FONTS"; }) {
    return addSectionRow(Strings.FLUXCORD, {
        key: `FLUXCORD_PLUGIN_PAGE_${key}`,
        title: page.title,
        icon: findAssetId(page.icon),
        render: () => Promise.resolve({ default: page.Page }),
    }, page.after);
}

export const getToolboxActions = () => [...toolboxActions.values()];

export const registryCounts = () => ({ chatButtons: chatButtons.size, toolboxActions: toolboxActions.size });

function findInReactTree(tree: any, pred: (n: any) => boolean): any {
    if (!tree || typeof tree !== "object") return undefined;
    if (pred(tree)) return tree;
    if (Array.isArray(tree)) {
        for (const child of tree) {
            const found = findInReactTree(child, pred);
            if (found) return found;
        }
        return undefined;
    }
    for (const key of Object.keys(tree)) {
        const found = findInReactTree(tree[key], pred);
        if (found) return found;
    }
    return undefined;
}
