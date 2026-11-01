/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export class Logger {
    log = (...args: unknown[]) => console.log(`[${this.name}]`, ...args);
    info = (...args: unknown[]) => console.info(`[${this.name}]`, ...args);
    warn = (...args: unknown[]) => console.warn(`[${this.name}]`, ...args);
    error = (...args: unknown[]) => console.error(`[${this.name}]`, ...args);
    time = (...args: unknown[]) => console.time(`[${this.name}]`, ...args);
    trace = (...args: unknown[]) => console.trace(`[${this.name}]`, ...args);
    verbose = (...args: unknown[]) => console.debug(`[${this.name}]`, ...args);
    constructor(public readonly name: string) { }
}

export class LoggerClass extends Logger { }
