# FluxCord Mobile — Plugin Compatibility

This audit classifies every plugin in `src/plugins/`, `src/fluxplugin/` and `src/equicordplugins/` for mobile use,
following the inspection method in `mobile/docs/PLUGIN_DEVELOPMENT.md`. Each plugin is rated:

- **MOBILE_COMPATIBLE** — works on mobile with little or no change
- **NEEDS_PORTING** — logic carries over but must be rewritten to the mobile API
- **PARTIALLY_COMPATIBLE** — some features work, others don't
- **DESKTOP_ONLY** — needs Electron/native.ts/desktop Discord modules
- **UNSUPPORTED** — fundamentally incompatible (selfbot, automation, specific third-party targets)

A broken plugin can never crash the mobile client: one that throws while starting is turned off with a toast.

## Inspection method

For each plugin we inspected actual imports, APIs, dependencies, DOM usage, Electron APIs, Node.js APIs,
Discord module dependencies and platform-specific assumptions:

- Imports from `@api/*`, `@webpack/common`, `@utils/*`, `@components/*` → desktop Vencord APIs, not on mobile
- `native.ts`, `electron`, `fs`, `path`, `child_process` → desktop only
- Patches keyed on desktop webpack modules → need React Native module rewrites
- `contextMenus`/`chatBarButton` with `Menu.MenuItem` → desktop menu shapes, not mobile sheets
- Commands that only send text → readily portable via `command()` hook
- `onSend`-style message transforms → portable via `onSend()` hook

## Summary

| Status | Count | Meaning |
|---|---|---|
| MOBILE_COMPATIBLE | ~42 | Already ported or portable with minimal changes |
| NEEDS_PORTING | ~120 | Logic carries over, needs mobile API rewrite |
| PARTIALLY_COMPATIBLE | ~30 | Core works, desktop-only bits dropped |
| DESKTOP_ONLY | ~150 | Electron / native / desktop-module dependent |
| UNSUPPORTED | ~10 | Selfbot / automation / third-party-targeting |

These are approximate; the per-plugin registry in `mobile/bundle/plugins/manifest.ts` is the source of truth.

## MOBILE_COMPATIBLE

Ported to `mobile/bundle/plugins/` (or trivial to port — command/message-transform plugins):

| Plugin | Original location | Notes |
|---|---|---|
| Calculator | `src/plugins/calculator` | Ported (`fluxcord.calculator`) |
| ReverseText | `src/plugins/reverseText` | Ported (`fluxcord.reverse-text`) |
| ClearURLs | `src/plugins/clearURLs` | Ported (`fluxcord.clear-urls`) |
| NoTrack | `src/fluxplugin/noTelemetry` | Ported (`fluxcord.no-track`) |
| SilentTyping | `src/plugins/silentTyping` | Ported core (`fluxcord.silent-typing`) |
| (mobile-made lookup & fun commands) | — | 42 phone-made plugins from Endcord Mobile's list |

## NEEDS_PORTING

Logic carries over but must be rewritten against the mobile API (`onSend`, `command`, `addMessageAction`,
`onMessageRow`, `moduleAt`). The desktop `definePlugin`/`definePluginSettings`/`patches`/`contextMenus` shapes
don't exist on mobile:

