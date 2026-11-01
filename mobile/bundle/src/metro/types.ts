/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface FilterFn<A extends unknown[]> {
    uniq: string;
    raw?: boolean;
    fn: (exports: any, moduleId: number, defaultExport: boolean) => A[number] | undefined;
}
