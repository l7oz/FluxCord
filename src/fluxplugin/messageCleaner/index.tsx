/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findGroupChildrenByChildId, NavContextMenuPatchCallback } from "@api/ContextMenu";
import { definePluginSettings } from "@api/Settings";
import { BanRiskWarning } from "@utils/fluxBanWarning";
import { t } from "@utils/fluxI18n";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, openModal } from "@utils/fluxModals";
import { ModalSize } from "@utils/modal";
import definePlugin, { OptionType } from "@utils/types";
import { Channel, Message, User } from "@vencord/discord-types";
import { Button, ChannelStore, GuildStore, Menu, RestAPI, SelectedChannelStore, showToast, Text, Toasts, UserStore } from "@webpack/common";

const settings = definePluginSettings({
    warning: {
        type: OptionType.COMPONENT,
        component: () => <BanRiskWarning
            ar="تحذير: الحذف الجماعي للرسائل عبر الواجهة البرمجية قد يصطدم بحدود المعدّل وقد يُعرّض حسابك للتقييد/الحظر رغم التهدئة الذكية. استخدمها بمسؤولية."
            en="Warning: bulk-deleting messages via the API can hit rate limits and may risk account restriction/ban despite the smart throttling. Use responsibly."
        />,
    },
    enabled: {
        type: OptionType.BOOLEAN,
        description: t("تفعيل إضافة MessageCleaner", "Enable the MessageCleaner plugin"),
        default: true
    },
    targetChannelId: {
        type: OptionType.STRING,
        description: t("معرّف القناة المراد تنظيفها (اتركه فارغاً لاستخدام قائمة السياق)", "Channel ID to clean (leave empty to use the context menu)"),
        default: ""
    },
    delayBetweenDeletes: {
        type: OptionType.SLIDER,
        description: t("التأخير بين كل حذف (مللي ثانية) — لتجنّب حدود المعدّل", "Delay between each deletion (ms) — to avoid rate limiting"),
        default: 1000,
        markers: [100, 500, 1000, 2000, 5000],
        minValue: 100,
        maxValue: 10000,
        stickToMarkers: false
    },
    batchSize: {
        type: OptionType.SLIDER,
        description: t("عدد الرسائل المُعالَجة في كل دفعة", "Number of messages to process per batch"),
        default: 50,
        markers: [10, 25, 50, 100],
        minValue: 1,
        maxValue: 100,
        stickToMarkers: false
    },
    showProgress: {
        type: OptionType.BOOLEAN,
        description: t("عرض التقدّم في الوقت الحقيقي", "Show progress in real time"),
        default: true
    },
    debugMode: {
        type: OptionType.BOOLEAN,
        description: t("وضع التصحيح (سجلّات مفصّلة)", "Debug mode (detailed logs)"),
        default: false
    },
    skipSystemMessages: {
        type: OptionType.BOOLEAN,
        description: t("تجاهل رسائل النظام (انضمام/مغادرة، إلخ)", "Ignore system messages (join/leave, etc.)"),
        default: true
    },
    skipReplies: {
        type: OptionType.BOOLEAN,
        description: t("تجاهل الردود على الرسائل", "Ignore message replies"),
        default: false
    },
    maxAge: {
        type: OptionType.SLIDER,
        description: t("أقصى عمر للرسالة المراد حذفها (أيام، 0 = بلا حدّ)", "Maximum message age to delete (days, 0 = no limit)"),
        default: 0,
        markers: [0, 1, 7, 30, 90],
        minValue: 0,
        maxValue: 365,
        stickToMarkers: false
    }
});

let isCleaningInProgress = false;
let shouldStopCleaning = false;
let cleaningStats = { total: 0, deleted: 0, failed: 0, skipped: 0, startTime: 0 };

function log(message: string, level: "info" | "warn" | "error" = "info") {
    const prefix = `[MessageCleaner ${new Date().toLocaleTimeString()}]`;
    switch (level) {
        case "warn": console.warn(prefix, message); break;
        case "error": console.error(prefix, message); break;
        default: console.log(prefix, message);
    }
}

function debugLog(message: string) {
    if (settings.store.debugMode) log(`🔍 ${message}`, "info");
}

function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

function statusOf(error: any): number {
    return Number(error?.status ?? error?.statusCode ?? 0) || 0;
}

/** Discord rate-limit payloads carry `retry_after` in seconds (body may be raw JSON text). */
function retryAfterMs(error: any): number {
    const body = error?.body;
    const raw = typeof body === "string"
        ? body.match(/"retry_after":\s*([\d.]+)/)?.[1]
        : body?.retry_after ?? error?.retry_after;

    const seconds = Number(raw);
    if (!Number.isFinite(seconds) || seconds <= 0) return 0;
    return Math.min(Math.max(seconds * 1000, 250), 60_000);
}

/**
 * RestAPI call that survives rate limits and transient network failures.
 *
 * Retries 429s (honouring `retry_after`) and 5xx/network errors up to 5 times,
 * rethrows non-retryable statuses (400/403/404) immediately, and normalises
 * builds that resolve with `{ ok: false, status, body }` instead of rejecting.
 * Rejects with the last error once retries are exhausted.
 */
