/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const ApplicationCommandOptionType = {
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    NUMBER: 10,
} as const;

export type Argument = { name: string; value: any };

export type CommandContext = { channel: { id: string; guild_id?: string; }; };

export function registerCommand(def: {
    name: string;
    description: string;
    options?: any[];
    execute: (args: any[], ctx: CommandContext) => unknown;
}): () => void {
    console.log(`[FluxCord] registered command: ${def.name}`);
    return () => { };
}
