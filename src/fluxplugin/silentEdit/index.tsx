/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessagePopoverButton as addButton, removeMessagePopoverButton as removeButton } from "@api/MessagePopover";
import { definePluginSettings } from "@api/Settings";
import { BanRiskWarning } from "@utils/fluxBanWarning";
import { t } from "@utils/fluxI18n";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { ChannelStore, UserStore } from "@webpack/common";

const MessageActions = findByPropsLazy("deleteMessage", "startEditMessage");

const settings = definePluginSettings({
    warning: {
        type: OptionType.COMPONENT,
        component: () => <BanRiskWarning
            ar="تحذير: التعديل الصامت وتجاوز سجلّ الرسائل قد يخالف شروط خدمة Discord ويعرّض حسابك للحظر. استخدمها بمسؤولية."
            en="Warning: silently editing and bypassing the message logger may violate Discord's Terms of Service and could get your account banned. Use responsibly."
        />,
    },
    accentColor: {
        type: OptionType.STRING,
        description: t("لون أيقونة التعديل الصامت (رمز hex).", "Accent color for the Silent Edit icon (hex code)."),
        default: "#ed4245"
    }
});

const SilentEditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={settings.store.accentColor || "#ed4245"}>
        <path d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" />
    </svg>
);

export default definePlugin({
    name: "SilentEdit",
    description: "Edit a message with a single direct edit — no re-send, no delete tricks. Pair with NoEditedTimestamp to hide the edit tag.",
    authors: [{ name: "Aurick", id: 1348025017233047634n }],
    dependencies: ["MessagePopoverAPI"],
    settings,
    start() {
        addButton("SilentEdit", msg => {
            if (msg.author.id !== UserStore.getCurrentUser().id) return null;

            // Open Discord's own editor and let the normal edit go through
            // untouched: one operation, no new message, no delete.
            const handleClick = () => {
                MessageActions.startEditMessage(msg.channel_id, msg.id, msg.content);
            };

            return {
                label: t("تعديل صامت", "Silent Edit"),
                icon: SilentEditIcon,
                message: msg,
                channel: ChannelStore.getChannel(msg.channel_id),
                onClick: handleClick
            };
        }, SilentEditIcon);
    },

    stop() {
        removeButton("SilentEdit");
    }
});