async function restRetry(method: "get" | "del", url: string): Promise<any> {
    for (let attempt = 1; ; attempt++) {
        try {
            const res = await RestAPI[method]({ url });

            // Some builds resolve instead of rejecting on HTTP errors.
            if (res && typeof res === "object" && (res.ok === false || res.status >= 400)) {
                const error: any = new Error(`Request failed with status ${res.status}`);
                error.status = res.status;
                error.body = res.body;
                throw error;
            }

            return res;
        } catch (error: any) {
            const status = statusOf(error);
            const retryable = status === 429 || status >= 500 || status === 0;

            if (!retryable || attempt >= 5 || shouldStopCleaning) throw error;

            const wait = retryAfterMs(error) || Math.min(1000 * attempt, 10_000);
            log(`⏳ ${method.toUpperCase()} failed (status ${status}) — retry ${attempt}/5 in ${Math.ceil(wait / 1000)}s`, "warn");
            await sleep(wait + 250);
        }
    }
}

function canDeleteMessage(message: Message, currentUserId: string): boolean {
    try {
        if (message.author?.id !== currentUserId) return false;
        // Search results can omit `type` — treat that as a normal message, not a system one.
        if (settings.store.skipSystemMessages && message.type != null && message.type !== 0 && message.type !== 19) return false;

        const isReply = message.type === 19 || !!message.messageReference || !!(message as any).message_reference;
        if (isReply && settings.store.skipReplies) return false;

        if (settings.store.maxAge > 0) {
            let messageTime: number;
            if (typeof message.timestamp === "string") messageTime = new Date(message.timestamp).getTime();
            else if (typeof message.timestamp === "number") messageTime = message.timestamp;
            else return false;

            if (isNaN(messageTime) || messageTime <= 0) return false;
            const messageAge = Date.now() - messageTime;
            const maxAgeMs = settings.store.maxAge * 24 * 60 * 60 * 1000;
            if (messageAge > maxAgeMs) return false;
        }

        return true;
    } catch {
        return false;
    }
}

type CleanMode = "channel" | "user";

/**
 * Decides whether a fetched message is a deletion target.
 * - "channel": your own messages, filtered through the plugin's skip/age settings (original behaviour).
 * - "user": every message authored by the target user ("كل الرسائل الخاصة به"). The replies/maxAge
 *   settings only apply to your own messages, so they are intentionally skipped here — only the
 *   system-message safety toggle still applies.
 */
function messageMatches(message: Message, currentUserId: string, mode: CleanMode, targetUserId?: string): boolean {
    if (mode !== "user") return canDeleteMessage(message, currentUserId);

    if (message.author?.id !== targetUserId) return false;
    if (settings.store.skipSystemMessages && message.type != null && message.type !== 0 && message.type !== 19) return false;
    return true;
}

/** The other party of a 1:1 DM channel (used for the "all messages from him" menu entry). */
function getDmPartnerId(channel: Channel): string | undefined {
    const raw = channel as Channel & {
        getRecipientId?: () => string | undefined;
        rawRecipients?: { id: string; }[];
    };
    const me = UserStore.getCurrentUser()?.id;

    const recipientId = raw.getRecipientId?.();
    if (recipientId && recipientId !== me) return recipientId;

    return raw.rawRecipients?.map(r => r.id).find(id => id !== me);
}

async function deleteMessage(channelId: string, messageId: string): Promise<boolean> {
    try {
        // restRetry already honours rate limits (retry_after) and retries transient failures.
        await restRetry("del", `/channels/${channelId}/messages/${messageId}`);
        return true;
    } catch (error: any) {
        const status = statusOf(error);
        // Already gone — e.g. removed by a previous verification round.
        if (status === 404) return true;

        debugLog(`❌ Delete failed for ${messageId}: status ${status}`);
        return false;
    }
}

/**
 * Fetches one page of channel history (newest first).
 *
 * Throws on failure — callers must never mistake an error for "channel is
 * empty". The old code returned `[]` here, so a single 429/network blip made
 * the clean loop believe it had reached the end and stop early, leaving the
 * rest of your messages untouched.
 */
async function getChannelMessages(channelId: string, before?: string): Promise<Message[]> {
    const url = before
        ? `/channels/${channelId}/messages?limit=${settings.store.batchSize}&before=${before}`
        : `/channels/${channelId}/messages?limit=${settings.store.batchSize}`;

    const response = await restRetry("get", url);
    const body = response?.body;
    if (Array.isArray(body)) return body;

    const error: any = new Error("Unexpected response while fetching messages");
    error.status = typeof body?.retry_after === "number" ? 429 : 0;
    error.body = body;
    throw error;
}

// ─── Confirmation-dialog preview ───────────────────────────────────────────

const PREVIEW_MAX_PAGES = 5;
const PREVIEW_MAX_ITEMS = 100;

interface CleanPreview {
    /** First N messages the deletion would remove (newest first), shown in the confirmation dialog. */
    sample: Message[];
    /** true when more targets exist beyond `sample`, so the displayed count is a lower bound. */
    more: boolean;
}

/** Collects a bounded sample of what the deletion would actually remove, using the exact same filter. */
async function collectPreview(channelId: string, mode: CleanMode, targetUserId?: string): Promise<CleanPreview> {
    const currentUserId = UserStore.getCurrentUser()?.id;
    if (!currentUserId) return { sample: [], more: false };

    const sample: Message[] = [];
    let lastMessageId: string | undefined;

    for (let page = 0; page < PREVIEW_MAX_PAGES; page++) {
        const messages = await getChannelMessages(channelId, lastMessageId);
        if (messages.length === 0) return { sample, more: false };

        for (const message of messages) {
            if (!messageMatches(message, currentUserId, mode, targetUserId)) continue;
            sample.push(message);
            if (sample.length >= PREVIEW_MAX_ITEMS) return { sample, more: true };
        }

        // A short page means we reached the start of the channel — the count is exact.
        if (messages.length < settings.store.batchSize) return { sample, more: false };
        lastMessageId = messages[messages.length - 1].id;
    }

    // Stopped at the preview page cap before reaching the start of the channel.
    return { sample, more: true };
}

