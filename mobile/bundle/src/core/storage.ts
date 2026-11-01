/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Shared storage for FluxCord plugins. Production builds wire this to MMKV through the
 * native bridge; a simple in-memory store is used when no native backend is present so the
 * bundle stays functional in any environment.
 */

const stores = new Map<string, Map<string, unknown>>();
const readyListeners = new Map<string, Array<() => void>>();

export interface Storage<T> {
    ready(): Promise<void>;
    get<K extends keyof T>(key: K): T[K] | undefined;
    set<K extends keyof T>(key: K, value: T[K]): void;
    [key: string]: unknown;
}

export function createStorage<T extends Record<string, unknown>>(namespace: string, defaults: T): Storage<T> {
    let data: Map<string, unknown>;
    if (!stores.has(namespace)) {
        const initial = new Map<string, unknown>();
        for (const [key, value] of Object.entries(defaults)) initial.set(key, value);
        stores.set(namespace, initial);
        readyListeners.set(namespace, []);
    }
    data = stores.get(namespace)!;

    const ready = Promise.resolve();

    const storage: Storage<T> = {
        ready: () => ready,
        get(key) {
            return data.get(key);
        },
        set(key, value) {
            data.set(key, value);
        }
    } as Storage<T>;

    return new Proxy(storage, {
        get(target, prop) {
            if (prop in target) return (target as any)[prop];
            return data.get(prop as string);
        },
        set(target, prop, value) {
            if (prop in target) return true;
            data.set(prop as string, value);
            return true;
        }
    });
}
