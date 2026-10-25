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

import "./fixDiscordBadgePadding.css";

import { _getBadges, BadgeListProcessors, BadgePosition, BadgeUserArgs, ProfileBadge } from "@api/Badges";
import ErrorBoundary from "@components/ErrorBoundary";
import { CopyIcon, LinkIcon } from "@components/Icons";
import { openContributorModal } from "@components/settings/tabs";
import { FLUXCORD_MARK } from "@utils/branding";
import { Devs } from "@utils/constants";
import { copyWithToast } from "@utils/discord";
import { t } from "@utils/i18n";
import { Logger } from "@utils/Logger";
import { shouldShowContributorBadge, shouldShowEquicordContributorBadge } from "@utils/misc";
import definePlugin from "@utils/types";
import { ContextMenuApi, Menu, showToast, UserStore } from "@webpack/common";

import Plugins, { PluginMeta } from "~plugins";

import { EquicordDonorModal, EquicordTranslatorModal, VencordDonorModal } from "./modals";

const CONTRIBUTOR_BADGE = "https://cdn.discordapp.com/emojis/1092089799109775453.png?size=64";
const EQUICORD_CONTRIBUTOR_BADGE = FLUXCORD_MARK;
const USERPLUGIN_CONTRIBUTOR_BADGE = "https://equicord.org/assets/icons/misc/userplugin.png";

const ContributorBadge: ProfileBadge = {
    id: "vencord_contributor_badge",
    description: "Vencord Contributor",
    iconSrc: CONTRIBUTOR_BADGE,
    position: BadgePosition.START,
    shouldShow: ({ userId }) => shouldShowContributorBadge(userId),
    onClick: (_, { userId }) => openContributorModal(UserStore.getUser(userId))
};

const EquicordContributorBadge: ProfileBadge = {
    id: "equicord_contributor_badge",
    description: "FluxCord Contributor",
    iconSrc: EQUICORD_CONTRIBUTOR_BADGE,
    position: BadgePosition.START,
    shouldShow: ({ userId }) => shouldShowEquicordContributorBadge(userId),
    onClick: (_, { userId }) => openContributorModal(UserStore.getUser(userId)),
    props: {
        style: {
            borderRadius: "50%",
            transform: "scale(0.9)"
        }
    },
};

const UserPluginContributorBadge: ProfileBadge = {
    id: "user_plugin_contributor_badge",
    description: "User Plugin Contributor",
    iconSrc: USERPLUGIN_CONTRIBUTOR_BADGE,
    position: BadgePosition.START,
    shouldShow: ({ userId }) => {
        if (!IS_DEV) return false;
        const allPlugins = Object.values(Plugins);
        return allPlugins.some(p => {
            const pluginMeta = PluginMeta[p.name];
            return pluginMeta?.userPlugin && p.authors.some(a => a.id.toString() === userId);
        });
    },
    onClick: (_, { userId }) => openContributorModal(UserStore.getUser(userId)),
    props: {
        style: {
            borderRadius: "50%",
            transform: "scale(0.9)"
        }
    },
};

let DonorBadges = {} as Record<string, Array<Record<"tooltip" | "badge", string>>>;
let EquicordDonorBadges = {} as Record<string, Array<Record<"tooltip" | "badge", string>>>;
let FluxTeamBadges = {} as Record<string, Array<{ badge: string; tooltip: string; }>>;

const FLUX_BORED = "https://raw.githubusercontent.com/l7oz/Flux-bored/main";

async function loadBadges(url: string, noCache = false) {
    const init = {} as RequestInit;
    if (noCache) init.cache = "no-cache";

    return await fetch(url, init).then(r => r.json());
}

interface FluxTeamJson {
    owner: string[];
    admin: string[];
    tester: string[];
    supporter: string[];
    highlight: Record<string, { ar: string; en: string; }>;
}

const FLUX_ROLE_TOOLTIPS = {
    owner: "FluxCord Owner",
    admin: "FluxCord Admin",
    supporter: "FluxCord Supporter",
    tester: "FluxCord Tester",
} as const;