/** One page of the guild search, deduplicated and restricted to `currentUserId`. */
async function getGuildSearchPage(guildId: string, currentUserId: string, maxId?: string): Promise<Message[]> {
    const url = `/guilds/${guildId}/messages/search?author_id=${currentUserId}${maxId ? `&max_id=${maxId}` : ""}`;
    const response = await restRetry("get", url);
    const body = response?.body;

    // A rate-limit payload that came back looking like a "successful" response.
    if (typeof body?.retry_after === "number") {
        const error: any = new Error("Rate limited");
        error.status = 429;
        error.body = body;
        throw error;
    }

    const groups: Message[][] = Array.isArray(body?.messages) ? body.messages : [];
    const unique = new Map<string, Message>();
    for (const group of groups)
        for (const message of group)
            if (message?.author?.id === currentUserId && !unique.has(message.id)) unique.set(message.id, message);

    return [...unique.values()];
}

/** Oldest snowflake on a page — pagination must stay strictly older than it. */
function oldestIdOf(messages: { id: string; }[]): string | undefined {
    let oldest: string | undefined;
    for (const message of messages)
        if (!oldest || BigInt(message.id) < BigInt(oldest)) oldest = message.id;

    return oldest;
}

/** First page of the guild search for your own messages — mirrors cleanGuild's query. */
async function collectGuildPreview(guildId: string): Promise<CleanPreview> {
    const currentUserId = UserStore.getCurrentUser()?.id;
    if (!currentUserId) return { sample: [], more: false };

    const all = await getGuildSearchPage(guildId, currentUserId);

    return {
        sample: all.filter(m => canDeleteMessage(m, currentUserId)).slice(0, PREVIEW_MAX_ITEMS),
        // The search endpoint returns 25 results per page — a full page means more exist.
        more: all.length >= 25
    };
}

async function cleanChannel(channelId: string, mode: CleanMode = "channel", targetUserId?: string) {
    if (!settings.store.enabled || isCleaningInProgress) return;

    try {
        const channel = ChannelStore.getChannel(channelId);
        const currentUserId = UserStore.getCurrentUser()?.id;
        if (!channel || !currentUserId) return;

        const channelName = channel.name || "Private channel";
        log(mode === "user"
            ? `🧹 Starting cleanup of messages from ${targetUserId} in "${channelName}"`
            : `🧹 Starting cleanup of "${channelName}"`);
        showToast(t("بدأ التنظيف…", "Cleaning started…"), Toasts.Type.MESSAGE, { duration: 3000 });

        isCleaningInProgress = true;
        shouldStopCleaning = false;
        cleaningStats = { total: 0, deleted: 0, failed: 0, skipped: 0, startTime: Date.now() };

        let lastMessageId: string | undefined;
        let consecutiveErrors = 0;

        while (!shouldStopCleaning) {
            try {
                const messages = await getChannelMessages(channelId, lastMessageId);
                consecutiveErrors = 0;

                if (messages.length === 0) { log("No more messages to process"); break; }

                const validMessages = messages.filter(msg => messageMatches(msg, currentUserId, mode, targetUserId));
                cleaningStats.total += validMessages.length;
                cleaningStats.skipped += messages.length - validMessages.length;

                for (const message of validMessages) {
                    if (shouldStopCleaning) { log("Stop requested by the user"); break; }

                    if (await deleteMessage(channelId, message.id)) cleaningStats.deleted++;
                    else cleaningStats.failed++;

                    if (settings.store.delayBetweenDeletes > 0)
                        await sleep(settings.store.delayBetweenDeletes);
                }

                if (shouldStopCleaning) break;

                reportProgress();

                lastMessageId = messages[messages.length - 1].id;
                if (messages.length < settings.store.batchSize) break;
            } catch (error: any) {
                consecutiveErrors++;

                const status = statusOf(error);
                if (status === 403 || status === 404) {
                    log(`❌ No access to this channel (status ${status}) — stopping`, "error");
                    break;
                }
                // restRetry already retried internally, so each catch here means
                // the problem is persistent — give up after 3 in a row.
                if (consecutiveErrors >= 3) {
                    log(`❌ ${consecutiveErrors} consecutive fetch failures — stopping early`, "error");
                    break;
                }

                const wait = retryAfterMs(error) || (status === 429 ? 30_000 : 5000);
                log(`❌ Fetch failed (status ${status}) — retrying in ${Math.ceil(wait / 1000)}s`, "error");
                await sleep(wait);
            }
        }

        // Verification system: rescan + retry until a confirming scan comes back empty.
        const verify = await verifyChannel(channelId, currentUserId, mode, targetUserId);
        finishRun(verify, "channel");
    } catch (error: any) {
        log(`❌ Global error: ${error}`, "error");
        showToast(
            t(`❌ MessageCleaner فشل: ${error?.message ?? error}`, `❌ MessageCleaner failed: ${error?.message ?? error}`),
            Toasts.Type.FAILURE,
            { duration: 8000 }
        );
    } finally {
        isCleaningInProgress = false;
    }
}

