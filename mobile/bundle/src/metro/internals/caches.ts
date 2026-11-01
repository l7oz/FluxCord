/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const caches = new Map<string, { id: number; value: any; finished: boolean; }>();

export function getCacherForUniq(uniq: string, finishOnEmpty: boolean) {
    let cache = caches.get(uniq);
    if (!cache) { cache = { id: 0, value: undefined, finished: false }; caches.set(uniq, cache); }
    let id = cache.id;
    return {
        cacheId: (foundId: number, testedExports: any) => { id = foundId; cache.value = testedExports; },
        finish: (empty: boolean) => { cache.finished = true; },
    };
}