function buildFluxTeamBadges(team: FluxTeamJson) {
    const out = {} as typeof FluxTeamBadges;
    (Object.keys(FLUX_ROLE_TOOLTIPS) as Array<keyof typeof FLUX_ROLE_TOOLTIPS>).forEach(role => {
        for (const id of team[role] ?? []) {
            (out[id] ??= []).push({
                badge: `${FLUX_BORED}/badges/${role}/${role}.png`,
                tooltip: team.highlight?.[id]?.en ?? FLUX_ROLE_TOOLTIPS[role],
            });
        }
    });
    return out;
}

async function loadAllBadges(noCache = false) {
    // Each source is independent: one dead host must not take the others down
    // (badge.equicord.org currently does not resolve, so it is skipped silently).
    try {
        DonorBadges = await loadBadges("https://badges.vencord.dev/badges.json", noCache);
    } catch { /* keep previous data */ }
    try {
        EquicordDonorBadges = await loadBadges("https://badge.equicord.org/badges.json", noCache);
    } catch { /* keep previous data */ }
    try {
        FluxTeamBadges = buildFluxTeamBadges(await loadBadges(`${FLUX_BORED}/team.json`, noCache));
    } catch { /* keep previous data */ }
}

let intervalId: any;

export function BadgeContextMenu({ badge }: { badge: Omit<ProfileBadge, "id"> & BadgeUserArgs; }) {
    return (
        <Menu.Menu
            navId="vc-badge-context"
            onClose={ContextMenuApi.closeContextMenu}
            aria-label="Badge Options"
        >
            {badge.description && (
                <Menu.MenuItem
                    id="vc-badge-copy-name"
                    label={t("Copy Badge Name")}
                    action={() => copyWithToast(badge.description!)}
                    leadingAccessory={{ type: "icon", icon: CopyIcon }}
                />
            )}
            {badge.iconSrc && (
                <Menu.MenuItem
                    id="vc-badge-copy-link"
                    label={t("Copy Badge Image Link")}
                    action={() => copyWithToast(badge.iconSrc!)}
                    leadingAccessory={{ type: "icon", icon: LinkIcon }}
                />
            )}
        </Menu.Menu>
    );
}

function makeDonorBadge(badge: { badge: string; tooltip: string; }, id: string) {
    return {
        id,
        iconSrc: badge.badge,
        description: badge.tooltip,
        position: BadgePosition.START,
        props: {
            style: {
                borderRadius: "50%",
                transform: "scale(0.9)" // The image is a bit too big compared to default badges
            }
        },
        onContextMenu(event, badge) {
            ContextMenuApi.openContextMenu(event, () => <BadgeContextMenu badge={badge} />);
        },
    };
}

