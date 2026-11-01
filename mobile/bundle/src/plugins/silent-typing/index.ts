/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Hide that you are typing.
 */

import { tx } from "@core/i18n";
import { command } from "../hooks";

const settings = {
    enabledGlobally: { type: "boolean", label: tx("Enabled globally"), default: true },
};

export default definePlugin({
    id: "fluxcord.silent-typing",
    name: "SilentTyping",
    description: tx("Hide that you are typing"),
    icon: "KeyboardIcon",
    tags: ["Chat", "Privacy"],
    settings,
    start({ cleanup, store }) {
        cleanup(
            command({
                name: "silent-typing",
                description: tx("Hide your typing indicator from chat"),
                options: [{ name: "toggle", description: tx("Toggle globally"), type: "boolean", required: false }],
                run: async (args) => {
                    if (args.toggle !== undefined) store.enabledGlobally = args.toggle;
                    return store.enabledGlobally ? tx("Typing hidden.") : tx("Typing visible.");
                },
            }),
        );
    },
});
