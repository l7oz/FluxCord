/*
 * FluxCord, a modification for Discord's desktop app
 * Copyright (c) 2026 FluxCord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Ported from Endcord's endcordProfileSync.ts (GPL-3.0). The shared profile
 * directory lives in the Flux-bored repo (profiles.json) instead of a
 * dedicated API server. Reads are served from there; there is no remote
 * write endpoint, so uploads resolve locally (see CustomProfile).
 */

export const FLUX_API = "https://raw.githubusercontent.com/l7oz/Flux-bored/main";

type ProfileListener = (userId: string, prof: any) => void;
const listeners = new Set<ProfileListener>();

export function onFluxProfile(listener: ProfileListener) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}

function emitProfile(userId: string, prof: any) {
    for (const listener of listeners) {
        try { listener(userId, prof); } catch { }
    }
}

const fetchedAt = new Map<string, number>();

export function markProfileFresh(userId: string) {
    if (userId) fetchedAt.set(userId, Date.now());
}

export async function fetchFluxProfile(userId: string, _force = false): Promise<any | null> {
    if (!userId) return null;
    const all = await fetchAllFluxProfiles();
    return all?.[userId] ?? null;
}

export function queueFluxProfile(_userId: string) {
    // Profiles come from the shared directory fetch. Do not request each user.
}

const DIRECTORY_MS = 5 * 60 * 1000;
const BACKOFF_MS = 30 * 60 * 1000;
let allInflight: Promise<Record<string, any> | null> | null = null;
let directoryCache: Record<string, any> | null = null;
let directoryNextAt = 0;

function windowHidden() {
    return typeof document !== "undefined" && document.hidden;
}

export async function fetchAllFluxProfiles(): Promise<Record<string, any> | null> {
    if (allInflight) return allInflight;
    if (Date.now() < directoryNextAt) return directoryCache;
    // A minimized client must not waste requests.
    if (windowHidden()) return directoryCache;

    directoryNextAt = Date.now() + DIRECTORY_MS;
    allInflight = (async () => {
        try {
            const res = await fetch(`${FLUX_API}/profiles.json`);
            if (!res.ok) {
                directoryNextAt = Date.now() + (res.status === 429 || res.status === 503 ? BACKOFF_MS : 15 * 60 * 1000);
                return directoryCache;
            }
            const allProfiles = await res.json();
            if (!allProfiles || typeof allProfiles !== "object" || Array.isArray(allProfiles)) {
                directoryNextAt = Date.now() + 15 * 60 * 1000;
                return directoryCache;
            }
            const now = Date.now();
            for (const [uid, prof] of Object.entries(allProfiles)) {
                fetchedAt.set(uid, now);
                emitProfile(uid, prof);
            }
            directoryCache = allProfiles;
            return allProfiles;
        } catch {
            directoryNextAt = Date.now() + 15 * 60 * 1000;
            return directoryCache;
        }
    })().finally(() => {
        allInflight = null;
    });

    return allInflight;
}

if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) void fetchAllFluxProfiles();
    });
}
