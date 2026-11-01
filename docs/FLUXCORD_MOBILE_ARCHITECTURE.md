# FluxCord Mobile Architecture

This document explains how FluxCord (desktop/browser) works, how Endcord Mobile works, and how FluxCord Mobile is
integrated into the FluxCord repository. It is the reference for everyone extending or maintaining the mobile code.

## 1. How FluxCord (desktop / browser) works

FluxCord is a Vencord-based Discord client modification. It runs inside Discord Desktop (Electron), Discord's web
client, and as a browser extension / userscript.

- **Entry:** `scripts/build/build.mjs` bundles the desktop client. The injected script patches Discord's webpack
  modules at `WebpackReady`.
- **Plugin API:** `definePlugin` from `@utils/types` (`src/utils/types.ts`). Plugins declare `settings`
  (`definePluginSettings`), `contextMenus`, `chatBarButton`, `flux`, `patches`, `commands`, `renderMessageAccessory`,
  etc. The `PluginManager` handles enabling/disabling, settings storage (`DataStore`, idb-backed), and lifecycle
  (`start`/`stop`).
- **Patching:** webpack-source patches keyed on intl hashes (`#{intl::KEY}`), minified identifiers (`\i`), and
  bounded lookarounds. Runs in the renderer process.
- **Native:** `native.ts` files register IPC handlers (`~pluginNatives`) for filesystem, network, and subprocess
  access. The renderer never touches `fs`/`path`/`child_process` directly.
- **Plugin folders:** `src/plugins/`, `src/equicordplugins/`, `src/fluxplugin/`. Folder suffixes gate builds
  (`.desktop`, `.web`, `.discordDesktop`, `.vesktop`, `.equibop`).
- **Module lookup:** `findByPropsLazy`, `findByCodeLazy`, `findStoreLazy` — name/prop based, broken by minification
  renames, anchored by intl hashes instead.

## 2. How Endcord Mobile works

Endcord Mobile is a fork of Revenge (BSD-3 for the bundle, GPL-3 for the Xposed loader, OSL-3 for the installer and
the iOS tweak). It loads the same JavaScript bundle into Discord on Android and iOS.

### The bundle (`bundle/`)
A self-contained React Native application written in TypeScript, built with esbuild + SWC (+ Hermes bytecode
compilation) into a single `endcord.min.js`. It contains:

- **The plugin system** (`src/plugins/api.ts`, `hooks.tsx`, `index.ts`, `manifest.ts`): `definePlugin` with a
  settings schema, `start(ctx)`/`stop(ctx)`, and a `cleanup` helper. Plugins are lazy-loaded — their code is fetched
  the first time they start or their settings open. A generated `manifest.ts` lists every plugin (name, description,
  tags, popularity) without loading code.
- **Shared hooks** (`src/plugins/hooks.tsx`): `onSend`, `onIncomingMessage`, `onMessageRow`, `addMessageAction`,
  `command`. Each hook patches Discord's React Native module once and is shared by every plugin that uses it. If one
  callback throws, it is logged and skipped; Discord never crashes.
- **Module discovery** (`src/metro/`): `moduleAt("modules/...tsx")` finds Discord modules by source path, which
  survives renames that break name lookups. `findByPropsLazy`/`findByStoreName` for stores.
- **Patching** (`src/lib/api/patcher.ts`): `instead`, `after`, `intercept` — function wrappers around Discord's
  React Native modules.
- **Storage** (`src/core/vendetta/storage`): MMKV-backed (`createMMKVBackend`), keyed per plugin as
  `ENDCORD_PLUGIN_<id>`.
- **Settings** (`src/lib/api/settings.ts`): a schema (`boolean`/`select`/`number`/`string`) rendered into a
  generated settings page; `SettingsComponent` for custom UI.
- **Translations** (`src/core/i18n/`): `t()`/`tx()` with locales compiled from Endcord PC; `overrides.json` for
  mobile-specific wording.
