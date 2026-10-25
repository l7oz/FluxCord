/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotice } from "@api/Notices";
import { getEnabledConflicts } from "@api/PluginConflicts";
import { hasAnyVisibleSettings, isPluginEnabled, pluginRequiresRestart, plugins, startDependenciesRecursive, startPlugin, stopPlugin } from "@api/PluginManager";
import { Settings } from "@api/Settings";
import { CogWheel, InfoIcon } from "@components/Icons";
import { AddonCard } from "@components/settings/AddonCard";
import { FLUXCORD_MARK } from "@utils/branding";
import { classNameFactory } from "@utils/css";
import { useI18n } from "@utils/i18n";
import { Logger } from "@utils/Logger";
import { Plugin } from "@utils/types";
import { Modal, openModal, React, showToast, Toasts } from "@webpack/common";

import { PluginMeta } from "~plugins";

import { openPluginModal } from "./PluginModal";

const logger = new Logger("PluginCard");
const cl = classNameFactory("vc-plugins-");
interface PluginCardProps extends React.HTMLProps<HTMLDivElement> {
    plugin: Plugin;
    disabled?: boolean;
    onRestartNeeded(name: string, key: string): void;
    isNew?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export function PluginCard({ plugin, disabled, onRestartNeeded, onMouseEnter, onMouseLeave, isNew }: PluginCardProps) {
    const { t, tPluginDesc } = useI18n();
    const settings = Settings.plugins[plugin.name];
    const pluginMeta = PluginMeta[plugin.name];
    const isEquicordPlugin = pluginMeta.folderName.startsWith("src/equicordplugins/") ?? false;
    const isVencordPlugin = pluginMeta.folderName.startsWith("src/plugins/") ?? false;
    const isUserPlugin = pluginMeta?.userPlugin ?? false;
    const isModifiedPlugin = plugin.isModified ?? false;

    const isEnabled = () => isPluginEnabled(plugin.name);

    function turnOff(name: string) {
        const other = plugins[name];
        if (other.started && !pluginRequiresRestart(other)) stopPlugin(other);
        Settings.plugins[name].enabled = false;
        onRestartNeeded(name, "enabled");
    }

    function toggleEnabled() {
        const conflicts = isEnabled() ? [] : getEnabledConflicts(plugin.name);
        if (!conflicts.length) return applyToggle();

        // Discord's Alerts no longer show a third button, so this uses a modal with its own actions
        const vars = { name: plugin.name, others: conflicts.join(", ") };
        openModal(props => (
            <Modal
                {...props}
                size="sm"
                title={t("{name} and {others} don't mix", vars)}
                subtitle={t("They change the same part of Discord, so one of them would stop working. Turn off {others} and use {name} instead?", vars)}
                actions={[
                    { text: t("Cancel"), variant: "secondary", onClick: props.onClose },
                    {
                        text: t("Keep both on"),
                        variant: "secondary",
                        onClick() {
                            props.onClose();
                            applyToggle();
                        }
                    },
                    {
                        text: t("Use {name}", vars),
                        variant: "primary",
                        onClick() {
                            props.onClose();
                            conflicts.forEach(turnOff);
                            applyToggle();
                        }
                    }
                ]}
            />
        ));
    }

    function applyToggle() {
        const wasEnabled = isEnabled();

        // If we're enabling a plugin, make sure all deps are enabled recursively.
        if (!wasEnabled) {
            const { restartNeeded, failures } = startDependenciesRecursive(plugin);

            if (failures.length) {
                logger.error(`Failed to start dependencies for ${plugin.name}: ${failures.join(", ")}`);
                showNotice(t("Some helpers this plugin needs couldn't start :( {list}", { list: failures.join(", ") }), t("Close"), () => null);
                return;
            }

            if (restartNeeded) {
                // If any dependencies have patches, don't start the plugin yet.
                settings.enabled = true;
                onRestartNeeded(plugin.name, "enabled");
                return;
            }
        }

        // if the plugin requires a restart, don't use stopPlugin/startPlugin. Wait for restart to apply changes.
        if (pluginRequiresRestart(plugin)) {
            settings.enabled = !wasEnabled;
            onRestartNeeded(plugin.name, "enabled");
            return;
        }

        // If the plugin is enabled, but hasn't been started, then we can just toggle it off.
        if (wasEnabled && !plugin.started) {
            settings.enabled = !wasEnabled;
            return;
        }

        const result = wasEnabled ? stopPlugin(plugin) : startPlugin(plugin);

        if (!result) {
            settings.enabled = false;

            const msg = t(wasEnabled ? "{name} didn't want to stop :( Restart Discord and it'll be off." : "{name} couldn't start this time :( Try turning it on again, or restart Discord.", { name: plugin.name });
            showToast(msg, Toasts.Type.FAILURE, {
                position: Toasts.Position.BOTTOM,
            });

            return;
        }

        settings.enabled = !wasEnabled;
    }

    const pluginInfo = [
        {
            condition: isModifiedPlugin,
            src: "https://equicord.org/assets/icons/equicord/modified.png",
            alt: "Modified",
            title: "Modified Vencord Plugin"
        },
        {
            condition: isEquicordPlugin,
            src: "https://equicord.org/assets/favicon.png",
            alt: "Equicord",
            title: "Equicord Plugin"
        },
        {
            condition: isVencordPlugin,
            src: "https://equicord.org/assets/icons/vencord/icon-light.png",
            alt: "Vencord",
            title: "Vencord Plugin"
        },
        {
            condition: isUserPlugin,
            src: FLUXCORD_MARK,
            alt: "FluxPlugin",
            title: "FluxPlugin"
        }
    ];

    const pluginDetails = pluginInfo.find(p => p.condition);

    const sourceBadge = pluginDetails ? (
        <img
            src={pluginDetails.src}
            alt={pluginDetails.alt}
            className={cl("source")}
        />
    ) : null;

    const tooltip = pluginDetails?.title || "Unknown Plugin";

    return (
        <AddonCard
            name={plugin.name}
            sourceBadge={sourceBadge}
            tooltip={tooltip}
            description={tPluginDesc(plugin.name, plugin.description)}
            isNew={isNew}
            enabled={isEnabled()}
            setEnabled={toggleEnabled}
            disabled={disabled}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            infoButton={
                <button
                    role="switch"
                    onClick={() => openPluginModal(plugin, onRestartNeeded)}
                    className={cl("info-button")}
                >
                    {hasAnyVisibleSettings(plugin)
                        ? <CogWheel className={cl("info-icon")} />
                        : <InfoIcon className={cl("info-icon")} />
                    }
                </button>
            } />
    );
}
