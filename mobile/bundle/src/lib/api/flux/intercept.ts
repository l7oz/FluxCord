/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function intercept(cb: (payload: any) => any, options: { type: string; first?: boolean; }) {
    const dispatcher = (globalThis as any).FluxDispatcher;
    if (!dispatcher || typeof dispatcher.subscribe !== "function") return () => { };
    const listener = (payload: any) => {
        try { cb(payload); } catch (e) { console.error(`[FluxCord] intercept(${options.type}) failed`, e); }
    };
    dispatcher.subscribe(options.type, listener);
    return () => dispatcher.unsubscribe(options.type, listener);
}