- **Themes, fonts, overlay, backup, fixes** (`src/core/`).

### Android (`android/`)
- **Loader** (`android/loader/`): an Xposed module (revenge-xposed, GPL-3) that hooks `com.discord`, loads the
  bundle into its React Native (Hermes) runtime via JSI, and exposes `__ENDCORD_LOADER_CALL__`/`__PYON_LOADER__`.
  Works embedded by the installer (no root) or as a regular LSPosed module (root).
- **Installer** (`android/installer/`): takes the installed or latest Discord APK, embeds the loader with LSPatch,
  re-signs, and installs as a separate app (`com.fluxcord.mobile` for FluxCord). Package names let the patched
  Discord coexist with the Play Store app.

### iOS (`ios/`)
- **Tweak** (`ios/Sources/Tweak.xm`): a RainTweak-based (OSL-3) tweak that hooks `RCTHost`'s
  `instance:didInitializeRuntime:` (Discord 332+, bridgeless React Native), starts the bundle from JSI, downloads
  it from a release URL (or a cached copy), verifies its signature, and injects `__PYON_LOADER__`.
- **Recovery:** shake the device for safe mode, custom bundle URL, plugin/theme deletion.
- **Outputs:** a rootless `.deb`, a `FluxCord.dylib` for injection, and a `FluxCord.ipa` (Discord with the tweak
  injected, from a decrypted Discord IPA).

## 3. How the FluxCord Mobile loader works

FluxCord Mobile reuses the Endcord Mobile loader design with FluxCord branding:

- **iOS tweak (`mobile/ios/`):** hooks `RCTHost.instance:didInitializeRuntime:`, loads `mobile/bundle/dist/fluxcord.min.js`
  (or the Hermes bytecode `.hbc` for the running Discord), verifies the signed release manifest, and exposes
  `__FLUXCORD_LOADER_CALL__` + `__FLUX_LOADER__` to the bundle. Shake → recovery menu.
- **Android loader (`mobile/android/loader/`):** Xposed module that injects the bundle into Discord's Hermes
  runtime. Bundle URL configurable (debug: local dev server; release: signed builds-next URL).
- **Android installer (`mobile/android/installer/`):** patches the installed/latest Discord, embeds the loader,
  re-signs, installs as `com.fluxcord.mobile`.

## 4. How the FluxCord Mobile bundle works

Same shape as Endcord's bundle, FluxCord-branded:

```
mobile/bundle/src/
  entry.ts            # hooks Discord's require, defers AppRegistry, starts the bundle
  index.ts            # bundle root: loads plugins, settings, themes
  core/
    i18n/             # t()/tx(), locales, overrides.json
    plugins/          # plugin registry + core-plugin adapter
    timings.ts        # startup timings
  lib/
    api/              # patcher (instead/after/intercept), native bridge, commands, flux, assets, settings
    ui/               # toasts, dialogs, settings page
    utils/            # logger, misc, react hooks
  metro/              # module discovery (moduleAt, findByPropsLazy, findByStoreName)
  plugins/
    api.ts            # definePlugin, PluginContext, startEndcordPlugin/stopEndcordPlugin
    hooks.tsx         # onSend, onIncomingMessage, onMessageRow, addMessageAction, command
    common.tsx        # moduleAt, getStore, onAction, subscribe, dispatchSoon, addChatButton, addSettingsPage
    index.ts          # lazy plugin loader (loadEndcordPlugin, getEndcordPlugins, getEndcordCorePlugins)
    manifest.ts       # generated: every plugin's name/description/tags without loading code
    shared/           # helpers shared by plugins
    <plugin>/index.ts # one folder per plugin
```

The build generates `manifest.ts` from the plugin folders, then esbuild bundles `entry.ts` into a single IIFE.
Plugins load lazily: the manifest is known at startup, but a plugin's code runs only when it is turned on.

## 5. How the iOS tweak works

