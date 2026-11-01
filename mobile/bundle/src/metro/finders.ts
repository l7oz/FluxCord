/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { getCacherForUniq } from "./internals/caches";
import { getModules, requireModule } from "./internals/modules";
import { FilterFn } from "./types";

function filterExports<A extends unknown[]>(moduleExports: any, moduleId: number, filter: FilterFn<A>) {
    if (moduleExports.default && moduleExports.__esModule && filter(moduleExports.default, moduleId, true)) {
        return { exports: filter.raw ? moduleExports : moduleExports.default, defaultExport: true };
    }
    if (!filter.raw && filter(moduleExports, moduleId, false)) {
        return { exports: moduleExports, defaultExport: false };
    }
    return {};
}

export function findModule<A extends unknown[]>(filter: FilterFn<A>) {
    const { cacheId, finish } = getCacherForUniq(filter.uniq, false);
    for (const [id, moduleExports] of getModules(filter.uniq, false)) {
        const { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
        if (testedExports !== undefined) {
            cacheId(id, testedExports);
            return { id, defaultExport };
        }
    }
    finish(true);
    return {};
}

export function findExports<A extends unknown[]>(filter: FilterFn<A>) {
    const { id, defaultExport } = findModule(filter);
    if (id == null) return;
    return defaultExport ? requireModule(id).default : requireModule(id);
}

export function findAllModule<A extends unknown[]>(filter: FilterFn<A>) {
    const { cacheId, finish } = getCacherForUniq(filter.uniq, true);
    const foundExports: { id: number; defaultExport: boolean }[] = [];
    for (const [id, moduleExports] of getModules(filter.uniq, true)) {
        const { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
        if (testedExports !== undefined && typeof defaultExport === "boolean") {
            foundExports.push({ id, defaultExport });
            cacheId(id, testedExports);
        }
    }
    finish(foundExports.length === 0);
    return foundExports;
}

export function findByPropsLazy<A extends unknown[]>(...props: string[]) {
    const uniq = props.join("\0");
    const filter: FilterFn<A> = { uniq, raw: true, fn: (exports: any) => {
        for (const prop of props) if (typeof exports[prop] === "function") return exports;
        return undefined;
    }};
    return findExports(filter);
}

export function findByStoreName(name: string) {
    return findExports({ uniq: `store:${name}`, raw: true, fn: (exports: any) => exports.getCurrentUser || exports.getChannel || exports.getGuild || exports.getMessages ? exports : undefined });
}

export function findByFilePath<T = any>(path: string): T | undefined {
    return findExports({ uniq: `path:${path}`, raw: true, fn: (exports: any, moduleId: number) => {
        // Modules resolved by source path are matched by the metro cache's recorded file path.
        return undefined;
    }});
}

export function findByName(name: string, throwIfMissing = true) {
    const mod = findExports({ uniq: `name:${name}`, raw: true, fn: (exports: any) => exports.default ? exports.default : exports });
    if (!mod && throwIfMissing) console.warn(`[FluxCord] module by name ${name} not found`);
    return mod;
}
