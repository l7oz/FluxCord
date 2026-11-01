/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Does quick maths right in the chat box.
 */

import { tx } from "@core/i18n";
import { command } from "../hooks";

export default definePlugin({
    id: "fluxcord.calculator",
    name: "Calculator",
    description: tx("Does quick maths right in the chat box"),
    tags: ["Utility"],
    start({ cleanup }) {
        cleanup(
            command({
                name: "calc",
                description: tx("Does quick maths right in the chat box"),
                options: [{ name: "expression", description: tx("The maths to work out"), type: "string", required: true }],
                run: async (args) => {
                    const expr = String(args.expression ?? "");
                    try {
                        // Only allow safe maths characters
                        if (!/^[0-9+\-*/().\s%]+$/.test(expr)) return tx("That expression isn't safe to calculate.");
                        const result = new Function(`return (${expr})`)();
                        return `${expr} = ${result}`;
                    } catch {
                        return tx("Couldn't calculate that.");
                    }
                },
            }),
        );
    },
});
