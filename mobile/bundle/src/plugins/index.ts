/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * FluxCord's built-in plugins. FluxCord starts with only their manifest (names, descriptions, tags); a plugin's code
 * is loaded the first time it starts or its settings open, so the plugins that are off cost nothing at startup.
 */

import type { PluginInstanceInternal } from "@lib/addons/plugins/types";
import compareNames from "@lib/utils/compareNames";
import { createElement } from "react";

import { FluxCordPlugin, isFluxCordPluginRunning, startFluxCordPlugin, stopFluxCordPlugin } from "./api";
import { loaders, manifest, PluginInfo } from "./manifest";

const loaded = new Map<string, FluxCordPlugin<any>>();

let descriptions: Record<string, string> | undefined;
const descriptionOf = (id: string) => (descriptions ??= require("./descriptions.json") as Record<string, string>)[id] ?? "";

export function loadFluxCordPlugin(id: string): FluxCordPlugin<any> {
    const cached = loaded.get(id);
    if (cached) return cached;
    const load = loaders[id];
    if (!load) throw new Error(`No FluxCord plugin is called ${id}`);
    const plugin = load().default;
    if (plugin?.id !== id) throw new Error(`The module of ${id} defines ${plugin?.id}; regenerate the plugin manifest`);
    loaded.set(id, plugin);
    return plugin;
}

export const loadedPluginCount = () => loaded.size;

export function getFluxCordPlugins(): FluxCordPlugin<any>[] {
    return sorted().map(p => loadFluxCordPlugin(p.id));
}

function sorted(): PluginInfo[] {
    const popular = manifest.filter(p => p.popular != null).sort((a, b) => a.popular! - b.popular!);
    const others = manifest.filter(p => p.popular == null).sort((a, b) => compareNames(a.name, b.name));
    return [...popular, ...others];
}

export function getFluxCordCorePlugins(): Record<string, { default: PluginInstanceInternal; preenabled: boolean; }> {
    return Object.fromEntries(sorted().map(info => [info.id, {
        preenabled: info.enabledByDefault === true,
        default: {
            manifest: {
                id: info.id,
                spec: 3,
                type: "plugin",
                version: "1.0.0",
                main: "",
                display: {
                    name: info.name,
                    get description() {
                        return descriptionOf(info.id);
                    },
                },
                extras: {
                    fluxcord: true,
                    popular: info.popular,
                    icon: info.icon,
                    tags: info.tags,
                },
            },
            start() {
                Promise.resolve()
                    .then(() => startFluxCordPlugin(loadFluxCordPlugin(info.id)))
                    .catch(() => {
                        import("@lib/addons/plugins").then(({ disablePlugin, isPluginEnabled }) => {
                            if (isPluginEnabled(info.id)) disablePlugin(info.id);
                        });
                    });
            },
            stop() {
                if (isFluxCordPluginRunning(info.id)) stopFluxCordPlugin(loadFluxCordPlugin(info.id));
            },
            SettingsComponent: info.hasSettings
                ? () => createElement(require("./ui/PluginSettings").default, { plugin: loadFluxCordPlugin(info.id) })
                : undefined,
        } as PluginInstanceInternal,
    }]));
}
