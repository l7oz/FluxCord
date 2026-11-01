/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Automatically removes tracking elements from URLs you send.
 */

import { tx } from "@core/i18n";
import { onSend } from "../hooks";

const TRACKING = /(?:[?&](?:utm_source|utm_medium|utm_campaign|utm_term|utm_content|utm_id|utm_source_platform|utm_medium_platform|fbclid|igscbid|igshid|_ga|_gl|mc_cid|mc_eid|ref|source)[^&#]*)+/gi;

export default definePlugin({
    id: "fluxcord.clear-urls",
    name: "ClearURLs",
    description: tx("Automatically removes tracking elements from URLs you send"),
    icon: "LinkIcon",
    tags: ["Privacy", "Utility"],
    start({ cleanup }) {
        cleanup(
            onSend("clear-urls", content => {
                const result = content.replace(TRACKING, "").replace(/[?&]$/, "").replace(/\?$/, "");
                return result !== content ? result : undefined;
            }, 0),
        );
    },
});
