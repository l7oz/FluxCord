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

function canDeleteMessage(message: Message, currentUserId: string): boolean {
    try {
        if (message.author?.id !== currentUserId) return false;
        if (settings.store.skipSystemMessages && message.type !== 0 && message.type !== 19) return false;

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
    if (settings.store.skipSystemMessages && message.type !== 0 && message.type !== 19) return false;
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
        await RestAPI.del({ url: `/channels/${channelId}/messages/${messageId}` });
        return true;
    } catch (error: any) {
        const statusCode = error?.status || error?.statusCode || "N/A";
        debugLog(`❌ Error suppression ${messageId}: status ${statusCode}`);
        return false;
    }
}

async function getChannelMessages(channelId: string, before?: string): Promise<Message[]> {
    try {
        const url = before
            ? `/channels/${channelId}/messages?limit=${settings.store.batchSize}&before=${before}`
            : `/channels/${channelId}/messages?limit=${settings.store.batchSize}`;
        const response = await RestAPI.get({ url });
        if (!response || !response.body) return [];
        return Array.isArray(response.body) ? response.body : [];
    } catch (error: any) {
        const statusCode = error?.status || error?.statusCode || "N/A";
        log(`❌ Error récupération messages: status ${statusCode}`, "error");
        return [];
    }
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

/** First page of the guild search for your own messages — mirrors cleanGuild's query. */
async function collectGuildPreview(guildId: string): Promise<CleanPreview> {
    const currentUserId = UserStore.getCurrentUser()?.id;
    if (!currentUserId) return { sample: [], more: false };

    try {
        const response = await RestAPI.get({ url: `/guilds/${guildId}/messages/search?author_id=${currentUserId}` });
        const groups: Message[][] = response?.body?.messages ?? [];

        const unique = new Map<string, Message>();
        for (const group of groups)
            for (const message of group)
                if (!unique.has(message.id)) unique.set(message.id, message);

        const all = [...unique.values()];
        return {
            sample: all.filter(m => canDeleteMessage(m, currentUserId)).slice(0, PREVIEW_MAX_ITEMS),
            // The search endpoint returns 25 results per page — a full page means more exist.
            more: all.length >= 25
        };
    } catch {
        return { sample: [], more: false };
    }
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

        isCleaningInProgress = true;
        shouldStopCleaning = false;
        cleaningStats = { total: 0, deleted: 0, failed: 0, skipped: 0, startTime: Date.now() };

        let lastMessageId: string | undefined;
        let totalProcessed = 0;

        while (!shouldStopCleaning) {
            try {
                const messages = await getChannelMessages(channelId, lastMessageId);
                if (messages.length === 0) { log("Plus de messages à traiter"); break; }

                const validMessages = messages.filter(msg => messageMatches(msg, currentUserId, mode, targetUserId));
                cleaningStats.total += validMessages.length;

                if (validMessages.length === 0) {
                    lastMessageId = messages[messages.length - 1].id;
                    cleaningStats.skipped += messages.length;
                    if (messages.length < settings.store.batchSize) break;
                    continue;
                }

                for (const message of validMessages) {
                    if (shouldStopCleaning) { log("Arrêt demandé par l'utilisateur"); break; }

                    const success = await deleteMessage(channelId, message.id);
                    if (success) cleaningStats.deleted++;
                    else cleaningStats.failed++;

                    totalProcessed++;
                    if (settings.store.delayBetweenDeletes > 0) {
                        await new Promise(resolve => setTimeout(resolve, settings.store.delayBetweenDeletes));
                    }
                }

                cleaningStats.skipped += messages.filter(msg => !messageMatches(msg, currentUserId, mode, targetUserId)).length;
                lastMessageId = messages[messages.length - 1].id;
                if (messages.length < settings.store.batchSize) break;

            } catch (error: any) {
                const statusCode = error?.status || error?.statusCode || "N/A";
                log(`❌ Error dans la boucle: status ${statusCode}`, "error");
                cleaningStats.failed++;

                if (statusCode === 429) {
                    log("Rate limit atteint, pause 30s...", "warn");
                    await new Promise(resolve => setTimeout(resolve, 30000));
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }

                if (cleaningStats.failed > 15) { log("Trop d'errors, arrêt", "error"); break; }
            }
        }

        isCleaningInProgress = false;
        const { deleted, failed, skipped } = cleaningStats;
        const totalTime = Date.now() - cleaningStats.startTime;
        const timeStr = totalTime < 60000 ? `${Math.round(totalTime / 1000)}s` : `${Math.round(totalTime / 60000)}min`;
        log(`✅ Nettoyage terminé: ${deleted} supprimés, ${failed} échecs, ${skipped} ignorés — ${timeStr}`);

    } catch (error) {
        isCleaningInProgress = false;
        log(`❌ Error globale: ${error}`, "error");
    }
}

