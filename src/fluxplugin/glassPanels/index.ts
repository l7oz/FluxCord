/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { disableStyle, enableStyle, setStyleClassNames } from "@api/Styles";
import definePlugin from "@utils/types";
import { findCssClassesLazy } from "@webpack";

import style from "./style.css?managed";

// Resolve Discord's real class names instead of the greedy `[class*="sidebar_"]`
// attribute selectors: those evaluate against every element's class attribute
// (more expensive) and can over-match unrelated classes. setStyleClassNames feeds
// the resolved names into the `[--sidebar]` placeholders in style.css.
// Graceful failure: if any name doesn't resolve, compileStyle leaves `[--x]`
// in place — a selector that matches nothing — so the blur is simply absent for
// that surface, never a crash or broken CSS.
const classes = findCssClassesLazy("sidebar", "membersWrap", "members");

export default definePlugin({
    name: "GlassPanels",
    description: "Frosted-glass blur on the sidebar and member list.",
    authors: [{ name: "Sharp", id: 0n }],
    start() {
        // Resolve each class independently: if Discord renamed one, the other
        // surfaces still blur instead of the whole plugin failing to start.
        const names = {} as Record<string, string>;
        for (const key of ["sidebar", "membersWrap", "members"] as const) {
            try {
                names[key] = (classes as any)[key];
            } catch {
                // left unresolved; compileStyle leaves the placeholder unmatched
            }
        }
        setStyleClassNames(style, names);
        enableStyle(style);
    },
    stop: () => disableStyle(style),
});