| Plugin | Original location | Required changes |
|---|---|---|
| BoldText | `src/plugins/boldText` | text transform → `onSend` |
| ClapText | `src/plugins/clapText` | text transform → `onSend` |
| LeetText | `src/plugins/leetText` | text transform → `onSend` |
| SpaceOut | `src/plugins/spaceOut` | text transform → `onSend` |
| Starify | `src/plugins/starify` | text transform → `onSend` |
| VibeCheck | `src/plugins/vibeCheck` | text transform → `onSend` |
| AutoVaporwave | `src/plugins/autoVaporwave` | text transform → `onSend` |
| TalkInReverse | `src/plugins/talkInReverse` | text transform → `onSend` |
| WriteUpperCase | `src/plugins/writeUpperCase` | text transform → `onSend` |
| MessageBurst | `src/plugins/messageBurst` | `onSend` + timing |
| Signature | `src/plugins/signature` | `onSend` |
| NoReplyMention | `src/plugins/noReplyMention` | `onSend` |
| NormalizeMessageLinks | `src/plugins/normalizeMessageLinks` | `onSend` |
| PolishWording | `src/plugins/polishWording` | `onSend` |
| SelfDestruct | `src/plugins/selfDestruct` | `onSend` + timer |
| SilentMessageToggle | `src/plugins/silentMessageToggle` | `onSend` + chat bar button |
| EmbeddedURLs | `src/plugins/embeddedURLs` | `onSend` |
| AtSomeone | `src/plugins/atSomeone` | `onSend` |
| AnonymiseFileNames | `src/plugins/anonymiseFileNames` | `onSend` |
| BetterPlusReacts | `src/plugins/betterPlusReacts` | `onSend` |
| Unindent | `src/plugins/unindent` | `onSend` |
| ZeroWidthSanitizer | `src/plugins/zeroWidthSanitizer` | `onSend` |
| BlockKeywords | `src/equicordplugins/blockKeywords` | `onIncomingMessage` |
| ClientSideBlock | `src/equicordplugins/clientSideBlock` | `onIncomingMessage` |
| HideMessages | `src/equicordplugins/hideMessages` | `onIncomingMessage` |
| NoBlockedMessages | `src/plugins/noBlockedMessages` | `onIncomingMessage` |
| SilenceUsers | `src/equicordplugins/silenceUsers` | `onIncomingMessage` |
| StickerBlocker | `src/equicordplugins/stickerBlocker` | `onIncomingMessage` |
| NoPendingCount | `src/plugins/noPendingCount` | incoming filter |
| NoProfileThemes | `src/plugins/noProfileThemes` | `onMessageRow` |
| AntiDeleteMessage | `src/plugins/antiDeleteMessage` | flux + message store |
| AntiNickname | `src/fluxplugin/antiNickname` | flux + nickname store |
| AutoReact | `src/plugins/autoReact` | flux + reaction actions |
| KeywordNotify | `src/equicordplugins/keywordNotify` | flux + notifications |
| ReadAllNotificationsButton | `src/plugins/readAllNotificationsButton` | command |
| CustomTimestamps | `src/equicordplugins/customTimestamps` | `onMessageRow` |
| CustomUserColors | `src/equicordplugins/customUserColors` | `onMessageRow` |
| FakeTag | `src/plugins/fakeTag` | `onMessageRow` |
| MessageLatency | `src/plugins/messageLatency` | `onMessageRow` |
| PinIcon | `src/plugins/pinIcon` | `onMessageRow` |
| RealtimeTimestamps | `src/plugins/realtimeTimestamps` | `onMessageRow` |
| ShowRolesInChat | `src/equicordplugins/showRolesInChat` | `onMessageRow` |
| ShowTimeoutDuration | `src/plugins/showTimeoutDuration` | `onMessageRow` |
| SilentEdit | `src/plugins/silentEdit` | `onMessageRow` |
| Timezones | `src/equicordplugins/timezones` | `onMessageRow` |
| ToneIndicators | `src/plugins/toneIndicators` | `onMessageRow` |
| UserMessagesPronouns | `src/plugins/userMessagesPronouns` | `onMessageRow` |
| WordCount | `src/plugins/wordCount` | `onMessageRow` |
| CustomIdle | `src/plugins/customIdle` | presence store |
| CustomRPC | `src/plugins/customRPC` | presence store (partial) |
| Experiments | `src/plugins/experiments` | experiment store |
| FocusMode | `src/plugins/focusMode` | status store |
| StatusPresets | `src/equicordplugins/statusPresets` | status store |
| StatusWhileActive | `src/equicordplugins/statusWhileActive` | voice state (partial) |
| AlwaysTrust | `src/plugins/alwaysTrust` | flux |
| AlwaysAnimate | `src/plugins/alwaysAnimate` | animation store |
| Declutter | `src/equicordplugins/declutter` | profile/store |
| PlatformIndicators | `src/plugins/platformIndicators` | `onMessageRow` |
| DisableCallIdle | `src/plugins/disableCallIdle` | voice store |
| FollowUser | `src/equicordplugins/followUser` | voice + message action |
| RandomVoice | `src/equicordplugins/randomVoice` | command + voice |
| VoiceRejoin | `src/plugins/voiceRejoin` | voice state |
| AntiMoveDeco | `src/plugins/antiMoveDeco` | voice flux |
| CallTimer | `src/plugins/callTimer` | voice state |
| PullUserIntoVoice | `src/plugins/pullUserIntoVoice` | message action + voice |
| VoiceChatUtilities | `src/plugins/voiceChatUtilities` | command + voice |
| VoiceFakeDetector | `src/plugins/VoiceFakeDetector` | voice state |
| VoiceServerInfo | `src/plugins/voiceServerInfo` | voice store |
| WaitForSlot | `src/equicordplugins/waitForSlot` | voice state |
| WebcamStartNotifier | `src/plugins/webcamStartNotifier` | voice state |
| AntiSnitch | `src/plugins/antiSnitch` | flux |
| ChannelNotes | `src/equicordplugins/channelNotes` | DataStore + settings |
| Ghosted | `src/equicordplugins/ghosted` | DataStore |
| ImageLink | `src/plugins/imageLink` | `onMessageRow` |
| JumpTo | `src/equicordplugins/jumpTo` | command |
| LastActive | `src/plugins/lastActive` | command + message store |
| MarkdownTables | `src/equicordplugins/markdownTables` | `onMessageRow` |
| ShowBadgesInChat | `src/equicordplugins/showBadgesInChat` | `onMessageRow` |
| UserVoiceShow | `src/plugins/userVoiceShow` | `onMessageRow` |
| ClanSwitcher | `src/plugins/ClanSwitcher` | settings |
| DiscordDevBanner | `src/plugins/discordDevBanner` | build info |
| EventLogs | `src/plugins/eventLogs` | flux + DataStore |
| FocusMode | `src/plugins/focusMode` | status |
| ProfileSets | `src/equicordplugins/profileSets` | DataStore |
| StartupTimings | `src/plugins/startupTimings` | timings |
| CopyEmojiMarkdown | `src/plugins/copyEmojiMarkdown` | `addMessageAction` |
| CopyFileContents | `src/plugins/copyFileContents` | `addMessageAction` |
| CopyMediaLink | `src/plugins/copyMediaLink` | `addMessageAction` |
| CopyStickerLinks | `src/plugins/copyStickerLinks` | `addMessageAction` |
| CopyUserMention | `src/plugins/copyUserMention` | `addMessageAction` |
| CopyUserURLs | `src/plugins/copyUserURLs` | `addMessageAction` |
| DecodeBase64 | `src/plugins/decodeBase64` | `addMessageAction` |
| DownloadAllAttachments | `src/plugins/downloadAllAttachments` | `addMessageAction` |
| ExportMessages | `src/plugins/exportMessages` | `addMessageAction` |
| FindReply | `src/plugins/findReply` | `addMessageAction` |
| HideMedia | `src/plugins/hideMedia` | `addMessageAction` |
| Husk | `src/plugins/husk` | `addMessageAction` |
| QuickDelete | `src/plugins/quickDelete` | `addMessageAction` |
| QuickMention | `src/plugins/quickMention` | `addMessageAction` |
| RepeatMessages | `src/plugins/repeatMessages` | `addMessageAction` |
| ReverseImageSearch | `src/plugins/reverseImageSearch` | `addMessageAction` |
| SilentDelete | `src/plugins/silentDelete` | `addMessageAction` |
| SongLink | `src/plugins/songLink.desktop` | `addMessageAction` |
| UnitConverter | `src/plugins/unitConverter` | `addMessageAction` |
| UnsuppressEmbeds | `src/plugins/unsuppressEmbeds` | `addMessageAction` |
| ViewRaw | `src/plugins/viewRaw` | `addMessageAction` |
| VoiceDownload | `src/plugins/voiceDownload` | `addMessageAction` |
| Bookmarks | `src/plugins/Bookmarks` | DataStore + command |
| MessageReminders | `src/plugins/MessageReminders` | DataStore + command |
| MessageTags | `src/plugins/MessageTags` | DataStore + command |
| RemindMe | `src/plugins/remindMe` | DataStore + command |
| ScheduledMessages | `src/equicordplugins/scheduledMessages` | DataStore + command |
| AvatarGrabber | `src/plugins/avatarGrabber` | command |
| FriendInvites | `src/plugins/friendInvites` | command |
| HypeSquadSwitcher | `src/plugins/hypeSquadSwitcher` | command |
| InRole | `src/plugins/inRole` | command |
| PauseInvitesForever | `src/plugins/pauseInvitesForever` | command |
| ServerInfo | `src/plugins/serverInfo` | command |
| SpotifyShareCommands | `src/plugins/spotifyShareCommands` | command |
| Translate | `src/plugins/translate` | command |
| WikiLookup | `src/plugins/wikiLookup` | command |
| ClearMyMessages | `src/plugins/clearMyMessages` | command |
| ContentWarning | `src/plugins/contentWarning` | `onSend` + settings |
| CustomCommands | `src/plugins/customCommands` | command + DataStore |
| ExportDM | `src/plugins/exportDM` | command |
| FakeMessage | `src/plugins/fakeMessage` | command + local messages |
| FriendCodes | `src/equicordplugins/friendCodes` | command + DataStore |
| HopOn | `src/equicordplugins/hopOn` | `onIncomingMessage` + regex |
| MemberCount | `src/plugins/memberCount` | command |
| MessageFetchTimer | `src/plugins/messageFetchTimer` | command |
| PreviewMessage | `src/plugins/previewMessage` | command |
| SendTimestamps | `src/plugins/sendTimestamps` | command |
| ServerBackup | `src/plugins/serverBackup` | command |
| BetterSessions | `src/plugins/betterSessions` | session store |
| CopyStatusUrls | `src/plugins/copyStatusUrls` | `addMessageAction` |
| ExpressionCloner | `src/plugins/expressionCloner` | `addMessageAction` |
| IRememberYou | `src/equicordplugins/iRememberYou` | DataStore |
| LastOnline | `src/plugins/lastOnline` | DataStore |
| MessageTranslate | `src/plugins/messageTranslate` | `onIncomingMessage` |
| PermissionsViewer | `src/plugins/permissionsViewer` | `addMessageAction` |
| PingNotifications | `src/equicordplugins/pingNotifications` | flux + notifications |
| ReviewDB | `src/plugins/reviewDB` | `addMessageAction` |
| ChatGPT | `src/plugins/chatGPT` | command + external API (needs allowlist) |
| MentionColors | `src/plugins/mentionColors` | `onMessageRow` |
| ReplyTimestamp | `src/plugins/replyTimestamp` | `onMessageRow` |
| SortReactions | `src/plugins/sortReactions` | `onMessageRow` |
| SplitLargeMessages | `src/plugins/splitLargeMessages` | `onSend` |
| VibrateOnPing | `src/plugins/vibrateOnPing` | notifications + haptics |
| CustomReactionButtons | `src/plugins/customReactionButtons` | `addMessageAction` |
| DontRoundMyTimestamps | `src/plugins/dontRoundMyTimestamps` | `onMessageRow` |
| EncryptedMessage | `src/plugins/encryptedMessage` | command + crypto |
| FakeDM | `src/plugins/fakeDM` | command + local messages |
| GifPaste | `src/plugins/gifPaste` | `onSend` |
| InvisibleChat | `src/plugins/invisibleChat.desktop` | command + crypto |
| MessageLinkEmbeds | `src/plugins/messageLinkEmbeds` | `onMessageRow` |
| MessageLoggerEnhanced | `src/plugins/messageLoggerEnhanced` | flux + DataStore |
| MessageVault | `src/plugins/messageVault` | DataStore + command |
| Quoter | `src/plugins/quoter` | `addMessageAction` |
| RevealAllSpoilers | `src/plugins/revealAllSpoilers` | `addMessageAction` |
| SedEnhanced | `src/plugins/sedEnhanced` | command + regex |
| TenorGifFix | `src/plugins/tenorGifFix` | `onSend` |
| TranslatePlus | `src/plugins/translatePlus` | command |
| WhitelistedEmojis | `src/plugins/whitelistedEmojis` | `onSend` |
| Dearrow | `src/plugins/dearrow` | `onMessageRow` |
| FavoriteAnything | `src/equicordplugins/favouriteAnything` | DataStore |
| FileViewer | `src/plugins/pdf-viewer` | `addMessageAction` (partial) |
| FixFileExtensions | `src/plugins/fixFileExtensions` | `addMessageAction` |
| GifCollections | `src/plugins/gifCollections` | DataStore |
| PdfViewer | `src/plugins/pdf-viewer` | `addMessageAction` (partial) |
| SaveFavoriteGIFs | `src/equicordplugins/saveFavoriteGIFs` | DataStore |
| ZipPreview | `src/plugins/ZIPplus` | `addMessageAction` (partial) |
| BetterActivities | `src/equicordplugins/betterActivities` | `addMessageAction` |
| BetterBlockedUsers | `src/equicordplugins/betterBlockedUsers` | DataStore |
| CancelFriendRequest | `src/plugins/cancelFriendRequest` | command |
| CancelFriendRequestNC | `src/equicordplugins/cancelFriendRequestNC` | command |
| FriendNicknames | `src/equicordplugins/friendNicknames` | DataStore |
| FriendTags | `src/equicordplugins/friendTags` | DataStore |
| GitHubRepos | `src/plugins/gitHubRepos` | `addMessageAction` |
| MutualGroupDMs | `src/equicordplugins/mutualGroupDMs` | `addMessageAction` |
| ProfileMedia | `src/plugins/ProfileMedia` | `addMessageAction` |
| PronounDB | `src/plugins/pronounDB` | `onMessageRow` |
| ShowConnections | `src/plugins/showConnections` | `addMessageAction` |
| ShowSongName | `src/plugins/showSongName` | `onMessageRow` |
| SortFriendRequests | `src/equicordplugins/sortFriendRequests` | DataStore |
| Streaks | `src/equicordplugins/streaks` | DataStore |
| WhoReacted | `src/plugins/whoReacted` | `addMessageAction` |
| AutoDisconnectAndAutoMute | `src/plugins/AutoDisconnect` | voice + flux |
| BetterBanReasons | `src/equicordplugins/betterBanReasons` | command |
| BetterRoleContext | `src/plugins/betterRoleContext` | command |
| BlurNSFW | `src/plugins/blurNsfw` | `onMessageRow` |
| GreetStickerPicker | `src/plugins/greetStickerPicker` | command |
| GuildPickerDumper | `src/plugins/guildPickerDumper` | command |
| InviteDefaults | `src/equicordplugins/inviteDefaults` | command |
| MoreUserTags | `src/equicordplugins/moreUserTags` | `onMessageRow` |
| MutualServerMembers | `src/equicordplugins/mutualServerMembers` | command |
| ServerSearch | `src/plugins/serverSearch` | command |
| SurfaceTranslate | `src/plugins/surfaceTranslate` | command |
| UrlHighlighter | `src/plugins/urlHighlighter` | `onMessageRow` |
| AutoDNDWhilePlaying | `src/plugins/autoDndWhilePlaying.discordDesktop` | presence (partial) |
| CustomSounds | `src/equicordplugins/customSounds` | sound store |
| ExitSounds | `src/equicordplugins/exitSounds` | voice |
| GameActivityToggle | `src/plugins/gameActivityToggle` | presence |
| IdleAutoRestart | `src/equicordplugins/idleAutoRestart` | app state |
| NotificationVolume | `src/plugins/notificationVolume` | sound |
| SpotifyActivityToggle | `src/plugins/spotifyActivityToggle` | presence |
| StatusWhileActive | `src/equicordplugins/statusWhileActive.desktop` | voice (partial) |
| UniversalVolume | `src/plugins/UniversalVolume` | voice |
| BetterInvites | `src/plugins/betterInvites` | command |
| ConsoleJanitor | `src/plugins/consoleJanitor` | console |
| EndcordToolbox | `src/plugins/endcordToolbox` | toolbox (mobile equivalent) |
| FakeConnections | `src/plugins/fakeConnections` | settings |
| HideServers | `src/plugins/hideServers` | server list |
| IconViewer | `src/plugins/iconViewer` | command |
| ImplicitRelationships | `src/plugins/implicitRelationships` | command |
| OpenInApp | `src/plugins/openInApp` | link handling |
| PinDMs | `src/plugins/pinDms` | command |
| QuickThemeSwitcher | `src/plugins/quickThemeSwitcher.discordDesktop` | themes (partial) |
| RecentChannelSwitcher | `src/plugins/recentChannelSwitcher` | command |
| RecentDMSwitcher | `src/equicordplugins/recentDMSwitcher` | command |
| ServerListIndicators | `src/plugins/serverListIndicators` | command |
| ServerPinner | `src/plugins/serverPinner` | server list |
| StreamProof | `src/plugins/streamProof` | overlay (partial) |
| UnreadCountBadge | `src/equicordplugins/unreadBadgeCount` | server list |
| VoiceCount | `src/plugins/VoiceCount` | voice store |
| WhosWatching | `src/plugins/whosWatching` | stream |
| Advice | `src/plugins/advice` | command + external API |
| AnimeLookup | `src/plugins/animeLookup` | command + external API |
| BoredActivity | `src/plugins/boredActivity` | command + external API |
| CatFacts | `src/plugins/catFacts` | command + external API |
| CharInfo | `src/plugins/charInfo` | command |
| ColorInfo | `src/plugins/colorInfo` | command |
| Countdown | `src/plugins/countdown` | command |
| CountryInfo | `src/plugins/countryInfo` | command + external API |
| CryptoPrices | `src/plugins/cryptoPrices` | command + external API |
| CurrencyConverter | `src/plugins/currencyConverter` | command + external API |
| Dictionary | `src/plugins/dictionary` | command + external API |
| DiscordStatus | `src/plugins/discordStatus` | command + external API |
| Earthquakes | `src/plugins/earthquakes` | command + external API |
| Emojify | `src/plugins/emojify` | command |
| GitHubLookup | `src/plugins/gitHubLookup` | command + external API |
| Hash | `src/plugins/hash` | command |
| Holidays | `src/plugins/holidays` | command + external API |
| Jokes | `src/plugins/jokes` | command + external API |
| LoremIpsum | `src/plugins/loremIpsum` | command |
| MinecraftSkin | `src/plugins/minecraftSkin` | command + external API |
| MinecraftStatus | `src/plugins/minecraftStatus` | command + external API |
| NpmLookup | `src/plugins/npmLookup` | command + external API |
| PasswordGenerator | `src/plugins/passwordGenerator` | command |
| Pokedex | `src/plugins/pokedex` | command + external API |
| QRCode | `src/plugins/qrCode` | command |
| Quotes | `src/plugins/quotes` | command |
| RandomFacts | `src/plugins/randomFacts` | command + external API |
| RecipeFinder | `src/plugins/recipeFinder` | command + external API |
| RockPaperScissors | `src/plugins/rockPaperScissors` | command |
| ShortenURL | `src/plugins/shortenURL` | command + external API |
| SnowflakeInfo | `src/plugins/snowflakeInfo` | command |
| SpaceLaunches | `src/plugins/spaceLaunches` | command + external API |
| SteamLookup | `src/plugins/steamLookup` | command + external API |
| Trivia | `src/plugins/trivia` | command + external API |
| UrbanDictionary | `src/plugins/urbanDictionary` | command + external API |
| UUIDGenerator | `src/plugins/uuidGenerator` | command |
| Weather | `src/plugins/weather` | command + external API |
| Xkcd | `src/plugins/xkcd` | command + external API |
| ClickSparkles | `src/plugins/clickSparkles` | overlay |
| Jumpscare | `src/plugins/jumpscare` | overlay |
| Moyai | `src/plugins/moyai` | sound |
| Snowfall | `src/plugins/snowfall` | overlay |
| Wellbeing | `src/plugins/Wellbeing` | DataStore |

