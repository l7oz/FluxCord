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

import { debounce } from "@shared/debounce";
import { IpcEvents } from "@shared/IpcEvents";
import { contextBridge, webFrame } from "electron/renderer";
import { readFileSync } from "fs";
import { join } from "path";

import VencordNative, { invoke, sendSync } from "./VencordNative";

contextBridge.exposeInMainWorld("VencordNative", VencordNative);

// Discord
if (location.protocol !== "data:") {
    invoke(IpcEvents.INIT_FILE_WATCHERS);

    if (IS_DISCORD_DESKTOP) {
        // renderer.js sits next to this preload. Reading it here skips a multi-megabyte synchronous IPC
        // round trip that blocks both the main process and this renderer during startup.
        let rendererJs: string;
        try {
            rendererJs = readFileSync(join(__dirname, "renderer.js"), "utf-8");
        } catch {
            rendererJs = sendSync<string>(IpcEvents.PRELOAD_GET_RENDERER_JS);
        }
        webFrame.executeJavaScript(rendererJs);
        // Not supported in sandboxed preload scripts but Discord doesn't support it either so who cares
        require(process.env.DISCORD_PRELOAD!);
    }
} // Monaco popout
else {
    contextBridge.exposeInMainWorld("setCss", debounce(VencordNative.quickCss.set));
    contextBridge.exposeInMainWorld("getCurrentCss", VencordNative.quickCss.get);
    contextBridge.exposeInMainWorld("getTheme", VencordNative.quickCss.getEditorTheme);
}
