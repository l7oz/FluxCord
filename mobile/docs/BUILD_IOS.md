# Building FluxCord Mobile — iOS

FluxCord Mobile for iOS is a RainTweak-based tweak that loads the FluxCord bundle into Discord on iPhone and iPad.
It requires **iOS 16 or newer** and **Discord 332 or newer** (bridgeless React Native).

## Prerequisites (macOS)

- Xcode 15 or newer (command line tools + iOS SDK)
- [Theos](https://theos.dev) (`$THEOS` set)
- [Bun](https://bun.sh) for the bundle
- Node 24
- A code-signing identity (Apple Developer account) for IPA builds

## 1. Build the bundle

```sh
cd mobile/bundle
bun install
bun run build --release-branch main --build-minify
```

This produces `mobile/bundle/dist/fluxcord.min.js` (and, when Hermes is available, the Hermes bytecode
`.hbc`). The bundle is what runs inside Discord on both platforms.

## 2. Build the tweak

```sh
cd mobile/ios
export THEOS=~/theos
export IPHONEOS_DEPLOYMENT_TARGET=16.0
make package
```

This produces:
- `.theos/obj/debug/FluxCordTweak.dylib` — the tweak, for injection into a Discord IPA
- A rootless `.deb` for jailbroken devices (when packaged)

## 3. Build the IPA (needs a decrypted Discord IPA)

The iOS workflow injects `FluxCordTweak.dylib` into a decrypted Discord IPA (Discord 332+). Provide the IPA
through the `DISCORD_IPA_URL` GitHub Actions secret, or supply your own decrypted device build and inject the
dylib with Feather, ESign, KSign or Sideloadly.

```sh
# Conceptual: inject the dylib into your decrypted Discord IPA
node mobile/ios/scripts/insert-dylib.cjs Discord.ipa mobile/ios/.theos/obj/debug/FluxCordTweak.dylib FluxCord.ipa
```

Never commit the Discord IPA or signing keys.

## 4. Install

- **Non-jailbreak:** sideload `FluxCord.ipa` with Sideloadly, AltStore, SideStore, Feather, KSign or ESign.
  With a free Apple ID the app must be re-signed every 7 days.
- **Jailbroken:** install the rootless `.deb`.

Shake the device to open the recovery menu (safe mode, custom bundle URL, delete plugins/themes).

## CI

`.github/workflows/fluxcord-mobile-ios.yml` builds the bundle and tweak on every push and (optionally) on
workflow dispatch. It assembles an IPA only when `DISCORD_IPA_URL` is set, and publishes a release only when
`FLUXCORD_MOBILE_RELEASE=true`.

## Notes

- No jailbreak is required for the core functionality.
- Notifications don't arrive while the app is closed or in the background (Apple sideloading limit).
- Passkeys and sharing to Discord from other apps don't work when sideloaded.
- FluxCord is not affiliated with or endorsed by Discord Inc. or Apple.