async function cleanGuild(guildId: string) {
    if (!settings.store.enabled || isCleaningInProgress) return;

    try {
        const currentUserId = UserStore.getCurrentUser()?.id;
        if (!currentUserId) return;

        log(`🧹 Starting cleanup of guild ${guildId}`);
        showToast(t("بدأ التنظيف…", "Cleaning started…"), Toasts.Type.MESSAGE, { duration: 3000 });

        isCleaningInProgress = true;
        shouldStopCleaning = false;
        cleaningStats = { total: 0, deleted: 0, failed: 0, skipped: 0, startTime: Date.now() };

        let maxId: string | undefined;
        let consecutiveErrors = 0;

        while (!shouldStopCleaning) {
            try {
                const messages = await getGuildSearchPage(guildId, currentUserId, maxId);
                consecutiveErrors = 0;

                if (messages.length === 0) { log("No more messages to process in this server"); break; }

                // Next page must be strictly older than the oldest message seen here.
                const oldest = oldestIdOf(messages);
                if (!oldest) break;
                const nextMaxId = (BigInt(oldest) - 1n).toString();
                if (nextMaxId === maxId) {
                    // Defence against a search backend that ignores max_id: the
                    // same page would come back forever and we'd delete-loop.
                    log("❌ Search pagination stopped advancing — aborting to avoid an infinite loop", "error");
                    break;
                }
                maxId = nextMaxId;

                const validMessages = messages.filter(msg => canDeleteMessage(msg, currentUserId));
                cleaningStats.total += validMessages.length;
                cleaningStats.skipped += messages.length - validMessages.length;

                for (const message of validMessages) {
                    if (shouldStopCleaning) { log("Stop requested by the user"); break; }

                    const channelId = message.channel_id;
                    if (!channelId) { cleaningStats.failed++; continue; }

                    if (await deleteMessage(channelId, message.id)) cleaningStats.deleted++;
                    else cleaningStats.failed++;

                    if (settings.store.delayBetweenDeletes > 0)
                        await sleep(settings.store.delayBetweenDeletes);
                }

                if (shouldStopCleaning) break;

                reportProgress();
            } catch (error: any) {
                consecutiveErrors++;

                const status = statusOf(error);
                if (status === 403 || status === 400) {
                    log("❌ Cannot search in this server (permissions?)", "error");
                    break;
                }
                if (consecutiveErrors >= 3) {
                    log(`❌ ${consecutiveErrors} consecutive failures — stopping early`, "error");
                    break;
                }

                const wait = retryAfterMs(error) || (status === 429 ? 30_000 : 5000);
                log(`❌ Search failed (status ${status}) — retrying in ${Math.ceil(wait / 1000)}s`, "error");
                await sleep(wait);
            }
        }

        // Verification system: rescan + retry until a confirming scan comes back empty.
        const verify = await verifyGuild(guildId, currentUserId);
        finishRun(verify, "guild");
    } catch (error: any) {
        log(`❌ Global guild error: ${error}`, "error");
        showToast(
            t(`❌ MessageCleaner فشل: ${error?.message ?? error}`, `❌ MessageCleaner failed: ${error?.message ?? error}`),
            Toasts.Type.FAILURE,
            { duration: 8000 }
        );
    } finally {
        isCleaningInProgress = false;
    }
}

// ─── Verification system ──────────────────────────────────────────────────
// After the main run the target is rescanned with the exact same filter and
// anything still standing is deleted again — up to VERIFY_ROUNDS times —
// followed by one last confirming scan, so "finished" really means "empty".

const VERIFY_ROUNDS = 3;
/** Hang protection: verification scans stop after this many pages (× batchSize messages each). */
const VERIFY_MAX_PAGES = 4000;

interface VerifyResult {
    /** true when the final confirming scan found zero target messages. */
    verified: boolean;
    /** How many targets the confirming scan still found (0 when verified). */
    remaining: number;
    /** false when the confirming scan itself failed (network/rate limit). */
    scanned: boolean;
    /** false when the user aborted via Stop. */
    stopped: boolean;
}

function reportProgress() {
    if (!settings.store.showProgress) return;

    const { deleted, failed } = cleaningStats;
    showToast(
        t(`MessageCleaner: ${deleted} حُذفت${failed ? ` (${failed} فشلت)` : ""}`,
            `MessageCleaner: ${deleted} deleted${failed ? ` (${failed} failed)` : ""}`),
        Toasts.Type.MESSAGE
    );
}

/** Collects every still-matching message id by walking the channel newest → oldest. */
async function scanForRemaining(
    channelId: string,
    currentUserId: string,
    mode: CleanMode,
    targetUserId?: string
): Promise<string[]> {
    const remaining: string[] = [];
    let before: string | undefined;
    let exhausted = false;

    for (let page = 0; page < VERIFY_MAX_PAGES; page++) {
        if (shouldStopCleaning) break;

        const messages = await getChannelMessages(channelId, before);
        for (const message of messages)
            if (messageMatches(message, currentUserId, mode, targetUserId)) remaining.push(message.id);

        if (messages.length < settings.store.batchSize) { exhausted = true; break; }
        before = messages[messages.length - 1].id;
    }

    if (!exhausted && !shouldStopCleaning)
        log(`⚠️ Verification scan hit the ${VERIFY_MAX_PAGES}-page cap — older messages were not re-checked`, "warn");

    return remaining;
}

