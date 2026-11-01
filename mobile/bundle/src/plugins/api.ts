/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { t, tx } from "@core/i18n";
import { recordPluginStart } from "@core/timings";
import { createStorage } from "@core/storage";
import { findAssetId } from "@lib/api/assets";
import { showToast } from "@lib/ui/toasts";
import { Logger, LoggerClass } from "@lib/utils/logger";
import type { ComponentType } from "react";

export type SettingDef =
    | { type: "boolean"; label: string; description?: string; default: boolean; }
    | { type: "select"; label: string; description?: string; default: string; options: { label: string; value: string; }[]; }
    | { type: "number"; label: string; description?: string; default: number; min: number; max: number; }
    | { type: "string"; label: string; description?: string; default: string; placeholder?: string; multiline?: boolean; };

export type SettingsSchema = Record<string, SettingDef>;

/** FluxCord's plugin tags, for the plugin page's filters */
export const PLUGIN_TAGS = ["Appearance", "Chat", "Customisation", "Emotes", "Friends", "Fun", "Media", "Notifications", "Privacy", "Servers", "Utility", "Voice"] as const;
export type PluginTag = typeof PLUGIN_TAGS[number];

void [tx("Appearance"), tx("Chat"), tx("Customisation"), tx("Emotes"), tx("Friends"), tx("Fun"), tx("Media"), tx("Notifications"), tx("Privacy"), tx("Servers"), tx("Utility"), tx("Voice")];

export type SettingsValues<S extends SettingsSchema> = {
    -readonly [K in keyof S]: S[K]["default"] extends boolean ? boolean : S[K]["default"] extends number ? number : string;
};

export interface PluginContext<S extends SettingsSchema> {
    store: SettingsValues<S>;
    logger: Logger;
    cleanup(...fns: Array<(() => unknown) | undefined | null | void>): void;
}

export interface FluxCordPluginDefinition<S extends SettingsSchema = SettingsSchema> {
    id: string;
    name: string;
    description: string;
    popular?: number;
    icon?: string;
    tags?: PluginTag[];
    enabledByDefault?: boolean;
    settings?: S;
    start(ctx: PluginContext<S>): void | Promise<void>;
    stop?(ctx: PluginContext<S>): void;
    SettingsComponent?: ComponentType<{ store: SettingsValues<S>; }>;
}

export interface FluxCordPlugin<S extends SettingsSchema = SettingsSchema> extends FluxCordPluginDefinition<S> {
    store: SettingsValues<S>;
    error?: unknown;
}

export function definePlugin<S extends SettingsSchema>(def: FluxCordPluginDefinition<S>): FluxCordPlugin<S> {
    const defaults = Object.fromEntries(Object.entries(def.settings ?? {}).map(([k, v]) => [k, v.default]));
    let store: SettingsValues<S> | undefined;
    Object.defineProperty(def, "store", {
        enumerable: true,
        get: () => store ??= createStorage<SettingsValues<S>>(`FLUXCORD_PLUGIN_${def.id}`, defaults),
    });
    return def as FluxCordPlugin<S>;
}

export interface PluginLogEntry {
    level: "warn" | "error";
    message: string;
    time: number;
}

const MAX_LOG_ENTRIES = 20;
const pluginLogs = new Map<string, PluginLogEntry[]>();

export const pluginLogsOf = (id: string): readonly PluginLogEntry[] => pluginLogs.get(id) ?? [];
export const allPluginLogs = () => Object.fromEntries(pluginLogs);

const describeArg = (arg: unknown) => {
    if (arg instanceof Error) return arg.message;
    if (typeof arg === "string") return arg;
    try {
        return JSON.stringify(arg);
    } catch {
        return String(arg);
    }
};

function pluginLogger(plugin: FluxCordPlugin): Logger {
    const base: Logger = new LoggerClass(`FluxCord/${plugin.name}`);
    const keep = (level: PluginLogEntry["level"]) => (...args: unknown[]) => {
        base[level](...args);
        let list = pluginLogs.get(plugin.id);
        if (!list) pluginLogs.set(plugin.id, list = []);
        list.push({ level, message: args.map(describeArg).join(" ").slice(0, 500), time: Date.now() });
        if (list.length > MAX_LOG_ENTRIES) list.shift();
    };
    return {
        log: (...args) => base.log(...args),
        info: (...args) => base.info(...args),
        time: (...args) => base.time(...args),
        trace: (...args) => base.trace(...args),
        verbose: (...args) => base.verbose(...args),
        warn: keep("warn"),
        error: keep("error"),
    };
}

async function loadStore(plugin: FluxCordPlugin) {
    await plugin.store.ready();
    for (const [key, def] of Object.entries(plugin.settings ?? {})) {
        const value = (plugin.store as any)[key];
        if (value === undefined || typeof value !== typeof def.default) (plugin.store as any)[key] = def.default;
    }
}

function runCleanup(id: string, fn: () => unknown) {
    try {
        fn();
    } catch (e) {
        console.error(`[FluxCord] ${id}: cleanup failed`, e);
    }
}

function runCleanups(id: string) {
    const fns = running.get(id);
    running.delete(id);
    for (const fn of fns?.reverse() ?? []) runCleanup(id, fn);
}

const running = new Map<string, Array<() => unknown>>();

export async function startFluxCordPlugin(plugin: FluxCordPlugin) {
    if (running.has(plugin.id)) return;

    const cleanups: Array<() => unknown> = [];
    running.set(plugin.id, cleanups);
    const stopped = () => running.get(plugin.id) !== cleanups;
    const ctx: PluginContext<any> = {
        store: plugin.store,
        logger: pluginLogger(plugin),
        cleanup: (...fns) => {
            for (const fn of fns) {
                if (typeof fn !== "function") continue;
                if (stopped()) runCleanup(plugin.id, fn);
                else cleanups.push(fn);
            }
        }
    };

    try {
        await loadStore(plugin);
        const started = Date.now();
        await plugin.start(ctx);
        if (stopped()) return;
        recordPluginStart(plugin.id, Date.now() - started);
        plugin.error = undefined;
    } catch (e) {
        console.error(`[FluxCord] ${plugin.name} failed to start`, e);
        if (stopped()) return;
        plugin.error = e;
        runCleanups(plugin.id);
        const reason = String((e as Error)?.message ?? e).split("\n")[0].slice(0, 120);
        showToast(reason
            ? t("{name} couldn't start and was turned off: {reason}", { name: plugin.name, reason })
            : t("{name} couldn't start and was turned off", { name: plugin.name }), findAssetId("CircleXIcon-primary"));
        throw e;
    }
}

export function stopFluxCordPlugin(plugin: FluxCordPlugin) {
    try {
        plugin.stop?.({
            store: plugin.store,
            logger: pluginLogger(plugin),
            cleanup: () => { }
        });
    } catch (e) {
        console.error(`[FluxCord] ${plugin.name}: stop failed`, e);
    }
    runCleanups(plugin.id);
}

export function isFluxCordPluginRunning(id: string) {
    return running.has(id);
}
