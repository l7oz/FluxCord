# FluxCord

[![Tests](https://github.com/l7oz/FluxCord/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/l7oz/FluxCord/actions/workflows/test.yml)
[![License](https://img.shields.io/badge/license-GPL--3.0--or--later-blue?style=flat)](./LICENSE)

FluxCord is a fork of [Vencord](https://github.com/Vendicated/Vencord), with 300+ plugins.

### Included Plugins

Plugins live in [`src/plugins`](./src/plugins) (Vencord plugins), [`src/equicordplugins`](./src/equicordplugins)
(fork plugins), and [`src/userplugins`](./src/userplugins) (community plugins).

## Installing / Uninstalling

Grab the latest release from the [Releases page](https://github.com/l7oz/FluxCord/releases/latest) and run the
installer for your platform. Running it again with `--uninstall` removes FluxCord; `--repair` re-applies it after a
Discord update.

## Installing FluxCord Devbuild

### Dependencies

[Git](https://git-scm.com/download) and [Node.JS LTS](https://nodejs.dev/en/) are required.

Install `pnpm`:

> :exclamation: This next command may need to be run as admin/root depending on your system, and you may need to close and reopen your terminal for pnpm to be in your PATH.

```shell
npm i -g pnpm
```

> :exclamation: **IMPORTANT** Make sure you aren't using an admin/root terminal from here onwards. It **will** mess up your Discord/FluxCord instance and you **will** most likely have to reinstall.

Clone FluxCord:

```shell
git clone https://github.com/l7oz/FluxCord
cd FluxCord
```

Install dependencies:

```shell
pnpm install --frozen-lockfile
```

Build FluxCord:

```shell
pnpm build
```

Inject FluxCord into your desktop client:

```shell
pnpm inject
```

Build FluxCord for web:

```shell
pnpm buildWeb
```

After building FluxCord's web extension, locate the appropriate ZIP file in the `dist` directory and follow your browser’s guide for installing custom extensions, if supported.

Note: Firefox extension zip requires Firefox for developers

## Credits

Thank you to [Vendicated](https://github.com/Vendicated) for creating [Vencord](https://github.com/Vendicated/Vencord) and to the [Equicord](https://github.com/Equicord/Equicord) team for the fork this builds on.

## Disclaimer

Discord is trademark of Discord Inc., and solely mentioned for the sake of descriptivity.
Mentioning it does not imply any affiliation with or endorsement by Discord Inc.
Vencord is not connected to FluxCord and as such, all donation links go to Vendicated's donation link.

<details>
<summary>Using FluxCord violates Discord's terms of service</summary>

Client modifications are against Discord’s Terms of Service.

However, Discord is pretty indifferent about them and there are no known cases of users getting banned for using client mods! So you should generally be fine if you don’t use plugins that implement abusive behaviour. But no worries, all inbuilt plugins are safe to use!

Regardless, if your account is essential to you and getting disabled would be a disaster for you, you should probably not use any client mods (not exclusive to FluxCord), just to be safe.

Additionally, make sure not to post screenshots with FluxCord in a server where you might get banned for it.

</details>