async function verifyChannel(
    channelId: string,
    currentUserId: string,
    mode: CleanMode,
    targetUserId?: string
): Promise<VerifyResult> {
    let remaining: string[] = [];

    // One extra round so the final answer always comes from a fresh scan
    // taken AFTER the last deletion attempt.
    for (let round = 1; round <= VERIFY_ROUNDS + 1; round++) {
        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };

        try {
            remaining = await scanForRemaining(channelId, currentUserId, mode, targetUserId);
        } catch (error: any) {
            log(`❌ Verification scan failed (status ${statusOf(error)})`, "error");
            return { verified: false, remaining: remaining.length, scanned: false, stopped: false };
        }

        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };
        if (remaining.length === 0) return { verified: true, remaining: 0, scanned: true, stopped: false };

        // The extra round above is scan-only; never delete in it.
        if (round > VERIFY_ROUNDS) break;

        log(`🔁 Verification round ${round}/${VERIFY_ROUNDS}: ${remaining.length} still there — retrying`);
        let deletedThisRound = 0;

        for (const id of remaining) {
            if (shouldStopCleaning) break;

            if (await deleteMessage(channelId, id)) { cleaningStats.deleted++; deletedThisRound++; }
            else cleaningStats.failed++;

            if (settings.store.delayBetweenDeletes > 0)
                await sleep(settings.store.delayBetweenDeletes);
        }

        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };
        reportProgress();

        // Nothing succeeded this round — everything left is being refused
        // permanently (e.g. missing permissions); further rounds would only
        // repeat the same failures.
        if (deletedThisRound === 0)
            return { verified: false, remaining: remaining.length, scanned: true, stopped: false };
    }

    return { verified: false, remaining: remaining.length, scanned: true, stopped: false };
}

/** Collects every still-matching message by walking the guild search oldest-ward. */
async function scanGuildForRemaining(guildId: string, currentUserId: string): Promise<Array<{ channelId: string; messageId: string; }>> {
    const remaining: Array<{ channelId: string; messageId: string; }> = [];
    let maxId: string | undefined;
    let exhausted = false;

    for (let page = 0; page < VERIFY_MAX_PAGES; page++) {
        if (shouldStopCleaning) break;

        const messages = await getGuildSearchPage(guildId, currentUserId, maxId);
        if (messages.length === 0) { exhausted = true; break; }

        for (const message of messages)
            if (canDeleteMessage(message, currentUserId) && message.channel_id)
                remaining.push({ channelId: message.channel_id, messageId: message.id });

        const oldest = oldestIdOf(messages);
        if (!oldest) { exhausted = true; break; }
        const nextMaxId = (BigInt(oldest) - 1n).toString();
        if (nextMaxId === maxId) {
            log("❌ Search pagination stopped advancing — aborting the verification scan", "error");
            break;
        }
        maxId = nextMaxId;
    }

    if (!exhausted && !shouldStopCleaning)
        log(`⚠️ Verification scan hit the ${VERIFY_MAX_PAGES}-page cap — older messages were not re-checked`, "warn");

    return remaining;
}

async function verifyGuild(guildId: string, currentUserId: string): Promise<VerifyResult> {
    let remaining: Array<{ channelId: string; messageId: string; }> = [];

    for (let round = 1; round <= VERIFY_ROUNDS + 1; round++) {
        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };

        try {
            remaining = await scanGuildForRemaining(guildId, currentUserId);
        } catch (error: any) {
            log(`❌ Verification scan failed (status ${statusOf(error)})`, "error");
            return { verified: false, remaining: remaining.length, scanned: false, stopped: false };
        }

        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };
        if (remaining.length === 0) return { verified: true, remaining: 0, scanned: true, stopped: false };
        if (round > VERIFY_ROUNDS) break;

        log(`🔁 Verification round ${round}/${VERIFY_ROUNDS}: ${remaining.length} still there — retrying`);
        let deletedThisRound = 0;

        for (const target of remaining) {
            if (shouldStopCleaning) break;

            if (await deleteMessage(target.channelId, target.messageId)) { cleaningStats.deleted++; deletedThisRound++; }
            else cleaningStats.failed++;

            if (settings.store.delayBetweenDeletes > 0)
                await sleep(settings.store.delayBetweenDeletes);
        }

        if (shouldStopCleaning) return { verified: false, remaining: remaining.length, scanned: true, stopped: true };
        reportProgress();

        if (deletedThisRound === 0)
            return { verified: false, remaining: remaining.length, scanned: true, stopped: false };
    }

    return { verified: false, remaining: remaining.length, scanned: true, stopped: false };
}

