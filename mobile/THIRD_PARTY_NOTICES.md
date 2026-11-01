# Third-Party Notices

FluxCord Mobile incorporates code from the following upstream projects. Each directory keeps the license of the
project it was forked from.

| Directory | Upstream | License | Upstream commit |
|---|---|---|---|
| `mobile/bundle/` | https://github.com/revenge-mod/revenge-bundle | BSD-3-Clause | pinned at build time |
| `mobile/android/loader/` | https://github.com/revenge-mod/revenge-xposed | GPL-3.0 | pinned at build time |
| `mobile/android/installer/` | https://github.com/revenge-mod/revenge-manager | OSL-3.0 | pinned at build time |
| `mobile/ios/` | https://codeberg.org/raincord/RainTweak | OSL-3.0 | pinned at build time |

Additional dependencies:

- LSPatch (https://github.com/LSPosed/LSPosed) — Android loader embedding
- The Vendetta tracker mirrors — Discord APKs downloaded by the installer
- oneko.js (https://github.com/adryd325/oneko.js) — the oneko cat (MIT)
- Catppuccin (https://github.com/catppuccin/vendetta) and the community theme marketplace — ThemeLibrary sources

FluxCord's own mobile plugins and files marked `SPDX-License-Identifier: GPL-3.0-or-later` are GPL-3.0-or-later,
like FluxCord PC, so the built bundle as a whole is distributed under the GPL-3.0.

The original copyright notices of Team Vendetta, pylixonly and Team Revenge are kept in the source files and shown
in the installer's About screen.

FluxCord is not affiliated with or endorsed by Discord Inc., Apple or the Revenge and Rain teams.
