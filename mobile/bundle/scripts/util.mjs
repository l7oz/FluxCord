/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function printBuildSuccess(hash: string, releaseBranch: string | undefined, timeTook: number, minified = false) {
    const suffix = minified ? " (minified)" : "";
    const branch = releaseBranch ?? "local";
    console.log(`[FluxCord Mobile] bundle built${suffix} (${hash}, ${branch}) in ${timeTook.toFixed(0)} ms`);
}