## PARTIALLY_COMPATIBLE

Core works on mobile; desktop-only bits (chat-bar buttons, desktop menu entries, desktop CSS themes) dropped:

| Plugin | What works | What's dropped |
|---|---|---|
| CustomProfile | avatar/name/bio settings | badges, fake Nitro |
| FakeNitro | emoji/sticker links | stream quality |
| SmoothType | caret colors | caret animation |
| ViewIcons | full-size avatars | context menu entries |
| ThemeLibrary | mobile theme sources | desktop CSS themes |
| oneko | touch-following cat | mouse-following |
| PlatformIndicators | message time icons | member list, profiles |
| CustomIdle | background idle | desktop specifics |
| QuickThemeSwitcher | `/theme` command | desktop UI button |

## DESKTOP_ONLY

Need Electron / `native.ts` / desktop Discord modules. Not ported:

| Plugin | Reason |
|---|---|
| appleMusic.desktop, clipUpload.desktop, directFileDownload.desktop, fixSpotifyEmbeds.desktop, fixYoutubeEmbeds.desktop, shikiCodeblocks.desktop, youtubeAdblock.desktop | `.desktop` suffix — Electron-only patches |
| autoDndWhilePlaying.discordDesktop, noSystemBadge.discordDesktop, noRPC.discordDesktop, statusWhileActive.desktop, screenRecorder.equibop, songLink.desktop, songSpotlight.desktop, voiceMessageTranscriber.desktop, invisibleChat.desktop | Desktop modules / native |
| noDeepLinks.web, arRPC.web, webKeybinds.web, webPWA.browser, webScreenShare.browser, webScreenShareFixes.web, webContextMenus.web | `.web` / `.browser` — web client only |
| devCompanion.dev, elementHighlighter.dev, userpluginInstaller.dev | dev tools |
| crashHandler, f8break, noF1, etc. | Desktop shortcuts / crash reporting |
| (and the remaining desktop-patch plugins) | Rely on Discord Desktop's Electron modules |

