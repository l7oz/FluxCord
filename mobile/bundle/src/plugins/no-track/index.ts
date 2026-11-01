/*
 * FluxCord Mobile
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * FluxCord PC's NoTrack: Discord's analytics, metrics and crash reports aren't collected or sent.
 */

import { tx } from "@core/i18n";
import { instead } from "@lib/api/patcher";
import { findByPropsLazy } from "@metro";
import { patchWhenLoaded } from "@metro/lazy";

import { definePlugin } from "../api";
import { onAction } from "../common";

const Analytics = findByPropsLazy("AnalyticsActionHandlers", "trackMaker");
const NetworkAnalytics = findByPropsLazy("trackNetworkAction");
const Impressions = findByPropsLazy("trackImpression");
const VoiceAnalytics = findByPropsLazy("trackWithMetadata", "getVoiceStateMetadata");
const Metrics = findByPropsLazy("_metrics", "_intervalId");
const SentryInit = findByPropsLazy("initSentry");
const Sentry = findByPropsLazy("profiledRootComponent", "addBreadcrumb");
const HTTP = findByPropsLazy("HTTP", "getAPIBaseURL");

const TELEMETRY = /^(?:\/api(?:\/v\d+)?)?\/(?:science|metrics(?:\/v2)?)\/?$/;

const noop = () => { };

const silence = (module: any, keys: string[]) => keys
    .filter(key => typeof module?.[key] === "function")
    .map(key => instead(key, module, noop));

export default definePlugin({
    id: "fluxcord.no-track",
    name: "NoTrack",
    description: tx("Stops Discord from collecting analytics, metrics and crash reports about how you use the app"),
    icon: "AnalyticsIcon",
    tags: ["Privacy"],
    enabledByDefault: true,
    start({ cleanup }) {
        const silenceWhenLoaded = (module: any, keys: string[]) => patchWhenLoaded(module, loaded => {
            const unpatches = silence(loaded, keys);
            return () => unpatches.forEach(unpatch => unpatch());
        });

        cleanup(
            silenceWhenLoaded(Analytics, ["track"]),
            patchWhenLoaded(Analytics, ({ AnalyticsActionHandlers: handlers }) => {
                const unpatches = silence(handlers, ["handleTrack", "handleFingerprint"]);
                return () => unpatches.forEach(unpatch => unpatch());
            }),
            silenceWhenLoaded(NetworkAnalytics, ["trackNetworkAction"]),
            silenceWhenLoaded(Impressions, ["trackImpression"]),
            silenceWhenLoaded(VoiceAnalytics, ["trackWithMetadata"]),
            silenceWhenLoaded(Metrics, ["increment", "distribution"]),
            silenceWhenLoaded(SentryInit, ["initSentry"]),
            silenceWhenLoaded(Sentry, ["addBreadcrumb", "setUser", "setTags", "setExtra"]),
            patchWhenLoaded(HTTP, http => {
                const unpatches = [http.HTTP, http].map(client => instead("post", client, (args, orig) => {
                    const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
                    if (typeof url === "string" && TELEMETRY.test(url)) return Promise.resolve({ ok: true, status: 204, headers: {}, body: null });
                    return orig(...args);
                }));
                return () => unpatches.forEach(unpatch => unpatch());
            }),
            onAction("TRACK", action => {
                action.resolve?.();
                return false;
            }),
        );
    },
});
