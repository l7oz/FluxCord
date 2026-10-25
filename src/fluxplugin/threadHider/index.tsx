/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
const createStyleInjector = (id: string, css: string) => ({
    inject() {
        if (document.getElementById(id)) return;
        const el = document.createElement("style");
        el.id = id;
        el.textContent = css;
        document.head.appendChild(el);
    },
    remove() {
        document.getElementById(id)?.remove();
    },
});

const STYLE_ID = "thread-hider-styles";

const CSS = `
[class*=containerDefault_][data-dnd-name]:hover+[class*=container_]:has([class*=spineBorder_]),
[class*=containerDefault_][data-dnd-name]+[class*=container_]:has([class*=spineBorder_], li[class*=container_]):hover {
    max-height: max-content;
    transition: max-height 1s ease;
}
[class*=containerDefault_][data-dnd-name]+[class*=container_]:has([class*=spineBorder_], li[class*=container_]) {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
}
`;

const injector = createStyleInjector(STYLE_ID, CSS);

export default definePlugin({
    name: "ThreadHider",
    description: "Hides channel threads and shows them upon hovering over the channel",
    authors: [{ name: "Zarak", id: 1212639964605718582n }],

    start() {
        injector.inject();
    },

    stop() {
        injector.remove();
    },
});
