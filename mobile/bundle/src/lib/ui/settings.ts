/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const addSectionRow = (section: string, row: { key: string; title: () => string; icon?: string; render: () => Promise<{ default: any }>; after?: string; }) => {
    console.log(`[FluxCord] settings section row: ${section} / ${row.key}`);
    return () => { };
};

export const compareNames = (a: string, b: string) => a.localeCompare(b);
