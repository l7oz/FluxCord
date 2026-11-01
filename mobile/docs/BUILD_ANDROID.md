# Building FluxCord Mobile — Android

FluxCord Mobile for Android consists of an Xposed loader and a separate installer app. It requires
**Android 9 or newer** and **no root**.

## Prerequisites

- JDK 25 (loader) / JDK 17+ (installer)
- Android SDK (build-tools 34, platform 34)
- [Bun](https://bun.sh) for the bundle

## 1. Build the bundle

```sh
cd mobile/bundle
bun install
bun run build --release-branch main --build-minify
```

## 2. Build the loader APK (Xposed module)

The loader injects the bundle into Discord's Hermes runtime:

```sh
cd mobile/android/loader
chmod +x gradlew
./gradlew :app:assembleDebug \
  -Pfluxcord.bundleUrl=http://10.0.2.2:4040/fluxcord.min.js
```

Output: `mobile/android/loader/app/build/outputs/apk/debug/app-debug.apk`

- **No root:** embedded by the installer with LSPatch.
- **Root / LSPosed:** install `fluxcord-xposed.apk` and enable the module for Discord in LSPosed.

## 3. Build the installer APK

The installer patches the installed (or latest) Discord, embeds the loader, re-signs and installs as a
separate app (`com.fluxcord.mobile`) so Play Store Discord is untouched:

```sh
cd mobile/android/installer
chmod +x gradlew
./gradlew :app:assembleDebug
```

Output: `mobile/android/installer/app/build/outputs/apk/debug/endcord-installer-*.apk`

## 4. Install

1. Install the FluxCord Installer APK.
2. Open it and tap Install — it uses the Discord on your phone or downloads the latest one.
3. Open FluxCord and sign in. Settings are in Discord's settings, under FluxCord.

## Signing

Release signing uses keystore secrets (`FLUXCORD_LOADER_*`, `FLUXCORD_INSTALLER_*`). Generate each once:

```sh
keytool -genkeypair -keystore loader.jks -alias loader -keyalg RSA -keysize 4096 -validity 36500
base64 -w0 loader.jks   # FLUXCORD_LOADER_KEYSTORE
```

Without the secrets, builds use a throwaway debug key and can't update over each other.

## CI

`.github/workflows/fluxcord-mobile-android.yml` builds the bundle, loader and installer on every push and
optionally on workflow dispatch.
