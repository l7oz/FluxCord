import type { Metro } from "@metro/types";
const { instead } = require("spitroast");

globalThis.window = globalThis;

(globalThis as any).__FLUXCORD_TIMINGS__ ??= { loaded: Date.now(), plugins: {} };

async function initializeFluxCord() {
    try {
        Object.freeze = Object.seal = Object;

        const { step } = require("@core/timings");
        await step("metroCache", () => require("@metro/internals/caches").initMetroCache());
        const main = step("modules", () => require("."));
        await step("init", () => main.default());
    } catch (e) {
        const { NativeClientInfoModule } = require("@lib/api/native/modules");
        const stack = e instanceof Error ? e.stack : undefined;

        console.log(stack ?? e?.toString?.() ?? e);
        alert([
            "Failed to load FluxCord!\n",
            `Build Number: ${NativeClientInfoModule?.getConstants?.().Build}`,
            `FluxCord: ${require("bunny-build-info").version}`,
            stack || e?.toString?.() ?? e,
        ].join("\n"));
    }
}

if (typeof window.__f === "undefined") {
    var _requireFunc: any;

    interface DeferredQueue {
        object: any;
        method: string;
        resume?: (queue: DeferredQueue) => void;
        args: any[];
    }

    const deferredCalls: Array<DeferredQueue> = [];
    const unpatches: Array<() => void> = [];

    const deferMethodExecution = (
        object: any,
        method: string,
        condition?: (...args: any[]) => boolean,
        resume?: (queue: DeferredQueue) => void,
        returnWith?: (queue: DeferredQueue) => any
    ) => {
        const restore = instead(method, object, function (this: any, args: any[], original: any) {
            if (!condition || condition(...args)) {
                const queue: DeferredQueue = { object, method, args, resume };
                deferredCalls.push(queue);
                return returnWith ? returnWith(queue) : undefined;
            }
            return original.apply(this, args);
        });
        unpatches.push(restore);
    };

    const resumeDeferred = () => {
        for (const queue of deferredCalls) {
            const { object, method, args, resume } = queue;
            if (resume) {
                resume(queue);
            } else {
                object[method](...args);
            }
        }
        deferredCalls.length = 0;
    };

    const onceIndexRequired = (originalRequire: Metro.RequireFn) => {
        if (window.__fbBatchedBridge) {
            const batchedBridge = window.__fbBatchedBridge;
            deferMethodExecution(
                batchedBridge,
                "callFunctionReturnFlushedQueue",
                (...args) => args[0] === "AppRegistry" || !batchedBridge.getCallableModule(args[0]),
                ({ args }) => {
                    if (batchedBridge.getCallableModule(args[0])) {
                        batchedBridge.__callFunction(...args);
                    }
                },
                () => batchedBridge.flushedQueue()
            );
        }

        if (window.RN$AppRegistry) {
            deferMethodExecution(window.RN$AppRegistry, "runApplication");
        }

        const startDiscord = async () => {
            await initializeFluxCord();
            for (const unpatch of unpatches) unpatch();
            unpatches.length = 0;
            originalRequire(0);
            resumeDeferred();
        };

        startDiscord();
    };

    Object.defineProperties(globalThis, {
        __f: {
            configurable: true,
            get: () => _requireFunc,
            set(v) {
                _requireFunc = function patchedRequire(a: number) {
                    if (a === 0) {
                        if (window.modules instanceof Map) window.modules = Object.fromEntries(window.modules);
                        onceIndexRequired(v);
                        _requireFunc = v;
                    } else return v(a);
                };
            }
        },
        __d: {
            get() {
                if (window.Object && !window.modules) {
                    window.modules = window.__c?.();
                }
                return this.value;
            },
            set(v) { this.value = v; }
        }
    });
} else {
    initializeFluxCord();
}
