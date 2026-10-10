/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import ErrorBoundary from "@components/ErrorBoundary";
import { EquicordDevs } from "@utils/constants";
import { useFixedTimer } from "@utils/react";
import definePlugin from "@utils/types";
import { React, useEffect } from "@webpack/common";

import {
    clearSessionStore,
    getActiveJoinedAt,
    handleVoiceChannelSelect,
    handleVoiceStateUpdates,
    initSessionStore,
    subscribeSession
} from "./sessionStore";

function formatSessionTime(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(value => value.toString().padStart(2, "0"))
        .join(":");
}

function useActiveJoinedAt() {
    const [, forceUpdate] = React.useReducer((value: number) => value + 1, 0);

    useEffect(() => {
        const unsubscribe = subscribeSession(forceUpdate);
        return () => {
            unsubscribe();
        };
    }, []);

    return getActiveJoinedAt();
}

const ActiveConnectionTimer = ErrorBoundary.wrap(({ joinedAt, status }: { joinedAt: number; status: React.ReactNode; }) => {
    const elapsedMs = useFixedTimer({ initialTime: joinedAt });

    return (
        <span className="vc-vct-status">
            {status}
            <span className="vc-vct-separator">{" \u2022 "}</span>
            <span className="vc-vct-timer">{formatSessionTime(elapsedMs)}</span>
        </span>
    );
}, { noop: true });

const ConnectionStatusWithTimer = ErrorBoundary.wrap(({ status }: { status: React.ReactNode; }) => {
    const joinedAt = useActiveJoinedAt();
    if (joinedAt == null) return <>{status}</>;

    return <ActiveConnectionTimer joinedAt={joinedAt} status={status} />;
}, { noop: true });

export default definePlugin({
    name: "VoiceChannelTimer",
    description: "Shows how long you have been in your current voice channel inside the Voice Connected panel.",
    tags: ["Voice", "Utility"],
    authors: [EquicordDevs.nobody],
    searchTerms: ["Voice Channel Timer", "Voice Timer", "Call Timer", "In Voice Timer"],

    patches: [
        {
            // Account panel bottom area: "In voice" connection status line
            find: "renderConnectionStatus(){",
            replacement: [
                {
                    match: /(renderConnectionStatus\(\).{0,1000}?lineClamp:1,children:)(\i)(?=,|}\))/,
                    replace: "$1[$self.renderConnectionStatusWithTimer($2)]"
                },
                {
                    match: /("RTCConnectionMenu".{0,200}?lineClamp:1,children:)(\i)(?=,|}\))/,
                    replace: "$1[$self.renderConnectionStatusWithTimer($2)]"
                }
            ]
        }
    ],

    flux: {
        VOICE_STATE_UPDATES: handleVoiceStateUpdates,
        VOICE_CHANNEL_SELECT: handleVoiceChannelSelect
    },

    renderConnectionStatusWithTimer(status: React.ReactNode) {
        return (
            <ErrorBoundary noop>
                <ConnectionStatusWithTimer status={status} />
            </ErrorBoundary>
        );
    },

    async start() {
        await initSessionStore();
    },

    stop() {
        clearSessionStore();
    }
});
