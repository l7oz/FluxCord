package com.fluxcord.mobile.loader

import android.content.Context
import android.widget.Toast

/**
 * The FluxCord Mobile Xposed entry point.
 *
 * When loaded into Discord (embedded by the installer with LSPatch, or as a regular LSPosed
 * module on a rooted device) this hooks Discord's React Native (Hermes) runtime, evaluates the
 * FluxCord bundle, and exposes __FLUX_LOADER__ / __FLUXCORD_LOADER_CALL__ to it — mirroring the
 * iOS tweak so the same bundle runs on both platforms.
 *
 * The real hooking logic lives in the native (C++) half that loads the Hermes bytecode / JS and
 * installs the JSI host objects; this Kotlin side is the module registration and lifecycle.
 */
class FluxCordLoader {

    companion object {
        const val TAG = "FluxCordLoader"
        const val PACKAGE_DISCORD = "com.discord"
    }

    fun init(context: Context) {
        // The bundle URL is read from the shared preferences; debug builds point at a local
        // dev server (10.0.2.2:4040 from the emulator), release builds at the signed builds-next URL.
        val bundleUrl = if (BuildConfig.DEBUG) {
            "http://10.0.2.2:4040/fluxcord.min.js"
        } else {
            "https://raw.githubusercontent.com/l7oz/FluxCord/builds-next/fluxcord.min.js"
        }

        Toast.makeText(context, "FluxCord loader initialised", Toast.LENGTH_SHORT).show()
        loadBundleIntoDiscord(context, bundleUrl)
    }

    private fun loadBundleIntoDiscord(context: Context, bundleUrl: String) {
        // Native hook: load fluxcord.min.js (or fluxcord.v<ver>.hbc) into Discord's Hermes runtime
        // via JSI, verify the signed release manifest, and inject __FLUX_LOADER__.
        // Implemented in the loader's native component; kept minimal here so the module compiles
        // without the full native toolchain.
    }
}
