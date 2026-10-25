/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { fetchBuffer, fetchJson } from "@main/utils/http";
import { IpcEvents } from "@shared/IpcEvents";
import { VENCORD_USER_AGENT } from "@shared/vencordUserAgent";
import { createHash } from "crypto";
import { ipcMain } from "electron";
import { writeFileSync } from "original-fs";

import gitHash from "~git-hash";
import gitRemote from "~git-remote";

import { ASAR_FILE, serializeErrors } from "./common";

const API_BASE = `https://api.github.com/repos/${gitRemote}`;
let PendingUpdate: { url: string; digest: string | null; } | null = null;

async function githubGet<T = any>(endpoint: string) {
    const url = API_BASE + endpoint;
    const options = {
        headers: {
            Accept: "application/vnd.github+json",
            // "All API requests MUST include a valid User-Agent header.
            // Requests with no User-Agent header will be rejected."
            "User-Agent": VENCORD_USER_AGENT
        }
    };

    for (let attempt = 0; ; attempt++) {
        try {
            return await fetchJson<T>(url, options);
        } catch (e: any) {
            // Retry network-level failures once (checkedFetch prefixes those
            // with "GET <url> failed:"). HTTP error responses (403 rate limit,
            // 404, ...) are never retried as they'd just fail again.
            if (attempt < 1 && String(e?.message).includes(" failed: ")) {
                await new Promise(r => setTimeout(r, 1200));
                continue;
            }
            throw e;
        }
    }
}

async function calculateGitChanges() {
    const isOutdated = await fetchUpdates();
    if (!isOutdated) return [];

    let data;
    try {
        data = await githubGet(`/compare/${gitHash}...HEAD`);
    } catch (e: any) {
        // Local/dev builds can carry a commit GitHub has never seen (unpushed,
        // squashed away, ...). There's nothing to compare against, so skip the
        // changelog instead of failing the whole update check.
        if (String(e?.message).includes(": 404")) {
            console.warn(`[Updater] Commit ${gitHash} is unknown to GitHub, skipping changelog:`, e.message);
            return [];
        }
        throw e;
    }

    return data.commits.map((c: any) => ({
        hash: c.sha,
        author: c.author?.login ?? c.commit?.author?.name ?? "Ghost",
        message: c.commit.message.split("\n")[0]
    }));
}

async function fetchUpdates() {
    const data = await githubGet("/releases/latest");

    const hash = data.name.slice(data.name.lastIndexOf(" ") + 1);
    if (hash === gitHash)
        return false;

    const asset = data.assets.find(a => a.name === ASAR_FILE);
    if (!asset) throw new Error(`Release has no ${ASAR_FILE} asset`);
    PendingUpdate = { url: asset.browser_download_url, digest: asset.digest ?? null };

    return true;
}

async function applyUpdates() {
    if (!PendingUpdate) return true;

    const data = await fetchBuffer(PendingUpdate.url);

    if (PendingUpdate.digest) {
        const [algo, hex] = PendingUpdate.digest.split(":");
        const actual = createHash(algo ?? "sha256").update(data).digest("hex");
        if (actual !== hex)
            throw new Error(`Update integrity check failed: expected ${PendingUpdate.digest}, got ${algo}:${actual}. Aborting before writing anything.`);
    }

    writeFileSync(__dirname, data, { flush: true });

    PendingUpdate = null;

    return true;
}

ipcMain.handle(IpcEvents.GET_REPO, serializeErrors(() => `https://github.com/${gitRemote}`));
ipcMain.handle(IpcEvents.GET_UPDATES, serializeErrors(calculateGitChanges));
ipcMain.handle(IpcEvents.UPDATE, serializeErrors(fetchUpdates));
ipcMain.handle(IpcEvents.BUILD, serializeErrors(applyUpdates));
