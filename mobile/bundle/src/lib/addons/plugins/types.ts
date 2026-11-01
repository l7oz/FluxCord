/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export type PluginInstanceInternal = {
    manifest: {
        id: string;
        spec: number;
        type: string;
        version: string;
        main: string;
        display: { name: string; description: string };
        extras: Record<string, any>;
    };
    start(): void | Promise<void>;
    stop(): void | Promise<void>;
    SettingsComponent?: () => any;
};

export interface PluginManagerAPI {
    disablePlugin(id: string): void;
    isPluginEnabled(id: string): boolean;
    enablePlugin(id: string): void;
}
