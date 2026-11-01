# FluxCord Mobile — Security

## Update security

- Every published bundle is signed; the tweak and loader accept a bundle only when its size and SHA-256 match
  a release with a valid signature.
- Releases older than one already accepted are refused (downgrade protection).
- The saved bundle is re-checked against its signed release on each start.
- A custom bundle URL is the user's own choice and isn't signature-checked.

## Data privacy

- No authentication tokens, session cookies, passwords or private user data are ever logged.
- No telemetry is collected.
- No functionality automates abusive account actions.
- Plugin data stays on the device (MMKV-backed, keyed per plugin).

## Plugin safety

- A plugin that throws while starting is turned off with a notice; Discord never crashes.
- Every callback is isolated so one failing plugin can't stop the others.
- Safe mode and a recovery menu are always available.

## Signing keys

Never commit private signing keys or Apple credentials. Configure them as GitHub Actions secrets (see
`mobile/docs/RELEASES.md`). A lost key means every user must reinstall.