/** Final verdict — always logged and toasted, whatever happened. */
function finishRun(verify: VerifyResult, scope: "channel" | "guild") {
    const { deleted, failed } = cleaningStats;
    const totalTime = Date.now() - cleaningStats.startTime;
    const timeStr = totalTime < 60000 ? `${Math.round(totalTime / 1000)}s` : `${Math.round(totalTime / 60000)}min`;

    let summary: string;
    let type: typeof Toasts.Type.SUCCESS;

    if (verify.stopped) {
        summary = t(`⏹️ MessageCleaner: توقّف يدوياً بعد حذف ${deleted} رسالة`,
            `⏹️ MessageCleaner: stopped manually after deleting ${deleted} messages`);
        type = Toasts.Type.MESSAGE;
    } else if (verify.verified) {
        summary = t(`✅ MessageCleaner: تم التحقق — 0 متبقٍ (${deleted} حُذفت${failed ? `، ${failed} فشلت` : ""} — ${timeStr})`,
            `✅ MessageCleaner: verified clean — 0 remaining (${deleted} deleted${failed ? `, ${failed} failed` : ""} — ${timeStr})`);
        type = Toasts.Type.SUCCESS;
    } else if (!verify.scanned) {
        summary = t(`⚠️ MessageCleaner: حُذفت ${deleted} رسالة لكن تعذّر تأكيد النتيجة (فشل المسح)`,
            `⚠️ MessageCleaner: deleted ${deleted} messages but could not verify (scan failed)`);
        type = Toasts.Type.FAILURE;
    } else {
        summary = t(`⚠️ MessageCleaner: حُذفت ${deleted} رسالة لكن ${verify.remaining} قد تبقّت — أعد المحاولة`,
            `⚠️ MessageCleaner: deleted ${deleted} messages but ${verify.remaining} may remain — try again`);
        type = Toasts.Type.FAILURE;
    }

    log(`${summary} [${scope}]`);
    showToast(summary, type, { duration: 8000 });
}

function stopCleaning() {
    if (isCleaningInProgress) {
        shouldStopCleaning = true;
        log("⏹️ Stop requested by the user");
        showToast(t("جارٍ إيقاف التنظيف…", "Stopping cleaning…"), Toasts.Type.MESSAGE, { duration: 3000 });
    }
}

// ─── Confirmation dialog ───────────────────────────────────────────────────

function messagePreviewMeta(message: Message): string {
    const authorId = message.author?.id;
    const authorName = (authorId ? UserStore.getUser(authorId)?.globalName : undefined)
        ?? message.author?.username
        ?? t("مرسل غير معروف", "Unknown author");

    const raw = message.timestamp;
    const date = typeof raw === "string" ? new Date(raw) : new Date(raw as unknown as number);
    const when = isNaN(date.getTime()) ? "" : date.toLocaleString();

    return `${authorName} · ${when}`;
}

function messagePreviewBody(message: Message): string {
    const content = (message.content ?? "").trim();
    if (content) return content.length > 160 ? `${content.slice(0, 160)}…` : content;
    if (message.attachments?.length) return t("مرفق", "Attachment");
    if (message.embeds?.length) return t("محتوى مضمّن", "Embed");
    if ((message as Message & { sticker_items?: unknown[] }).sticker_items?.length) return t("ملصق", "Sticker");
    return t("(رسالة نظام أو فارغة)", "(System or empty message)");
}

interface ConfirmCleanModalProps {
    modalProps: ModalProps;
    title: string;
    subtitle: string;
    preview: CleanPreview;
    onConfirm: () => void;
}

function ConfirmCleanModal({ modalProps, title, subtitle, preview, onConfirm }: ConfirmCleanModalProps) {
    const { sample, more } = preview;
    const countLabel = more
        ? t(`أكثر من ${sample.length} رسالة ستُحذف`, `More than ${sample.length} messages will be deleted`)
        : t(`${sample.length} رسالة ستُحذف`, `${sample.length} messages will be deleted`);

    return (
        <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
            <ModalHeader>
                <Text variant="heading-lg/semibold" tag="h1">{title}</Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <Text variant="text-sm/normal">{subtitle}</Text>
                <div style={{ color: "var(--status-danger, #f23f43)", fontWeight: 600, margin: "6px 0 2px" }}>
                    <Text variant="text-sm/normal">{countLabel}</Text>
                </div>
                <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                    {sample.map(message => (
                        <div key={message.id} style={{ background: "var(--background-secondary, #2b2d31)", borderRadius: 8, padding: "6px 10px" }}>
                            <div style={{ opacity: 0.7 }}>
                                <Text variant="text-sm/normal">{messagePreviewMeta(message)}</Text>
                            </div>
                            <Text variant="text-sm/normal">{messagePreviewBody(message)}</Text>
                        </div>
                    ))}
                    {more && (
                        <div style={{ opacity: 0.7, textAlign: "center" }}>
                            <Text variant="text-sm/normal">{t("… والمزيد بعد المعاينة", "…and more beyond this preview")}</Text>
                        </div>
                    )}
                </div>
            </ModalContent>
            <ModalFooter>
                <Button onClick={modalProps.onClose}>{t("إلغاء", "Cancel")}</Button>
                <Button
                    color={Button.Colors.RED}
                    onClick={() => {
                        modalProps.onClose();
                        onConfirm();
                    }}
                >
                    {t("تأكيد الحذف", "Confirm deletion")}
                </Button>
            </ModalFooter>
        </ModalRoot>
    );
}