export default definePlugin({
    name: "BadgeAPI",
    description: "API to add badges to users",
    authors: [Devs.Megu, Devs.Ven, Devs.TheSun],
    required: true,
    patches: [
        {
            find: "#{intl::PROFILE_USER_BADGES}",
            replacement: [
                {
                    match: /alt:" ","aria-hidden":!0,src:.{0,50}(\i).iconSrc/,
                    replace: "...$1.props,$&"
                },
                // Path with 2026-04-badge-discovery OFF
                {
                    match: /(?<=forceOpen:.{0,40}?ariaHidden:!0,)children:(?=.{0,50}?(\i)\.id)/,
                    replace: "children:$1.component?$self.renderBadgeComponent({...$1}):"
                },
                // Path with 2026-04-badge-discovery ON
                {
                    match: /(?<=fallbackIconSrc:.{0,50}?)children:(?=.{0,50}?(\i)\.id)/,
                    replace: "children:$1.component?$self.renderBadgeComponent({...$1}):"
                },
                // handle onClick and onContextMenu
                {
                    match: /href:(\i)\.link/,
                    replace: "...$self.getBadgeMouseEventHandlers($1),$&"
                }
            ]
        },
        {
            find: "getLegacyUsername(){",
            replacement: {
                // Keep Discord's list under a new name, add our badges to it, and let plugins reorder or filter the result
                match: /getBadges\(\)\{(.{0,100}?)return\[/,
                replace: "getBadges(){return $self.processBadges(this,this.ecUnprocessedBadges())}ecUnprocessedBadges(){$1return[...$self.getBadges(this),"
            }
        }
    ],

    // for access from the console or other plugins
    get DonorBadges() {
        return DonorBadges;
    },

    get EquicordDonorBadges() {
        return EquicordDonorBadges;
    },

    get FluxTeamBadges() {
        return FluxTeamBadges;
    },

    toolboxActions: {
        async "Refetch Badges"() {
            await loadAllBadges(true);
            showToast("Successfully refetched badges!", "success");
        }
    },

    userProfileBadges: [ContributorBadge, EquicordContributorBadge, UserPluginContributorBadge],

    async start() {
        await loadAllBadges();
        clearInterval(intervalId);
        intervalId = setInterval(loadAllBadges, 1000 * 60 * 30); // 30 minutes
    },

    async stop() {
        clearInterval(intervalId);
    },

    set DonorBadges(val: any) {
        DonorBadges = val;
    },

    getBadges(profile: { userId: string; guildId: string; }) {
        if (!profile) return [];

        try {
            return _getBadges(profile);
        } catch (e) {
            new Logger("BadgeAPI#getBadges").error(e);
            return [];
        }
    },

    processBadges(profile: { userId: string; guildId: string; }, badges: any[]) {
        if (!profile || !BadgeListProcessors.size) return badges;

        for (const process of BadgeListProcessors) {
            try {
                badges = process(profile, badges) ?? badges;
            } catch (e) {
                new Logger("BadgeAPI#processBadges").error(e);
            }
        }
        return badges;
    },

    renderBadgeComponent: ErrorBoundary.wrap((badge: ProfileBadge & BadgeUserArgs) => {
        const Component = badge.component!;
        return <Component {...badge} />;
    }, { noop: true }),

    getBadgeMouseEventHandlers(badge: ProfileBadge & BadgeUserArgs) {
        const handlers = {} as Record<string, (e: React.MouseEvent) => void>;

        if (!badge) return handlers;

        const { onClick, onContextMenu } = badge;

        if (onClick) handlers.onClick = e => onClick(e, badge);
        if (onContextMenu) handlers.onContextMenu = e => onContextMenu(e, badge);

        return handlers;
    },

    getDonorBadges(userId: string) {
        const userBadges = DonorBadges[userId];
        if (!userBadges) return [];

        const list = Array.isArray(userBadges) ? userBadges : ((userBadges as any)?.badges || []);
        return list.map((badge: any, idx: number) => ({
            id: badge.id ?? `fluxcord_donor_badge_${idx}`,
            iconSrc: badge.badge || badge.icon || badge.iconSrc,
            description: badge.tooltip || badge.description || "Custom Badge",
            position: BadgePosition.START,
            props: {
                style: {
                    background: "transparent",
                    backgroundColor: "transparent",
                    transform: "scale(1.05)"
                }
            },
            onContextMenu(event, badge) {
                ContextMenuApi.openContextMenu(event, () => <BadgeContextMenu badge={badge} />);
            },
            onClick() {
                return VencordDonorModal();
            },
        } satisfies ProfileBadge));
    },

    getEquicordDonorBadges(userId: string) {
        const equicord = (EquicordDonorBadges[userId] ?? []).map((badge, idx) => ({
            ...makeDonorBadge(badge, `equicord_donor_badge_${idx}`),
            onClick() {
                return badge.tooltip === "FluxCord Translator" ? EquicordTranslatorModal() : EquicordDonorModal();
            },
        } satisfies ProfileBadge));
        const flux = (FluxTeamBadges[userId] ?? []).map((badge, idx) => ({
            ...makeDonorBadge(badge, `flux_team_badge_${idx}`),
        } satisfies ProfileBadge));
        return [...equicord, ...flux];
    }
});