## UNSUPPORTED

Fundamentally incompatible — not ported, per the plugin policy:

| Plugin | Reason |
|---|---|
| fakeAccount, passwordProtect, securecord, etc. | Client state spoofing / token handling |
| Plugins automating user actions (scheduled messages are opt-in only) | Automation / selfbot concern |
| Plugins targeting specific third-party bots | Third-party bot targeting |

Plugins requiring user-supplied API keys (e.g. ChatGPT without a configured allowlist) are gated behind the
network allowlist in `src/main/csp` and are off by default.

## Plugins not functional / omitted

No fake or placeholder plugins are included. Every plugin in `mobile/bundle/plugins/` is implemented and loads
through `definePlugin`. Plugins classified DESKTOP_ONLY or UNSUPPORTED are not in the mobile manifest.

## How to port a plugin

1. Copy the plugin's logic into `mobile/bundle/plugins/<name>/index.ts`.
2. Replace `definePlugin` from `@utils/types` with `definePlugin` from `@plugins/api`.
3. Replace `definePluginSettings` with the `settings` schema.
4. Replace `patches`/`contextMenus`/`chatBarButton` with `onSend`/`onMessageRow`/`addMessageAction`/`command`.
5. Replace `@webpack/common` lookups with `moduleAt("modules/...tsx")`.
6. Register it in the manifest via `scripts/plugin-manifest.mjs`.

## Source of truth

The implemented mobile plugin set is `mobile/bundle/src/plugins/manifest.ts`. This document is a snapshot; the
manifest is regenerated on every build.
