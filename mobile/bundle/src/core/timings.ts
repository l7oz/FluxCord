/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const timings = new Map<string, { start: number; end?: number; }>();

export function step(name: string, fn: () => unknown | Promise<unknown>) {
    timings.set(name, { start: Date.now() });
    const run = async () => {
        const result = await fn();
        timings.get(name)!.end = Date.now();
        return result;
    };
    return run();
}

export function recordPluginStart(id: string, ms: number) {
    console.log(`[FluxCord] plugin ${id} started in ${ms}ms`);
}