The tweak is loaded into Discord (IPA-injected or `.deb` on jailbroken devices). In `%ctor` it checks that Discord is
new enough (React Native bridgeless, Discord 332+) and installs a hook on `RCTHost`:

```
%hook RCTHost
- (void)instance:(id)instance didInitializeRuntime:(JSI::Runtime &)runtime
{
    %orig;
    loadEndcord(runtime);   // never throws out of the tweak
}
%end
```

`loadEndcord`:
1. Loads the config (custom bundle URL, settings).
2. Injects `__FLUX_LOADER__` into the JSI runtime (`loaderName`, `loaderVersion`, `hasThemeSupport`,
   `storedTheme`, `fontPatch`, `__FLUXCORD_LOADER_CALL__`, `__FLUXCORD_LOADER_CALL_ASYNC__`).
3. Picks a usable bundle: saved copy on disk → bytecode `.hbc` matching Discord's Hermes version → plain JS from
   the release URL.
4. Verifies the signed release manifest (`endcord-release.json` + `.sig`) and refuses older/forged releases.
5. Evaluates the bundle in JSI; on failure shows an error alert and offers the recovery menu.

Bridge methods (`revenge.info`, theme config, etc.) let the bundle call native code synchronously or asynchronously.

## 6. How Android injection and installation work

- **Loader (no root):** the installer patches Discord's APK with LSPatch, embedding the Xposed loader. When Discord
  starts, the loader hooks the React Native runtime and evaluates the bundle.
- **Loader (root / LSPosed):** installed as a normal module, enabled for Discord in LSPosed.
- **Installer:** downloads or uses the installed Discord APK, embeds the loader, re-signs with the installer's
  keystore, and installs as a separate app so the Play Store Discord is untouched.
- **Updates:** the app checks the signed release manifest on every start and downloads a new bundle when one is
  published. When Discord updates, the installer notifies the user to rebuild.

## 7. How plugins are registered and loaded

1. Each plugin lives in `mobile/bundle/plugins/<name>/index.ts` and calls `definePlugin({ id, name, description,
   settings, start, stop?, ... })`.
2. `scripts/plugin-manifest.mjs` scans the folders and regenerates `mobile/bundle/src/plugins/manifest.ts` (names,
   descriptions, tags — no code loaded).
3. At startup the bundle knows every plugin's metadata. A plugin's code is loaded (`loadEndcordPlugin`) only when it
   is enabled or its settings open.
4. `getEndcordCorePlugins()` adapts each Endcord plugin into the Revenge `PluginInstanceInternal` shape so the
   plugin manager handles enable/disable and settings storage. The manager calls `start()` → `startEndcordPlugin()`,
   and `stop()` → `stopEndcordPlugin()`.
5. `startEndcordPlugin` loads settings storage, calls `plugin.start(ctx)`, registers cleanup functions, and on
   failure turns the plugin off, shows a toast, and runs cleanups — so a broken plugin never crashes Discord.

## 8. Which components can be reused

| Component | Reuse | Notes |
|---|---|---|
| Bundle plugin API (`definePlugin`, `start`/`stop`, `cleanup`) | Yes | Adapted wholesale, FluxCord-branded |
| Shared hooks (`onSend`, `onMessageRow`, `addMessageAction`, `command`) | Yes | Adapted to Discord's React Native modules |
| Module discovery by source path (`moduleAt`) | Yes | Same mechanism, FluxCord paths |
| Patcher (`instead`/`after`/`intercept`) | Yes | Same mechanism |
| MMKV-backed settings storage | Yes | Keyed `FLUXCORD_PLUGIN_<id>` |
| iOS tweak (RainTweak-based) | Yes | Rebranded, different bundle URL/signing key |
| Android Xposed loader | Yes | Rebranded, different package name |
| Android installer | Yes | Rebranded, different package name |
| Plugin manifest generation | Yes | Regenerated from FluxCord Mobile plugin folders |
| Translations (`t()`/`tx()`) | Yes | New FluxCord locale files |

