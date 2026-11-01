/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * The bridge between the bundle and the native loader. The loader exposes __FLUX_LOADER__ (static info) and
 * __FLUXCORD_LOADER_CALL__ / __FLUXCORD_LOADER_CALL_ASYNC__ (synchronous and asynchronous bridge calls) on the JSI
 * runtime; this module wraps them so plugins and the bundle can ask native for info, theme, fonts, etc.
 */

type LoaderInfo = { name: string; version: string; hasThemeSupport: boolean; storedTheme: any; fontPatch: number };

let loaderInfo: LoaderInfo | null = null;

export function getLoaderInfo(): LoaderInfo | null {
    if (loaderInfo) return loaderInfo;
    const loader = (globalThis as any).__FLUX_LOADER__;
    if (!loader) return null;
    loaderInfo = {
        name: loader.loaderName ?? "FluxCordTweak",
        version: loader.loaderVersion ?? "0.0.0",
        hasThemeSupport: !!loader.hasThemeSupport,
        storedTheme: loader.storedTheme ?? null,
        fontPatch: loader.fontPatch ?? 0,
    };
    return loaderInfo;
}

type BridgeResult = { result?: any; error?: string; };

function callBridge(method: string, args: any[]): BridgeResult {
    const sync = (globalThis as any).__FLUXCORD_LOADER_CALL__;
    if (typeof sync === "function") {
        const res = sync({ revenge: { method, args } });
        return res?.result === undefined && res?.error === undefined ? { error: "no result" } : (res as BridgeResult);
    }
    return { error: "bridge not available" };
}

export function callBridgeAsync(method: string, args: any[]): Promise<BridgeResult> {
    const asyncCall = (globalThis as any).__FLUXCORD_LOADER_CALL_ASYNC__;
    if (typeof asyncCall === "function") {
        return asyncCall({ revenge: { method, args } }) as Promise<BridgeResult>;
    }
    return Promise.resolve({ error: "bridge not available" });
}

export function loaderCall(method: string, ...args: any[]): any {
    const res = callBridge(method, args);
    if (res.error) throw new Error(`FluxCord loader call ${method} failed: ${res.error}`);
    return res.result;
}

export const LOADER_NAME = "FluxCordTweak";
