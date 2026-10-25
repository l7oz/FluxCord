/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findComponentByCodeLazy } from "@webpack";
import type { CSSProperties } from "react";

import { getTestcordIconColor } from "../iconColors";
import { NotesDataIcon } from "./Icons";
import { openNotesDataModal } from "./NotesDataModal";

const HeaderBarIcon = findComponentByCodeLazy("iconClassName", "badge", '"aria-haspopup":');

export function OpenNotesDataButton() {
    const iconColor = getTestcordIconColor("headerBarButtonIconColor")
        ?? getTestcordIconColor("userAreaButtonIconColor");

    return (
        <span className="vc-plugin-icon-button" style={{ "--vc-plugin-icon-color": iconColor } as CSSProperties}>
            <HeaderBarIcon
                className="vc-plugin-icon-button vc-notes-toolbox-button"
                iconClassName="vc-plugin-icon-button"
                onClick={() => openNotesDataModal()}
                tooltip={"Open Notes Data"}
                icon={NotesDataIcon}
            />
        </span>
    );
}
