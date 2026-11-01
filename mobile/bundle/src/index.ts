/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * FluxCord's bundle root. Loads plugins, settings and themes, then hands Discord back to itself.
 */

import { loadEndcordPlugin, getEndcordCorePlugins, loadedPluginCount } from "@plugins/index";

async function main() {
    // Core plugins are registered with the Revenge-style plugin manager; each loads its code lazily.
    const corePlugins = getEndcordCorePlugins();
    console.log(`[FluxCord] ${Object.keys(corePlugins).length} plugins registered, ${loadedPluginCount()} loaded`);
}

export default {
    main
};