/** Runs the preview pass, then opens the confirmation dialog (with the message list) for a channel clean. */
async function openCleanConfirmation(channelId: string) {
    if (!settings.store.enabled) {
        showToast(t("إضافة MessageCleaner معطّلة.", "The MessageCleaner plugin is disabled."), Toasts.Type.FAILURE);
        return;
    }
    if (isCleaningInProgress) return;
    shouldStopCleaning = false; // clear a lingering Stop so preview fetches still retry

    let preview: CleanPreview;
    try {
        preview = await collectPreview(channelId, "channel");
    } catch (error: any) {
        log(`❌ Preview scan failed (status ${statusOf(error)})`, "error");
        showToast(t("تعذّر مسح القناة قبل الحذف — حاول مجدداً.", "Could not scan the channel before deleting — please try again."), Toasts.Type.FAILURE);
        return;
    }
    if (preview.sample.length === 0) {
        showToast(t("لا توجد رسائل للحذف هنا.", "There are no messages to delete here."), Toasts.Type.SUCCESS);
        return;
    }

    const channel = ChannelStore.getChannel(channelId);
    const channelName = channel?.name || t("قناة خاصة", "Private channel");
    openModal(modalProps => (
        <ConfirmCleanModal
            modalProps={modalProps as ModalProps}
            title={t("تأكيد حذف الرسائل", "Confirm message deletion")}
            subtitle={t(`سيتم حذف رسائلك من "${channelName}".`, `Your messages in "${channelName}" will be deleted.`)}
            preview={preview}
            onConfirm={() => void cleanChannel(channelId)}
        />
    ));
}

/** Preview + confirmation for deleting every message authored by `user` in `channelId`. */
async function openUserCleanConfirmation(channelId: string, user: User) {
    if (!settings.store.enabled) {
        showToast(t("إضافة MessageCleaner معطّلة.", "The MessageCleaner plugin is disabled."), Toasts.Type.FAILURE);
        return;
    }
    if (isCleaningInProgress) return;
    shouldStopCleaning = false; // clear a lingering Stop so preview fetches still retry

    let preview: CleanPreview;
    try {
        preview = await collectPreview(channelId, "user", user.id);
    } catch (error: any) {
        log(`❌ Preview scan failed (status ${statusOf(error)})`, "error");
        showToast(t("تعذّر مسح القناة قبل الحذف — حاول مجدداً.", "Could not scan the channel before deleting — please try again."), Toasts.Type.FAILURE);
        return;
    }
    if (preview.sample.length === 0) {
        showToast(t("لا توجد رسائل لهذا المستخدم يمكن حذفها هنا.", "There are no messages from this user to delete here."), Toasts.Type.SUCCESS);
        return;
    }

    const name = user.globalName || user.username || user.id;
    openModal(modalProps => (
        <ConfirmCleanModal
            modalProps={modalProps as ModalProps}
            title={t("تأكيد حذف الرسائل", "Confirm message deletion")}
            subtitle={t(`سيتم حذف كل الرسائل الخاصة بـ "${name}" في هذه القناة (يتطلب صلاحية إدارة الرسائل).`, `All messages from "${name}" in this channel will be deleted (requires the Manage Messages permission).`)}
            preview={preview}
            onConfirm={() => void cleanChannel(channelId, "user", user.id)}
        />
    ));
}

/** Preview + confirmation for wiping all of your messages across a guild. */
async function openGuildCleanConfirmation(guildId: string) {
    if (!settings.store.enabled) {
        showToast(t("إضافة MessageCleaner معطّلة.", "The MessageCleaner plugin is disabled."), Toasts.Type.FAILURE);
        return;
    }
    if (isCleaningInProgress) return;
    shouldStopCleaning = false; // clear a lingering Stop so preview fetches still retry

    let preview: CleanPreview;
    try {
        preview = await collectGuildPreview(guildId);
    } catch (error: any) {
        log(`❌ Preview scan failed (status ${statusOf(error)})`, "error");
        showToast(t("تعذّر مسح السيرفر قبل الحذف — حاول مجدداً.", "Could not scan the server before deleting — please try again."), Toasts.Type.FAILURE);
        return;
    }
    if (preview.sample.length === 0) {
        showToast(t("لا توجد رسائل للحذف في هذا السيرفر.", "There are no messages to delete in this server."), Toasts.Type.SUCCESS);
        return;
    }

    const guildName = GuildStore.getGuild(guildId)?.name ?? guildId;
    openModal(modalProps => (
        <ConfirmCleanModal
            modalProps={modalProps as ModalProps}
            title={t("تأكيد حذف الرسائل", "Confirm message deletion")}
            subtitle={t(`سيتم حذف كل رسائلك في السيرفر "${guildName}".`, `All your messages in "${guildName}" will be deleted.`)}
            preview={preview}
            onConfirm={() => void cleanGuild(guildId)}
        />
    ));
}

const ChannelContextMenuPatch: NavContextMenuPatchCallback = (children, ctx: { channel?: Channel; } = {}) => {
    const { channel } = ctx;
    if (!channel) return;

    const group = findGroupChildrenByChildId("mark-channel-read", children) ?? children;
    if (!group) return;

    const menuItems: any[] = [<Menu.MenuSeparator key="separator" />];

    if (isCleaningInProgress) {
        const { total, deleted, failed, skipped } = cleaningStats;
        const processed = deleted + failed + skipped;
        const percentage = total > 0 ? Math.min(100, Math.round((processed / total) * 100)) : 0;

        menuItems.push(
            <Menu.MenuItem key="cleaning-status" id="vc-cleaning-status"
                label={t(`جارٍ التنظيف: ${percentage}% (${processed}/${total})`, `Cleaning: ${percentage}% (${processed}/${total})`)}
                color="brand" disabled={true} />,
            <Menu.MenuItem key="stop-cleaning" id="vc-stop-cleaning"
                label={t("إيقاف التنظيف", "Stop cleaning")} color="danger" action={stopCleaning} />
        );
    } else {
        menuItems.push(
            <Menu.MenuItem key="clean-messages" id="vc-clean-messages"
                label={t("تنظيف الرسائل", "Clean messages")} color="danger"
                action={() => void openCleanConfirmation(channel.id)} />
        );
    }

    group.push(...menuItems);
};

