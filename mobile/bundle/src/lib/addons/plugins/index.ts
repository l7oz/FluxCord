/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const enabled = new Set<string>();

export function disablePlugin(id: string) { enabled.delete(id); }
export function isPluginEnabled(id: string) { return enabled.has(id); }
export function enablePlugin(id: string) { enabled.add(id); }

export type { PluginInstanceInternal, PluginManagerAPI } from "./types";
