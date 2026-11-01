/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const pc = process.argv[2];
if (!pc) {
    console.error("Usage: node scripts/i18n-sync.mjs --pc <path to FluxCord PC>");
    process.exit(1);
}

const localesDir = join(pc, "src", "webpack", "common", "locales");
if (!require("node:fs").existsSync(localesDir)) {
    console.error(`FluxCord PC locales not found at ${localesDir}`);
    process.exit(1);
}

const out = join(process.cwd(), "src", "core", "i18n", "locales");
require("node:fs").mkdirSync(out, { recursive: true });

for (const file of ["en.json", "tr.json", "ru.json", "es.json", "fr.json"]) {
    const src = join(localesDir, file);
    if (require("node:fs").existsSync(src)) {
        require("node:fs").copyFileSync(src, join(out, file));
        console.log(`Copied ${file}`);
    }
}

console.log("i18n sync complete");
