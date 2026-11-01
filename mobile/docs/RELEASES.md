# FluxCord Mobile — Releases

FluxCord Mobile releases are versioned and signed.

## Android

- Every push to `main` rebuilds the bundle, loader and installer (workflow `fluxcord-mobile-android.yml`).
- Run the **Release Installer** workflow by hand with a version number, or push a tag:
  `git tag mobile-installer-v1.0.1 && git push origin mobile-installer-v1.0.1`
- The loader is release-signed with `FLUXCORD_LOADER_*` secrets; the installer with `FLUXCORD_INSTALLER_*`.
- Without the secrets, builds use a throwaway key and can't update over each other.

## iOS

- The iOS workflow builds the bundle and tweak on push and workflow dispatch.
- It assembles an IPA only when `DISCORD_IPA_URL` is set (a decrypted Discord IPA).
- Publish a release only when `FLUXCORD_MOBILE_RELEASE=true`; tag as `ios-v<version>`.
- `apps.json` (AltStore / SideStore source) lists the published IPA.

## Update checks

The app checks the signed release manifest on every start, verifies SHA-256 and the signature, and refuses
older or forged releases. Cached bundles support offline startup.

## Secrets to configure

In the repository's **Settings → Secrets and variables → Actions**:

- `DISCORD_IPA_URL` — decrypted Discord IPA for IPA assembly
- `FLUXCORD_LOADER_KEYSTORE`, `FLUXCORD_LOADER_KEYSTORE_PASSWORD`, `FLUXCORD_LOADER_KEY_ALIAS`,
  `FLUXCORD_LOADER_KEY_PASSWORD`
- `FLUXCORD_INSTALLER_KEYSTORE`, `FLUXCORD_INSTALLER_KEYSTORE_PASSWORD`, `FLUXCORD_INSTALLER_KEY_ALIAS`,
  `FLUXCORD_INSTALLER_KEY_PASSWORD`

Never commit signing keys.
