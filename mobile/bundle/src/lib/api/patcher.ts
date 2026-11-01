/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Function wrappers around Discord's React Native modules: instead (replace), after (run after), intercept (see
 * before Discord). Each returns an unpatch function.
 */

const patched = new WeakMap<object, Map<string, Array<() => void>>>();

function getUnpatches(target: any, method: string): Array<() => void> {
    let byMethod = patched.get(target);
    if (!byMethod) { byMethod = new Map(); patched.set(target, byMethod); }
    let unpatches = byMethod.get(method);
    if (!unpatches) { unpatches = []; byMethod.set(method, unpatches); }
    return unpatches;
}

export function instead(name: string, target: any, replacer: (args: any[], original: (...args: any[]) => any) => any): () => void {
    const original = target[name];
    if (typeof original !== "function") {
        console.warn(`[FluxCord] instead: ${name} is not a function on the target`);
        return () => { };
    }
    const unpatch = () => {
        target[name] = original;
        const u = getUnpatches(target, name);
        const i = u.indexOf(unpatch);
        if (i !== -1) u.splice(i, 1);
    };
    target[name] = function (this: any, ...args: any[]) {
        return replacer.call(this, args, original.bind(this));
    } as any;
    getUnpatches(target, name).push(unpatch);
    return unpatch;
}

export function after(name: string, target: any, cb: (args: any[], result: any) => any): () => void {
    const original = target[name];
    if (typeof original !== "function") {
        console.warn(`[FluxCord] after: ${name} is not a function on the target`);
        return () => { };
    }
    const unpatch = () => {
        target[name] = original;
        const u = getUnpatches(target, name);
        const i = u.indexOf(unpatch);
        if (i !== -1) u.splice(i, 1);
    };
    target[name] = function (this: any, ...args: any[]) {
        const result = original.apply(this, args);
        try { cb(args, result); } catch (e) { console.error(`[FluxCord] after ${name} callback failed`, e); }
        return result;
    } as any;
    getUnpatches(target, name).push(unpatch);
    return unpatch;
}

export function intercept(cb: (payload: any) => any, options: { type: string; first?: boolean; }): () => void {
    const dispatcher = (globalThis as any).FluxDispatcher;
    if (!dispatcher || typeof dispatcher.subscribe !== "function") {
        console.warn("[FluxCord] intercept: FluxDispatcher isn't ready yet");
        return () => { };
    }
    const listener = (payload: any) => {
        try {
            const result = cb(payload);
            if (result === false) return;
            if (result && typeof result === "object") Object.assign(payload, result);
        } catch (e) {
            console.error(`[FluxCord] intercept(${options.type}) failed`, e);
        }
    };
    if (options.first) dispatcher.subscribe(options.type, listener, true);
    else dispatcher.subscribe(options.type, listener);
    return () => dispatcher.unsubscribe(options.type, listener);
}
