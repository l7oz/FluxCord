/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findExports } from "./finders";

const loaded = new Map<string, any>();

export function patchWhenLoaded<T = any>(module: any, cb: (loaded: T) => () => void): () => void {
    if (typeof module === "object" && module !== null) {
        const unpatch = cb(module);
        return unpatch;
    }
    let unpatch: (() => void) | undefined;
    const done = () => {
        if (unpatch) return;
        const loadedModule = typeof module === "function" ? module : findExports({ uniq: `lazy:${String(module)}`, raw: true, fn: () => module });
        if (loadedModule) {
            unpatch = cb(loadedModule);
        }
    };
    done();
    return () => { if (unpatch) unpatch(); };
}
