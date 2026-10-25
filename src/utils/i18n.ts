/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// FluxCord i18n compatibility shim.
//
// Upstream plugins (ported from Endcord) call `t("English string")` / `useI18n()` from
// `@utils/i18n`. Their translations cover Turkish/Russian/Spanish/French — none of which
// FluxCord ships (FluxCord translates to Arabic through @utils/fluxI18n, whose `t(ar, en)`
// has a different signature). Rather than vendoring a ~1.8 MB dictionary for languages
// FluxCord doesn't support, this shim returns the English source string unchanged and
// performs `{var}` interpolation. Ported plugins therefore display their English text.

export type FluxLang = "en";

export interface LanguageOption {
    code: FluxLang;
    nativeName: string;
    englishName: string;
    discordLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
    { code: "en", nativeName: "English", englishName: "English", discordLocale: "en-US" },
];

export function normalizeLang(_code?: string | null): FluxLang {
    return "en";
}

export function getCurrentLang(): FluxLang {
    return "en";
}

export function syncDiscordLocale(_lang: FluxLang) { }

export function setFluxLanguage(_lang: FluxLang) { }

export function t(key: string, vars?: Record<string, string | number>): string {
    if (!vars) return key;
    let res = key;
    for (const [k, v] of Object.entries(vars)) {
        res = res.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
    return res;
}

export function tPluginDesc(_pluginName: string, fallbackDescription: string): string {
    return fallbackDescription;
}

export function useI18n() {
    return {
        lang: "en" as FluxLang,
        t,
        tPluginDesc,
        setLanguage: setFluxLanguage,
    };
}
