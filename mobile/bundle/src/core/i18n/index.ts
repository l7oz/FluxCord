/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const strings = {
    FLUXCORD: "FluxCord",
    BUNNY: "FluxCord",
    Appearance: "Appearance",
    Chat: "Chat",
    Customisation: "Customisation",
    Emotes: "Emotes",
    Friends: "Friends",
    Fun: "Fun",
    Media: "Media",
    Notifications: "Notifications",
    Privacy: "Privacy",
    Servers: "Servers",
    Utility: "Utility",
    Voice: "Voice",
    "Couldn't start": "Couldn't start",
};

export const t = (key: string, opts?: Record<string, string | number>): string => {
    let out = strings[key as keyof typeof strings] ?? key;
    if (opts) {
        for (const [k, v] of Object.entries(opts)) out = out.replace(`{${k}}`, String(v));
    }
    return out;
};

export const tx = (key: string): string => key;

export const findAssetId = (name: string): string | undefined => name;
