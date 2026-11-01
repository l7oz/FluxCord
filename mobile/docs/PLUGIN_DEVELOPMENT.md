# Writing FluxCord Mobile Plugins

Every plugin lives in its own folder: `mobile/bundle/plugins/<pluginName>/index.ts`. Code shared by several
plugins goes in `mobile/bundle/plugins/shared/`.

## Defining a plugin

```ts
import { definePlugin } from "@plugins/api";
import { onSend, command, addMessageAction, onMessageRow, RowOrder } from "@plugins/hooks";

export default definePlugin({
    id: "fluxcord.my-plugin",
    name: "My Plugin",
    description: "What it does",
    icon: "ChatIcon",
    tags: ["Chat", "Utility"],
    settings: {
        enabled: { type: "boolean", label: "Enabled", default: true },
    },
    start({ store, cleanup }) {
        cleanup(
            // Change a message before it's sent
            onSend("my-plugin", content => store.enabled ? content.toUpperCase() : undefined),

            // Add a row to the message long-press sheet
            addMessageAction({
                key: "my-plugin",
                label: () => "My action",
                icon: "CopyIcon",
                onPress: (message) => { /* ... */ },
            }),

            // Register a slash command
            command({
                name: "mycmd",
                description: "Does something",
                run: async () => "hello",
            }),
        );
    },
    stop({ store }) {
        // cleanup() already undid the patches; store is persisted automatically
    },
});
```

- `id` is stable and used for settings storage: `FLUXCORD_PLUGIN_<id>`.
- `settings` schema: `boolean`, `select`, `number`, `string`. The settings page is generated from it.
- `cleanup(fns)` registers functions (unpatches) to run when the plugin stops.
- Every callback is isolated: one that throws is logged and skipped; Discord never crashes.
- A broken plugin is turned off automatically and shows a toast.

## Finding Discord's modules

Use `moduleAt("modules/...tsx")` — source paths survive renames that break name lookups — or
`findByPropsLazy("exportedName")` for stores/utilities. Tolerate a missing module: a plugin that throws at start
is turned off.

## The plugin manifest

`scripts/plugin-manifest.mjs` regenerates `mobile/bundle/src/plugins/manifest.ts` from the plugin folders. Run
it after adding or changing a plugin.

## Testing

- `pnpm lint` (in `mobile/bundle`) lints the bundle source.
- The emulator test turns every plugin on and off in real Discord.

## Do not

- Do not copy desktop-only code (Electron, `native.ts`, `@api/*`, `@webpack/common`) into mobile plugins.
- Do not use `document`/`window` DOM APIs or raw `fetch` to Discord endpoints.
- Do not include nonfunctional or fake plugins.
