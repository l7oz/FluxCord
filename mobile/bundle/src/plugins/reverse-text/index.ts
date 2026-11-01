/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Reverses the message content before sending it.
 */

import { tx } from "@core/i18n";
import { onSend } from "../hooks";

export default definePlugin({
    id: "fluxcord.reverse-text",
    name: "ReverseText",
    description: tx("Reverses the message content before sending it"),
    tags: ["Chat", "Fun"],
    start({ cleanup }) {
        cleanup(
            onSend("reverse-text", content => {
                const reversed = content.split("").reverse().join("");
                return reversed !== content ? reversed : undefined;
            }, 10),
        );
    },
});
