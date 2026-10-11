## Plugin Rules

To keep FluxCord stable, secure and maintainable, all plugins must follow these rules:

1. No simple slash-command plugins (e.g. `/cat`). If applicable, create a [user-installable Discord app](https://discord.com/developers/docs/change-log#userinstallable-apps-preview) instead.
2. No simple text replacement plugins (the built-in TextReplace plugin already covers this).
3. No raw DOM manipulation — always use proper patches and React.
4. No FakeDeafen or FakeMute functionality.
5. No StereoMic-related plugins.
6. No plugins that only hide or redesign UI elements (use CSS for that). This rule may be negotiable.
7. No plugins that interact with specific third-party Discord bots (official Discord apps are allowed).
8. No selfbots or API abuse (auto-replies, animated statuses, message pruning, Nitro snipers, etc.).
9. No untrusted third-party APIs (well-known services like Google or GitHub are acceptable).
10. No plugins that require users to provide their own API keys.
11. Do not introduce new dependencies unless they are strictly necessary and well justified.

**Plugins that violate any of these rules will not be accepted.**

## Improving FluxCord Itself

If you want to improve FluxCord beyond plugins, such as internal features or performance improvements, you are welcome to open a feature request so it can be discussed.

Bug fixes, refactors, and documentation improvements are also highly appreciated!

## Helping the Community

Answering questions in [GitHub issues](https://github.com/l7oz/FluxCord/issues) is always appreciated! The more, the merrier.
