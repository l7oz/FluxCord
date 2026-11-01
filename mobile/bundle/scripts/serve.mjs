/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { execFileSync } from "node:child_process";

const port = process.env.PORT ?? "4040";
const url = `http://localhost:${port}/fluxcord.min.js`;

execFileSync(process.execPath, ["scripts/build.mjs", "--dev", "--build-minify"], { stdio: "inherit" });

const { createServer } = await import("http");
const { readFileSync } = await import("node:fs");
const { join } = await import("node:path");

const bundle = readFileSync(join(process.cwd(), "dist", "fluxcord.min.js"));

createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(bundle);
}).listen(parseInt(port, 10), () => {
    console.log(`[FluxCord Mobile] serving bundle at ${url}`);
});
