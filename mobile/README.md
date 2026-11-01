# FluxCord Mobile

**Plugins, themes and privacy for Discord on your Android phone, iPhone and iPad.**

FluxCord is on every platform: this repository is the mobile app for **Android** and **iOS / iPadOS**, and
[FluxCord](https://github.com/l7oz/FluxCord) covers **Windows, macOS, Linux and the web**.

| | Android | iOS and iPadOS |
|---|---|---|
| **Version** | Android 9 or newer | iOS 16 or newer, Discord 332 or newer |
| **Install with** | FluxCord Installer | An IPA, with Sideloadly, AltStore, SideStore, Feather, KSign or ESign |
| **Root or jailbreak** | Not needed | Not needed |
| **Plugins, themes, fonts** | Yes | Yes |
| **Signed updates** | Yes | Yes |
| **Code** | [`mobile/android/`](mobile/android) | [`mobile/ios/`](mobile/ios) |

Both run the same FluxCord, from [`mobile/bundle/`](mobile/bundle), so plugins and themes work the same on each.

## Features

- **Mobile plugins.** Ported FluxCord plugins plus mobile-made ones (lookup and fun commands). All off until you turn
  them on, each with its own settings, searchable and filterable by tag.
- **Themes and fonts.** Browse and install themes without leaving the app.
- **Private by default.** NoTrack is on from the start, so Discord's analytics, telemetry and crash reports are never
  sent.
- **Your language.** English, Türkçe, Русский, Español and Français.
- **Light on older phones.** Only a list of plugins loads when Discord starts. A plugin's code loads the first time
  you turn it on.
- **Always up to date.** FluxCord updates itself every time the app starts. Signed updates — the app checks the
  signature and refuses older versions.
- **Hard to break.** A plugin that fails turns itself off and tells you why, instead of crashing Discord. Safe Mode
  and a recovery menu are always one step away.

## Install on Android

No root needed. FluxCord installs next to Discord as a separate app, and your Discord stays exactly as it is.

1. Download **[FluxCord Installer]** and open it.
2. In **FluxCord Installer**, tap **Install**. It uses the Discord on your phone, or downloads the latest one.
3. Open **FluxCord** and sign in. FluxCord's settings are in Discord's settings, under **FluxCord**.

Requires Android 9 or newer.

## Install on iPhone and iPad

No jailbreak needed. iOS 16 or newer.

1. Download **[FluxCord.ipa]**.
2. Install it with Sideloadly, AltStore, SideStore, Feather, KSign or ESign.
3. Open **FluxCord** and sign in. FluxCord's settings are in Discord's settings, under **FluxCord**.

## What's in this repository

| Directory | What it is |
|---|---|
| [`mobile/bundle/`](mobile/bundle) | The FluxCord that runs inside Discord on both platforms: plugins, themes and settings |
| [`mobile/android/`](mobile/android) | The Android loader and FluxCord Installer |
| [`mobile/ios/`](mobile/ios) | The iOS tweak, and its tests |
| [`mobile/docs/`](mobile/docs) | Development, build and plugin documentation |

## Credits and license

FluxCord Mobile is a fork of [Revenge](https://github.com/revenge-mod), which continues Bunny and Vendetta, and its
iOS tweak of [RainTweak](https://codeberg.org/raincord/RainTweak); see [`mobile/THIRD_PARTY_NOTICES.md`](mobile/THIRD_PARTY_NOTICES.md)
for the exact upstream commits and licenses. It would not exist without them,
[LSPatch](https://github.com/LSPosed/LSPatch) and the Vendetta tracker mirrors that serve the Discord APKs.

(c) 2026 FluxCord contributors. Each directory keeps the license of the project it was forked from:
`mobile/bundle/` BSD-3-Clause, `mobile/android/loader/` GPL-3.0, `mobile/android/installer/` and `mobile/ios/`
OSL-3.0. FluxCord's mobile plugins and the other files marked `SPDX-License-Identifier: GPL-3.0-or-later` are
GPL-3.0-or-later. The original copyright notices of Team Vendetta, pylixonly and Team Revenge are kept in the source
files and shown in the installer's About screen.

<sub>FluxCord is not affiliated with or endorsed by Discord Inc., Apple or the Revenge and Rain teams.</sub>
