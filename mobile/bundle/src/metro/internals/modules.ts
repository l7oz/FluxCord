/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const modules = new Map<number, any>();

export function getModules(uniq: string, all: boolean) {
    return modules;
}

export function requireModule(id: number) {
    return modules.get(id);
}

export function registerModule(id: number, exports: any) {
    modules.set(id, exports);
}