async function cleanGuild(guildId: string) {
    if (!settings.store.enabled || isCleaningInProgress) return;

    try {
        const currentUserId = UserStore.getCurrentUser()?.id;
        if (!currentUserId) return;

        log(`🧹 Starting cleanup of guild ${guildId}`);

        isCleaningInProgress = true;
        shouldStopCleaning = false;
        cleaningStats = { total: 0, deleted: 0, failed: 0, skipped: 0, startTime: Date.now() };

        let maxId: string | undefined;
        let totalProcessed = 0;

        while (!shouldStopCleaning) {
            try {
                let url = `/guilds/${guildId}/messages/search?author_id=${currentUserId}`;
                if (maxId) url += `&max_id=${maxId}`;

                const response = await RestAPI.get({ url });
                if (!response || !response.body || !response.body.messages || response.body.messages.length === 0) {
                    log("Plus de messages à traiter dans le serveur");
                    break;
                }

                let messages: any[] = [];
                for (const group of response.body.messages) {
                    for (const msg of group) {
                        if (msg.author && msg.author.id === currentUserId) {
                            messages.push(msg);
                        }
                    }
                }

                // Unique messages
                const uniqueMsgs: Message[] = [];
                const seen = new Set<string>();
                for (const m of messages) {
                    if (!seen.has(m.id)) {
                        seen.add(m.id);
                        uniqueMsgs.push(m);
                    }
                }
                messages = uniqueMsgs;

                if (messages.length === 0) {
                    log("Aucun message trouvé dans ce lot.");
                    break; // or continue with offset? max_id should guarantee progress if we set it properly
                }

                // Find oldest ID for next pagination
                let oldestId = messages[0].id;
                for (const m of messages) {
                    if (BigInt(m.id) < BigInt(oldestId)) {
                        oldestId = m.id;
                    }
                }
                maxId = (BigInt(oldestId) - 1n).toString();

                const validMessages = messages.filter(msg => canDeleteMessage(msg, currentUserId));
                cleaningStats.total += validMessages.length;

                if (validMessages.length === 0) {
                    cleaningStats.skipped += messages.length;
                    continue;
                }

                for (const message of validMessages) {
                    if (shouldStopCleaning) { log("Arrêt demandé par l'utilisateur"); break; }

                    const channelId = message.channel_id;
                    if (!channelId) continue;

                    const success = await deleteMessage(channelId, message.id);
                    if (success) cleaningStats.deleted++;
                    else cleaningStats.failed++;

                    totalProcessed++;
                    if (settings.store.delayBetweenDeletes > 0) {
                        await new Promise(resolve => setTimeout(resolve, settings.store.delayBetweenDeletes));
                    }
                }

                cleaningStats.skipped += messages.filter(msg => !canDeleteMessage(msg, currentUserId)).length;

            } catch (error: any) {
                const statusCode = error?.status || error?.statusCode || "N/A";
                log(`❌ Error dans la boucle serveur: status ${statusCode}`, "error");
                cleaningStats.failed++;

                if (statusCode === 429) {
                    log("Rate limit atteint, pause 30s...", "warn");
                    await new Promise(resolve => setTimeout(resolve, 30000));
                } else if (statusCode === 403 || statusCode === 400) {
                    log("Impossible de chercher dans ce serveur (permissions ?)", "error");
                    break;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }

                if (cleaningStats.failed > 15) { log("Trop d'erreurs, arrêt", "error"); break; }
            }
        }

        isCleaningInProgress = false;
        const { deleted, failed, skipped } = cleaningStats;
        const totalTime = Date.now() - cleaningStats.startTime;
        const timeStr = totalTime < 60000 ? `${Math.round(totalTime / 1000)}s` : `${Math.round(totalTime / 60000)}min`;
        log(`✅ Nettoyage du serveur terminé: ${deleted} supprimés, ${failed} échecs, ${skipped} ignorés — ${timeStr}`);

    } catch (error) {
        isCleaningInProgress = false;
        log(`❌ Error globale serveur: ${error}`, "error");
    }
}

function stopCleaning() {
    if (isCleaningInProgress) {
        shouldStopCleaning = true;
        log("⏹️ Arrêt du nettoyage demandé");
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

    const preview = await collectPreview(channelId, "channel");
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

    const preview = await collectPreview(channelId, "user", user.id);
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

    const preview = await collectGuildPreview(guildId);
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
        const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;

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
        const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;

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
    authors: [{ name: "Bash", id: 1327483363518582784n }],
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
        log("🚀 Plugin MessageCleaner démarré");
    },

    stop() {
        log("🛑 Plugin MessageCleaner arrêté");
        if (isCleaningInProgress) shouldStopCleaning = true;
    }
});
