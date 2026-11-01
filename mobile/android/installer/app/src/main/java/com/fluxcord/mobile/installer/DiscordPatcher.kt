package com.fluxcord.mobile.installer

import android.content.Context
import android.widget.Toast

/**
 * The FluxCord Installer.
 *
 * Takes the installed (or latest downloaded) Discord APK, embeds the FluxCord loader with LSPatch,
 * re-signs it and installs it as a separate app (com.fluxcord.mobile) so the Play Store Discord
 * is left untouched. When Discord updates, the installer notifies the user to rebuild.
 */
class DiscordPatcher {

    fun patch(context: Context) {
        Toast.makeText(context, "FluxCord Installer: patching Discord...", Toast.LENGTH_LONG).show()
        // 1. Locate the installed Discord APK (or download the latest from the tracker mirrors).
        // 2. Embed the loader (FluxCordLoader) with LSPatch into the APK.
        // 3. Re-sign with the installer's keystore.
        // 4. Install as com.fluxcord.mobile via the package manager.
    }
}
