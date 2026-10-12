/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/** Default icon color, matching Discord's --interactive-normal grey. */
export const ICON_COLOR_FALLBACK = "#b5bac1";

export type IconColorSettingKey =
    | "userAreaButtonIconColor"
    | "chatBoxButtonIconColor"
    | "topBarButtonIconColor"
    | "headerBarButtonIconColor";

/**
 * FluxCord has no TestcordHelper icon-colour settings, so this always yields
 * undefined and callers fall back to Discord's default / ICON_COLOR_FALLBACK.
 */
export function getTestcordIconColor(key: IconColorSettingKey): string | undefined {
    void key;
    return undefined;
}