const GuildContextMenuPatch: NavContextMenuPatchCallback = (children, ctx: { guild?: any; } = {}) => {
    const { guild } = ctx;
    if (!guild) return;

    // Discord uses various IDs for guild context menus. We look for a common group like "mark-guild-read" or just append to children.
    const group = findGroupChildrenByChildId("mark-guild-read", children) ?? findGroupChildrenByChildId("hide-muted-channels", children) ?? children;
    if (!group) return;

    const menuItems: any[] = [<Menu.MenuSeparator key="separator-guild" />];

    if (isCleaningInProgress) {
        const { total, deleted, failed, skipped } = cleaningStats;
        const processed = deleted + failed + skipped;
        const percentage = total > 0 ? Math.min(100, Math.round((processed / total) * 100)) : 0;

        menuItems.push(
            <Menu.MenuItem key="cleaning-status-guild" id="vc-cleaning-status-guild"
                label={t(`جارٍ التنظيف: ${percentage}% (${processed}/${total})`, `Cleaning: ${percentage}% (${processed}/${total})`)}
                color="brand" disabled={true} />,
            <Menu.MenuItem key="stop-cleaning-guild" id="vc-stop-cleaning-guild"
                label={t("إيقاف التنظيف", "Stop cleaning")} color="danger" action={stopCleaning} />
        );
    } else {
        menuItems.push(
            <Menu.MenuItem key="clean-guild-messages" id="vc-clean-guild-messages"
                label={t("تنظيف كل رسائلي", "Clean all my messages")} color="danger"
                action={() => void openGuildCleanConfirmation(guild.id)} />
        );
    }

    group.push(...menuItems);
};

/** DM menu: the regular channel entries plus "all messages from him" for the DM partner. */
const GdmContextMenuPatch: NavContextMenuPatchCallback = (children, ctx: { channel?: Channel; } = {}) => {
    const { channel } = ctx;
    if (!channel) return;

    ChannelContextMenuPatch(children, ctx);
    if (isCleaningInProgress) return;

    const partnerId = getDmPartnerId(channel);
    const partner = partnerId ? UserStore.getUser(partnerId) : null;
    if (!partner) return;

    const group = findGroupChildrenByChildId("mark-channel-read", children) ?? children;
    if (!group) return;

    group.push(
        <Menu.MenuItem key="vc-clean-partner-messages" id="vc-clean-partner-messages"
            label={t("كل الرسائل الخاصة به", "All messages from him")} color="danger"
            action={() => void openUserCleanConfirmation(channel.id, partner)} />
    );
};

/** Message menu: delete every message from the author of the message you right-clicked. */
const MessageContextMenuPatch: NavContextMenuPatchCallback = (children, ctx: { channel?: Channel; message?: Message; } = {}) => {
    const { channel, message } = ctx;
    const author = message?.author;
    if (!channel || !message || !author || isCleaningInProgress) return;

    const group = findGroupChildrenByChildId("mark-unread", children)
        ?? findGroupChildrenByChildId("copy-link", children)
        ?? children;
    if (!group) return;

    group.push(
        <Menu.MenuSeparator key="separator-message" />,
        <Menu.MenuItem key="vc-clean-author-messages" id="vc-clean-author-messages"
            label={t("كل الرسائل الخاصة به", "All messages from him")} color="danger"
            action={() => void openUserCleanConfirmation(channel.id, author)} />
    );
};

/** User menu: "clean messages" (yours, in the current channel) beside "all messages from him". */
const UserContextMenuPatch: NavContextMenuPatchCallback = (children, ctx: { channel?: Channel; user?: User; } = {}) => {
    const { user } = ctx;
    if (!user || isCleaningInProgress) return;

    const channelId = ctx.channel?.id ?? SelectedChannelStore.getChannelId();
    if (!channelId) return;

    const group = findGroupChildrenByChildId("tr", children) ?? children;
    if (!group) return;

    group.push(
        <Menu.MenuSeparator key="separator-user" />,
        <Menu.MenuItem key="vc-user-clean-messages" id="vc-user-clean-messages"
            label={t("تنظيف الرسائل", "Clean messages")} color="danger"
            action={() => void openCleanConfirmation(channelId)} />,
        <Menu.MenuItem key="vc-user-clean-his-messages" id="vc-user-clean-his-messages"
            label={t("كل الرسائل الخاصة به", "All messages from him")} color="danger"
            action={() => void openUserCleanConfirmation(channelId, user)} />
    );
};

export default definePlugin({
    name: "MessageCleaner",
    description: "Cleans all messages in a channel with smart rate limiting and statistics",
    authors: [{ name: "!Btw", id: 1125377831745093703n }],
    dependencies: ["ContextMenuAPI"],
    settings,

    contextMenus: {
        "channel-context": ChannelContextMenuPatch,
        "gdm-context": GdmContextMenuPatch,
        "message-context": MessageContextMenuPatch,
        "user-context": UserContextMenuPatch,
        "guild-context": GuildContextMenuPatch
    },

    start() {
        log("🚀 Plugin MessageCleaner start");
    },

    stop() {
        log("🛑 Plugin MessageCleaner stop");
        if (isCleaningInProgress) shouldStopCleaning = true;
    }
});
