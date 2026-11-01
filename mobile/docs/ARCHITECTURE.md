# FluxCord Mobile — Architecture

FluxCord Mobile is a separate, self-contained mobile implementation inside the FluxCord repository. It runs the
same FluxCord on Android and iOS, from a single JavaScript bundle.

```
FluxCord/
└── mobile/
    ├── bundle/        # JavaScript runtime (BSD-3 lineage, GPL-3 plugins)
    ├── ios/           # iOS tweak (OSL-3 lineage)
    ├── android/loader/# Xposed loader (GPL-3 lineage)
    ├── android/installer/# Installer (OSL-3 lineage)
    ├── docs/
    └── README.md
```

Desktop and browser builds are untouched; nothing under `mobile/` is imported by the desktop build.

## The bundle

A React Native application (TypeScript, esbuild + SWC, Hermes bytecode) that loads into Discord. It contains:

- **Plugin system** — `definePlugin` with `start`/`stop`, lazy loading, per-plugin settings storage.
- **Shared hooks** — `onSend`, `onIncomingMessage`, `onMessageRow`, `addMessageAction`, `command`.
- **Module discovery** — `moduleAt("modules/...tsx")` finds Discord modules by source path.
- **Patching** — `instead`, `after`, `intercept` wrappers around Discord's React Native modules.
- **Settings API** — schema-driven settings page plus `SettingsComponent` for custom UI.
- **Themes, fonts, translations** — `t()`/`tx()` with compiled locales.

## iOS tweak

A RainTweak-based tweak hooks `RCTHost.instance:didInitializeRuntime:` (Discord 332+, bridgeless RN),
evaluates the bundle via JSI, verifies its signed release manifest, and exposes `__FLUX_LOADER__` /
`__FLUXCORD_LOADER_CALL__`. Shake → recovery menu.

## Android

An Xposed loader injects the bundle into Discord's Hermes runtime; the installer patches Discord's APK with
LSPatch, embeds the loader, re-signs and installs as a separate app.

## Plugin loading

Each plugin lives in `mobile/bundle/plugins/<name>/index.ts`. The build generates `manifest.ts` from the
folders. A plugin's code loads only when it is turned on or its settings open. A plugin that throws while
starting is turned off with a toast — Discord never crashes.

## What can't come from desktop

Electron/native IPC, desktop-only patches, web/browser-only APIs, rich presence, overlays, global hotkeys.
