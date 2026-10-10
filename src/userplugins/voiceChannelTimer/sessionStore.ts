/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { del, get, set } from "@api/DataStore";
import { VoiceState } from "@vencord/discord-types";
import { ChannelStore, SelectedChannelStore, UserStore } from "@webpack/common";

export interface ActiveVoiceSession {
    guildId: string | null;
    channelId: string;
    joinedAt: number;
}

export interface CompletedVoiceSession {
    guildId: string | null;
    channelId: string;
    joinedAt: number;
    leftAt: number;
    duration: number;
}

const ACTIVE_KEY = "VoiceChannelTimer_activeSession";
const HISTORY_KEY = "VoiceChannelTimer_sessions";

let activeSession: ActiveVoiceSession | null = null;
let myLastChannelId: string | undefined;
const listeners = new Set<() => void>();

function notify() {
    for (const listener of listeners) listener();
}

function resolveGuildId(channelId: string, guildId?: string | null): string | null {
    if (guildId) return guildId;
    return ChannelStore.getChannel(channelId)?.guild_id ?? null;
}

async function persistActiveSession() {
    if (activeSession) await set(ACTIVE_KEY, activeSession);
    else await del(ACTIVE_KEY);
}

async function appendCompletedSession(session: CompletedVoiceSession) {
    const history = (await get<CompletedVoiceSession[]>(HISTORY_KEY)) ?? [];
    history.push(session);
    await set(HISTORY_KEY, history);
}

function completeSession(leftAt: number = Date.now()) {
    if (!activeSession) return;

    const joinedAt = activeSession.joinedAt;
    const duration = Math.max(0, Math.floor((leftAt - joinedAt) / 1000));

    void appendCompletedSession({
        guildId: activeSession.guildId,
        channelId: activeSession.channelId,
        joinedAt,
        leftAt,
        duration
    });

    activeSession = null;
    void persistActiveSession();
    notify();
}

function startSession(channelId: string, guildId?: string | null) {
    if (activeSession?.channelId === channelId) return;

    activeSession = {
        guildId: resolveGuildId(channelId, guildId),
        channelId,
        joinedAt: Date.now()
    };
    void persistActiveSession();
    notify();
}

function restoreSession(session: ActiveVoiceSession) {
    activeSession = session;
    notify();
}

export function getActiveJoinedAt(): number | null {
    return activeSession?.joinedAt ?? null;
}

export function subscribeSession(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export async function initSessionStore() {
    const stored = await get<ActiveVoiceSession>(ACTIVE_KEY);
    const myId = UserStore.getCurrentUser()?.id;
    const voiceChannelId = SelectedChannelStore.getVoiceChannelId?.() ?? null;

    if (!myId || !voiceChannelId) {
        if (stored) completeSession();
        myLastChannelId = undefined;
        return;
    }

    myLastChannelId = voiceChannelId;

    if (stored?.channelId === voiceChannelId) {
        restoreSession(stored);
        return;
    }

    if (stored) completeSession();

    startSession(voiceChannelId, ChannelStore.getChannel(voiceChannelId)?.guild_id ?? null);
}

export function handleVoiceChannelSelect({
    channelId,
    currentVoiceChannelId
}: {
    channelId: string | null;
    currentVoiceChannelId: string | null;
}) {
    const oldChannelId = currentVoiceChannelId ?? myLastChannelId;

    if (oldChannelId && !channelId) {
        completeSession();
    } else if (channelId && channelId !== oldChannelId) {
        if (oldChannelId) completeSession();
        const guildId = ChannelStore.getChannel(channelId)?.guild_id ?? null;
        startSession(channelId, guildId);
    }

    myLastChannelId = channelId ?? undefined;
}

export function handleVoiceStateUpdates({ voiceStates }: { voiceStates: VoiceState[]; }) {
    const myId = UserStore.getCurrentUser()?.id;
    if (!myId) return;

    for (const state of voiceStates) {
        if (state.userId !== myId) continue;

        let { channelId, oldChannelId, guildId } = state;

        if (channelId !== myLastChannelId) {
            oldChannelId = myLastChannelId;
            myLastChannelId = channelId ?? undefined;
        }

        if (channelId === oldChannelId) continue;

        if (oldChannelId) completeSession();
        if (channelId) startSession(channelId, guildId);
    }
}

export function clearSessionStore() {
    activeSession = null;
    myLastChannelId = undefined;
    listeners.clear();
}