## 9. Which components require adaptation

| Component | Adaptation |
|---|---|
| Existing FluxCord plugins (`src/plugins`, `src/fluxplugin`, `src/equicordplugins`) | Written for Vencord's desktop API (`@webpack/common`, `@api/*`, `definePlugin` from `@utils/types`, React desktop components, patches keyed on desktop webpack modules). Cannot run unchanged. Each must be audited and ported to the mobile plugin API (`onSend`/`onMessageRow`/`addMessageAction`/`command`, `moduleAt`, `definePlugin` from `mobile/bundle/src/plugins/api.ts`). |
| Desktop settings/components (`@components/*`, `@api/*`) | Not available on mobile. Mobile has its own settings schema and generated settings page; custom UI uses `SettingsComponent` with React Native components. |
| Patches keyed on desktop Discord modules | Rewritten to target Discord's React Native modules by source path (`moduleAt("modules/...tsx")`). |
| Electron/native.ts IPC | Not applicable on mobile. The bundle talks to native through the loader bridge (`__FLUXCORD_LOADER_CALL__`). |
| Bundle URL / signing key | New FluxCord release-signing key; bundle published under FluxCord's `builds-next` (or equivalent) branch. |
| Package IDs | `com.fluxcord.mobile` (patched Discord), `com.fluxcord.mobile.installer` (installer), loader module `com.fluxcord.mobile.xposed`. |

## 10. Which desktop features cannot work on mobile

- **Electron/Native IPC:** no `fs`, `path`, `child_process`, `electron`. File pickers, network allowlists through
  `native.ts`, and plugin natives have no mobile equivalent unless reimplemented through the loader bridge.
- **Desktop-only plugins:** anything that patches Discord Desktop's Electron-specific modules (`appleMusic.desktop`,
  `clipUpload.desktop`, `directFileDownload.desktop`, `fixSpotifyEmbeds.desktop`, `fixYoutubeEmbeds.desktop`,
  `noSystemBadge.discordDesktop`, `shikiCodeblocks.desktop`, `youtubeAdblock.desktop`, `autoDndWhilePlaying.discordDesktop`,
  `noRPC.discordDesktop`, `statusWhileActive.desktop`, `screenRecorder.equibop`, `songLink.desktop`, etc.).
- **Web/browser-only plugins:** `noDeepLinks.web`, `arRPC.web`, `webKeybinds.web`, `webPWA.browser`,
  `webScreenShare.browser`, `webScreenShareFixes.web`, `webContextMenus.web`.
- **Rich Presence / game activity:** depends on desktop OS integrations that mobile doesn't expose the same way.
- **Overlay / always-on-top:** mobile apps don't support desktop-style overlays.
- **Global hotkeys / media keys:** not available in a sideloaded app.

## 11. Directory layout in FluxCord

```
FluxCord/
├── mobile/
│   ├── bundle/          # JavaScript runtime (BSD-3 lineage, GPL-3 plugins)
│   ├── ios/             # iOS tweak (OSL-3 lineage)
│   ├── android/loader/  # Xposed loader (GPL-3 lineage)
│   ├── android/installer/# Installer (OSL-3 lineage)
│   ├── docs/            # ARCHITECTURE, BUILD_IOS, BUILD_ANDROID, PLUGIN_COMPATIBILITY, ...
│   └── README.md
├── docs/
│   └── FLUXCORD_MOBILE_ARCHITECTURE.md   # this document
├── .github/workflows/
│   ├── fluxcord-mobile-ios.yml
│   └── fluxcord-mobile-android.yml
├── src/plugins/         # desktop plugins (unchanged)
├── src/fluxplugin/      # desktop plugins (unchanged)
├── src/equicordplugins/ # desktop plugins (unchanged)
└── ...                  # existing desktop/browser builds (unchanged)
```

Desktop and browser builds continue to work unchanged; mobile code lives entirely under `mobile/`.
