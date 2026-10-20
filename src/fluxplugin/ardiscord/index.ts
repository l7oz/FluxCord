/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    showSupportButtons: {
        type: OptionType.BOOLEAN,
        description: "Show Support Buttons",
        default: false
    }
});

const translations = {
    "Plugins": "ط§ظ„ط¥ط¶ط§ظپط§طھ",
    "User Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ط³طھط®ط¯ظ…",
    "Account": "ط§ظ„ط­ط³ط§ط¨",
    "Account Info": "ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط­ط³ط§ط¨",
    "Password & Security": "ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط± ظˆ ط§ظ„ط­ظ…ط§ظٹط©",
    "Account Standing": "ط­ط§ظ„ط© ط§ظ„ط­ط³ط§ط¨",
    "Revel": "ط¥ط¸ظ‡ط§ط±",
    "Enable": "طھظپط¹ظٹظ„",
    "Disable Account": "طھط¹ط·ظٹظ„ ط§ظ„ط­ط³ط§ط¨",
    "Delete Account": "ط­ط°ظپ ط§ظ„ط­ط³ط§ط¨",
    "Add up to 250 custom emoji that anyone can use in this server. Animated GIF emoji may be used by members with Discord Nitro.": "ط£ط¶ظپ ظ…ط§ ظٹطµظ„ ط¥ظ„ظ‰ 250 ط¥ظٹظ…ظˆط¬ظٹ ظ…ط®طµطµ ظٹظ…ظƒظ† ظ„ط£ظٹ ط´ط®طµ ط§ط³طھط®ط¯ط§ظ…ظ‡ ظپظٹ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±: ظٹظ…ظƒظ† ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط°ظٹظ† ظ„ط¯ظٹظ‡ظ… Discord Nitro ط§ط³طھط®ط¯ط§ظ… ط¥ظٹظ…ظˆط¬ظٹ GIF ط§ظ„ظ…طھط­ط±ظƒط©.",
    "Upload Emoji": "ط±ظپط¹ ظ…ظ„ظپ ط§ظ„طµظˆط±ط©",
    "Inbox": "طµظ†ط¯ظˆظ‚ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Mention": "ط§ظ„ظ…ظ†ط´ظ†",
    "Clear": "ط­ط°ظپ",
    "You will appear offline": "ط³طھط¸ظ‡ط± ظپظٹ ظˆط¶ط¹ ط؛ظٹط± ظ…طھطµظ„",
    "You will not receive desktop notifications": "ظٹظ…ظ†ط¹ ط§ط±ط³ط§ظ„ طµظˆطھ ط§ظ„ط§ط´ط¹ط§ط±ط§طھ ط§ط°ظٹ ظƒظ†طھ ظپظٹ ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨ ط§ظˆ ظپظٹ ظˆظ‚طھ ط§ظ„ط¹ط¨",
    "Edit Profile": "طھط¹ط¯ظٹظ„ ط¨ط±ظˆظپط§ظٹظ„",
    "Switch Accounts": "طھط؛ظٹط± ط§ظ„ظٹظˆط²ط±",
    "Manage Accounts": "ط£ط¯ط§ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ",
    "For You": "ط±ط³ط§ط¦ظ„ ط®ط§طµظ‡ ظ„ظƒ",
    "Unreads": "ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¬طھظ…ط¹",
    "Mentions": "ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ظ†ط´ظ†",
    "Message": "ط§ظ„ط±ط³ط§ط¦ظ„",
    "Upload more stickers to make use of this unlocked level.": "ظ‚ظ… ط¨ط±ظپط¹ ط§ظ„ظ…ط²ظٹط¯ ظ…ظ† ط§ظ„ظ…ظ„طµظ‚ط§طھ ظ„ظ„ط§ط³طھظپط§ط¯ط© ظ…ظ† ظ‡ط°ط§ ط§ظ„ظ…ط³طھظˆظ‰ ط§ظ„ظ…ظپطھظˆط­",
    "Call": "ط£طھطµظ„",
    "Keybinds": "ظ„ظˆط­ط© ط§ظ„ظ…ظپط§طھظٹط­",
    "Show": "ط£ط¸ظ‡ط§ط±",
    "Blur": "ظپظ„ط§طھط±ظ‡",
    "Add Friend Nickname": "ط¥ط¶ط§ظپط© ظ„ظ‚ط¨ ظ„ظ„طµط¯ظٹظ‚",
    "Invite to Server": "ط£ط±ط³ط§ظ„ ط¯ط¹ظˆط© ط§ظ„ظ‰ ط§ظ„ظ…ط¬طھظ…ط¹ط§طھ",
    "Remove Friend": "ط¥ط²ط§ظ„ط© طµط¯ظٹظ‚",
    "Ignore": "طھط¬ط§ظ‡ظ„",
    "Block": "ط¨ظ„ظˆظƒ ًںڑ«",
    "Role": "ط±ظˆظ„ط§طھ ط§ظ„ط³ظٹط±ظپط±",
    "Open in Mod View": "ظƒظ†طھط±ظˆظ„ ط§ظ„ط§ط¯ظ…ظ†",
    "Verify Member": "طھط­ظ‚ظ‚ ظ…ظ† ط§ظ„ط¹ط¶ظˆ",
    "Timeout": "ط§ظٹظ‚ط§ظپ ظ…ظˆظ‚طھ ظ…ظ† ط§ظ„ظ…ط¬طھظ…ط¹",
    "My Account": "ط­ط³ط§ط¨ظٹ",
    "Friend": "طµط¯ظٹظ‚",
    "Activity": "ط§ظ„ظ†ط´ط§ط·",
    "View Full Profile": "ط¹ط±ط¶ ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ ط§ظ„ظƒط§ظ…ظ„",
    "Report User Profile": "ط±ظپط¹ ط¨ظ„ط§ط؛ ط¹ظ„ظ‰ ط§ظ„ط­ط³ط§ط¨",
    "Profile": "ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ",
    "Privacy & Safety": "ط§ظ„ط®طµظˆطµظٹط© ظˆط§ظ„ط£ظ…ط§ظ†",
    "Authorized Apps": "ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„ظ…طµط±ط­ ط¨ظ‡ط§",
    "Connections": "ط§ظ„ط§طھطµط§ظ„ط§طھ",
    "Mark as Verified": "ظˆط¶ط¹ ط¹ظ„ط§ظ…ط© طھظ… ط§ظ„طھط­ظ‚ظ‚",
    "View Verification Code": "ط¹ط±ط¶ ط±ظ…ط² ط§ظ„طھط­ظ‚ظ‚",
    "Appearance": "ط§ظ„ظ…ط¸ظ‡ط±",
    "Notifications": "ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ",
    "Voice & Video": "ط§ظ„طµظˆطھ ظˆط§ظ„ظپظٹط¯ظٹظˆ",
    "Text & Images": "ط§ظ„ظ†طµظˆطµ ظˆط§ظ„طµظˆط±",
    "Language": "ط§ظ„ظ„ط؛ط©",
    "Language & Time": "ط§ظ„ظ„ط؛ط© ظˆ ط§ظ„ظˆظ‚طھ",
    "Folder Name": "ط£ط³ظ… ط§ظ„ظ…ط¬ظ„ط¯",
    "Folder Color": "ظ„ظˆظ† ط§ظ„ظ…ط¬ظ„ط¯",
    "Mark Folder As Read": "ظ‚ط±ط§ط،ط© ظƒظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ…ط¬ظ„ط¯",
    "Folder Settings": "ظپطھط­ ط§ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ط¬ظ„ط¯",
    "Filter by User": "ط§ظ„طھطµظپظٹط© ط­ط³ط¨ ط§ظ„ظ…ط³طھط®ط¯ظ…",
    "Filter by Action": "ط§ظ„طھطµظپظٹط© ط­ط³ط¨ ط§ظ„ط¥ط¬ط±ط§ط،",
    "ACTIVE INVITE LINKS": "ط§ظ„ط±ظˆط§ط¨ط· ط§ظ„ط¯ط¹ظˆط© ط§ظ„ط®ط§طµ ظپظٹ ط§ظ„ط³ظٹط±ظپط± ط§ظ„ظ…ظپط¹ظ„ظ‡ ط­ط§ظ„ظٹظ†ط§",
    "Pause Invites": "ط¥ظٹظ‚ط§ظپ ط§ظ„ط¯ط¹ظˆط§طھ ظ…ط¤ظ‚طھظ‹ط§",
    "Create invite link": "ط¥ظ†ط´ط§ط، ط±ط§ط¨ط· ط¯ط¹ظˆط©",
    "Save Changes": "ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ",
    "Pending": "ط§ظ„ط·ظ„ط¨ط§طھ",
    "Rules or guidelines channel": "ظ‚ظ†ط§ط© ط§ظ„ظ‚ظˆط§ط¹ط¯ ط£ظˆ ط§ظ„ط¥ط±ط´ط§ط¯ط§طھ",
    "Please select the channel that hosts your rules. This channel will by default start from the top and will feature a special header.": "ظٹط±ط¬ظ‰ طھط­ط¯ظٹط¯ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طھظٹ طھط­طھظˆظٹ ط¹ظ„ظ‰ ط§ظ„ظ‚ظˆط§ط¹ط¯ ط§ظ„ط®ط§طµط© ط¨ظƒ. ط³طھط¨ط¯ط£ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظپطھط±ط§ط¶ظٹظ‹ط§ ظ…ظ† ط§ظ„ط£ط¹ظ„ظ‰ ظˆط³طھطھظ…ظٹط² ط¨ط¹ظ†ظˆط§ظ† ط®ط§طµ.",
    "Community Updates Channel": "ظ‚ظ†ط§ط© طھط­ط¯ظٹط«ط§طھ ط§ظ„ظ…ط¬طھظ…ط¹",
    "This is the channel where Discord will send relevant updates for Community admins and moderators. As some info might be sensitive, we recommend selecting a role-restricted channel.": "ظ‡ط°ظ‡ ظ‡ظٹ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طھظٹ ط³ظٹط±ط³ظ„ ظپظٹظ‡ط§ Discord ط§ظ„طھط­ط¯ظٹط«ط§طھ ط§ظ„ظ…ظ‡ظ…ط© ظ„ظ…ط³ط¤ظˆظ„ظٹ ط§ظ„ظ…ط¬طھظ…ط¹ ظˆط§ظ„ظ…ط´ط±ظپظٹظ†. ظ†ط¸ط±ظ‹ط§ ظ„ط£ظ† ط¨ط¹ط¶ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ظ‚ط¯ طھظƒظˆظ† ط­ط³ط§ط³ط©طŒ ظ†ظˆطµظٹ ط¨طھط­ط¯ظٹط¯ ظ‚ظ†ط§ط© ظ…ظ‚ظٹط¯ط© ط¨ط¯ظˆط± ظ…ط¹ظٹظ†.",
    "A server template is an easy way to share your server setup and help anyone create a server instantly.": "ظ‚ط§ظ„ط¨ ط§ظ„ط®ط§ط¯ظ… ظ‡ظˆ ط·ط±ظٹظ‚ط© ط³ظ‡ظ„ط© ظ„ظ…ط´ط§ط±ظƒط© ط¥ط¹ط¯ط§ط¯ط§طھ ط®ط§ط¯ظ…ظƒ ظˆظ…ط³ط§ط¹ط¯ط© ط£ظٹ ط´ط®طµ ط¹ظ„ظ‰ ط¥ظ†ط´ط§ط، ط®ط§ط¯ظ… ط¹ظ„ظ‰ ط§ظ„ظپظˆط±.",
    "Safety Notifications Channel": "ظ‚ظ†ط§ط© ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ط£ظ…ط§ظ†",
    "This is the channel where Discord will send you important safety updates about your server. As some info might be sensitive, we recommend selecting a role-restricted channel.": "ظ‡ط°ظ‡ ظ‡ظٹ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طھظٹ ط³ظٹط±ط³ظ„ ظپظٹظ‡ط§ Discord طھط­ط¯ظٹط«ط§طھ ط£ظ…ط§ظ† ظ…ظ‡ظ…ط© ط­ظˆظ„ ط®ط§ط¯ظ…ظƒ. ظ†ط¸ط±ظ‹ط§ ظ„ط£ظ† ط¨ط¹ط¶ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ظ‚ط¯ طھظƒظˆظ† ط­ط³ط§ط³ط©طŒ ظ†ظˆطµظٹ ط¨طھط­ط¯ظٹط¯ ظ‚ظ†ط§ط© ظ…ظ‚ظٹط¯ط© ط¨ط¯ظˆط± ظ…ط¹ظٹظ†.",
    "Server Description": "ظˆطµظپ ط§ظ„ط®ط§ط¯ظ…",
    "Describe your community. This description will be displayed in external embeds of this serverâ€™s invite link.": "طµظپ ظ…ط¬طھظ…ط¹ظƒ. ط³ظٹطھظ… ط¹ط±ط¶ ظ‡ط°ط§ ط§ظ„ظˆطµظپ ظپظٹ ط§ظ„ط±ظˆط§ط¨ط· ط§ظ„ظ…ط¯ظ…ط¬ط© ط§ظ„ط®ط§ط±ط¬ظٹط© ظ„ط±ط§ط¨ط· ط¯ط¹ظˆط© ظ‡ط°ط§ ط§ظ„ط®ط§ط¯ظ….",
    "When someone uses your server template link, they create a new server pre-filled with the same channels, roles, permissions, and settings as yours.": "ط¹ظ†ط¯ظ…ط§ ظٹط³طھط®ط¯ظ… ط´ط®طµ ظ…ط§ ط±ط§ط¨ط· ظ‚ط§ظ„ط¨ ط®ط§ط¯ظ…ظƒطŒ ظٹظ‚ظˆظ… ط¨ط¥ظ†ط´ط§ط، ط®ط§ط¯ظ… ط¬ط¯ظٹط¯ ظ…ظ…ظ„ظˆط، ظ…ط³ط¨ظ‚ظ‹ط§ ط¨ظ†ظپط³ ط§ظ„ظ‚ظ†ظˆط§طھطŒ ط§ظ„ط£ط¯ظˆط§ط±طŒ ط§ظ„ط£ط°ظˆظ†ط§طھطŒ ظˆط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط®ط§طµط© ط¨ظƒ.",
    "Disable Community": "طھط¹ط·ظٹظ„ ط§ظ„ظ…ط¬طھظ…ط¹",
    "This will remove specific features for Community Servers, like Server Discovery and Server Insights.": "ط³ظٹط¤ط¯ظٹ ظ‡ط°ط§ ط¥ظ„ظ‰ ط¥ط²ط§ظ„ط© ظ…ظٹط²ط§طھ ظ…ط­ط¯ط¯ط© ظ„ط®ظˆط§ط¯ظ… ط§ظ„ظ…ط¬طھظ…ط¹طŒ ظ…ط«ظ„ ط§ظƒطھط´ط§ظپ ط§ظ„ط®ط§ط¯ظ… ظˆطھط­ظ„ظٹظ„ط§طھ ط§ظ„ط®ط§ط¯ظ….",
    "Server Primary Language": "ط§ظ„ظ„ط؛ط© ط§ظ„ط£ط³ط§ط³ظٹط© ظ„ظ„ط®ط§ط¯ظ…",
    "This helps Discord customize features for you and your members.": "ظٹط³ط§ط¹ط¯ ظ‡ط°ط§ Discord ط¹ظ„ظ‰ طھط®طµظٹطµ ط§ظ„ظ…ظٹط²ط§طھ ظ„ظƒ ظˆظ„ط£ط¹ط¶ط§ط، ط®ط§ط¯ظ…ظƒ.",
    "Links": "ط§ظ„ط±ظˆط§ط¨ط·",
    "Invite Only": "ط§ظ„ط¯ط¹ظˆط© ظپظ‚ط·",
    "Apply to Join": "ط·ظ„ط¨ ط§ظ„ط§ظ†ط¶ظ…ط§ظ…",
    "Discoverable": "ظ‚ط§ط¨ظ„ ظ„ظ„ط§ظƒطھط´ط§ظپ",
    "People can join your server directly with an invite": "ظٹظ…ظƒظ† ظ„ظ„ظ†ط§ط³ ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ط®ط§ط¯ظ…ظƒ ظ…ط¨ط§ط´ط±ط© ط¹ط¨ط± ط§ظ„ط¯ط¹ظˆط©",
    "People must submit an application and be approved to join": "ظٹط¬ط¨ ط¹ظ„ظ‰ ط§ظ„ط£ط´ط®ط§طµ طھظ‚ط¯ظٹظ… ط·ظ„ط¨ ظˆط§ظ„ط­طµظˆظ„ ط¹ظ„ظ‰ ط§ظ„ظ…ظˆط§ظپظ‚ط© ظ„ظ„ط§ظ†ط¶ظ…ط§ظ…",
    "Anyone can join your server directly through Server Discovery": "ظٹظ…ظƒظ† ظ„ط£ظٹ ط´ط®طµ ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ط®ط§ط¯ظ…ظƒ ظ…ط¨ط§ط´ط±ط© ظ…ظ† ط®ظ„ط§ظ„ ط§ظƒطھط´ط§ظپ ط§ظ„ط®ط§ط¯ظ…",
    "Join Application": "ط·ظ„ط¨ ط§ظ„ط§ظ†ط¶ظ…ط§ظ…",
    "Add questions to your application. People dontâ€™t join your server until you approve their application. Youâ€™ll have the option to DM applicants before approving or denying them.": "ط£ط¶ظپ ط£ط³ط¦ظ„ط© ط¥ظ„ظ‰ ط·ظ„ط¨ ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط§ظ„ط®ط§طµ ط¨ظƒ. ظ„ط§ ظٹظ†ط¶ظ… ط§ظ„ط£ط´ط®ط§طµ ط¥ظ„ظ‰ ط®ط§ط¯ظ…ظƒ ط­طھظ‰ طھظˆط§ظپظ‚ ط¹ظ„ظ‰ ط·ظ„ط¨ظ‡ظ…. ط³ظٹظƒظˆظ† ظ„ط¯ظٹظƒ ط®ظٹط§ط± ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ط®ط§طµط© ظ„ظ„ظ…طھظ‚ط¯ظ…ظٹظ† ظ‚ط¨ظ„ ط§ظ„ظ…ظˆط§ظپظ‚ط© ط£ظˆ ط§ظ„ط±ظپط¶.",
    "Display": "ط§ظ„ط¹ط±ط¶",
    "Reset": "ط§ط¹ط§ط¯ط©",
    "Temporarily stop new members from joining this server via invite or vanity links.": "ط¥ظٹظ‚ط§ظپ ط§ظ†ط¶ظ…ط§ظ… ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¬ط¯ط¯ ظ…ط¤ظ‚طھظ‹ط§ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط®ط§ط¯ظ… ط¹ط¨ط± ط§ظ„ط±ظˆط§ط¨ط· ط§ظ„ط¯ط¹ظˆظٹط© ط£ظˆ ط§ظ„ط±ظˆط§ط¨ط· ط§ظ„ظ…ط®طµطµط©.",
    "Pause DMs": "ط¥ظٹظ‚ط§ظپ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظ…ط¤ظ‚طھظ‹ط§",
    "Temporarily stop new direct messages from being sent between members in your server. Friends can still DM each other, moderators can still DM members, and your Apps can still DM members.": "ط¥ظٹظ‚ط§ظپ ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ط§ظ„ط¬ط¯ظٹط¯ط© ظ…ط¤ظ‚طھظ‹ط§ ط¨ظٹظ† ط§ظ„ط£ط¹ط¶ط§ط، ظپظٹ ط®ط§ط¯ظ…ظƒ. ظ„ط§ ظٹط²ط§ظ„ ط§ظ„ط£طµط¯ظ‚ط§ط، ظ‚ط§ط¯ط±ظٹظ† ط¹ظ„ظ‰ ظ…ط±ط§ط³ظ„ط© ط¨ط¹ط¶ظ‡ظ… ط§ظ„ط¨ط¹ط¶طŒ ظˆط§ظ„ظ…ط´ط±ظپظˆظ† ظ„ط§ ظٹط²ط§ظ„ ط¨ط¥ظ…ظƒط§ظ†ظ‡ظ… ظ…ط±ط§ط³ظ„ط© ط§ظ„ط£ط¹ط¶ط§ط،طŒ ظˆطھط·ط¨ظٹظ‚ط§طھظƒ ظ„ط§ طھط²ط§ظ„ ظ‚ط§ط¯ط±ط© ط¹ظ„ظ‰ ظ…ط±ط§ط³ظ„ط© ط§ظ„ط£ط¹ط¶ط§ط،.",
    "Confirm": "طھط£ظƒظٹط¯",
    "Grant temporary merntership": "ظ…ظ†ط­ ط¹ط¶ظˆظٹط© ظ…ط¤ظ‚طھط©",
    "Temporary members are automatically kicked when they disconnect unless a role has been assigned": "ظٹطھظ… ط·ط±ط¯ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…ط¤ظ‚طھظٹظ† طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¹ظ†ط¯ طھط³ط¬ظٹظ„ ط§ظ„ط®ط±ظˆط¬ ط¥ظ„ط§ ط¥ط°ط§ طھظ… طھط¹ظٹظٹظ† ط¯ظˆط± ظ„ظ‡ظ…",
    "Max Number of Uses": "ط£ظ‚طµظ‰ ط¹ط¯ط¯ ظ…ظ† ط§ظ„ط§ط³طھط®ط¯ط§ظ…ط§طھ",
    "Expire After": "طھظ†طھظ‡ظٹ ط§ظ„طµظ„ط§ط­ظٹط© ط¨ط¹ط¯",
    "Generate a New Link": "ط¥ظ†ط´ط§ط، ط±ط§ط¨ط· ط¬ط¯ظٹط¯",
    "Cancel": "ط¥ظ„ط؛ط§ط،",
    "Gift Inventory": "ظ‡ط¯ط§ظٹط© ط§ظ„ط¯ظٹط³ظƒظˆط±ط¯",
    "Delete": "ط­ط°ظپ",
    "Display role members separately from online members": "ط¹ط±ط¶ ط£ط¹ط¶ط§ط، ط§ظ„ط¯ظˆط± ط¨ط´ظƒظ„ ظ…ظ†ظپطµظ„ ط¹ظ† ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھطµظ„ظٹظ†",
    "Allow anyone to@mention this role": "ط§ظ„ط³ظ…ط§ط­ ظ„ط£ظٹ ط´ط®طµ ط¨ط°ظƒط± ظ‡ط°ط§ ط§ظ„ظ…ظ†ط´ظ† @mention",
    "Clear permissions": "ظ…ط³ط­ ط§ظ„طµظ„ط§ط­ظٹط§طھ",
    "Members use the color of the highest role they have on the roles list.": "ظٹط³طھط®ط¯ظ… ط§ظ„ط£ط¹ط¶ط§ط، ظ„ظˆظ† ط£ط¹ظ„ظ‰ ط¯ظˆط± ظ„ط¯ظٹظ‡ظ… ظپظٹ ظ‚ط§ط¦ظ…ط© ط§ظ„ط£ط¯ظˆط§ط±.",
    "Allows members to view channels by default (excluding private channels).": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ط§ظ„ظ‚ظ†ظˆط§طھ ط¨ط´ظƒظ„ ط§ظپطھط±ط§ط¶ظٹ (ط¨ط§ط³طھط«ظ†ط§ط، ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„ط®ط§طµط©).",
    "This will let you test what actions this role can take and what channels it can see. Only available to Server Owners and Admine.": "ط³ظٹط³ظ…ط­ ظ„ظƒ ظ‡ط°ط§ ط¨ط§ط®طھط¨ط§ط± ظ…ط§ ظٹظ…ظƒظ† ظ„ظ‡ط°ط§ ط§ظ„ط¯ظˆط± ط§ظ„ظ‚ظٹط§ظ… ط¨ظ‡ ظ…ظ† ط¥ط¬ط±ط§ط،ط§طھ ظˆظ…ط§ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طھظٹ ظٹظ…ظƒظ†ظ‡ ط±ط¤ظٹطھظ‡ط§. ظ…طھط§ط­ ظپظ‚ط· ظ„ظ…ط§ظ„ظƒظٹ ط§ظ„ط®ط§ط¯ظ… ظˆط§ظ„ظ…ط¯ظٹط±ظٹظ†.",
    "Allows members to create, edit, or delete channels.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط،طŒ طھط¹ط¯ظٹظ„طŒ ط£ظˆ ط­ط°ظپ ط§ظ„ظ‚ظ†ظˆط§طھ.",
    "Allows members to use @everyone (everyone in the server) or @here (only online members in that channel). They can also @mention all roles, even if the roleâ€™s â€œAllow anyone to mention this roleâ€‌ permission is disabled.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… @everyone (ط§ظ„ط¬ظ…ظٹط¹ ظپظٹ ط§ظ„ط³ظٹط±ظپط±) ط£ظˆ @here (ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھطµظ„ظٹظ† ظپظ‚ط· ظپظٹ طھظ„ظƒ ط§ظ„ظ‚ظ†ط§ط©). ظƒظ…ط§ ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ظ…ظ†ط´ظ† ظ„ظƒظ„ ط§ظ„ط±طھط¨طŒ ط­طھظ‰ ظ„ظˆ ظƒط§ظ†طھ طµظ„ط§ط­ظٹط© 'ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط¬ظ…ظٹط¹ ط¨ط°ظƒط± ظ‡ط°ط§ ط§ظ„ط¯ظˆط±' ظ…ط¹ط·ظ„ط©.",
    "Send Messages in Threads and Posts": "ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ظˆط§ظ„ظ…ظ†ط´ظˆط±ط§طھ",
    "Manage Threads and Posts": "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ظˆط§ظ„ظ…ظ†ط´ظˆط±ط§طھ",
    "Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ط±طھط¨ ط¬ط¯ظٹط¯ط© ظˆطھط¹ط¯ظٹظ„ ط£ظˆ ط­ط°ظپ ط§ظ„ط±طھط¨ ط§ظ„ط£ظ‚ظ„ ظ…ظ† ط±طھط¨طھظ‡ظ… ط§ظ„ط£ط¹ظ„ظ‰. ظƒظ…ط§ ظٹط³ظ…ط­ ظ„ظ‡ظ… ط¨طھط؛ظٹظٹط± طµظ„ط§ط­ظٹط§طھ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طھظٹ ظ„ط¯ظٹظ‡ظ… طµظ„ط§ط­ظٹط© ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظٹظ‡ط§.",
    "Send Messages and Create Posts": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظˆط¥ظ†ط´ط§ط، ط§ظ„ظ…ظ†ط´ظˆط±ط§طھ",
    "Server Rules": "ظ‚ظˆط§ط¹ط¯ ط§ظ„ط®ط§ط¯ظ…",
    "Members must agree to rules before they can chat or interact in the server.": "ظٹط¬ط¨ ط¹ظ„ظ‰ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…ظˆط§ظپظ‚ط© ط¹ظ„ظ‰ ط§ظ„ظ‚ظˆط§ط¹ط¯ ظ‚ط¨ظ„ ط£ظ† ظٹطھظ…ظƒظ†ظˆط§ ظ…ظ† ط§ظ„ط¯ط±ط¯ط´ط© ط£ظˆ ط§ظ„طھظپط§ط¹ظ„ ظپظٹ ط§ظ„ط®ط§ط¯ظ….",
    "Allow members to send messages in threads and in posts on forum channels.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ظˆط§ظ„ظ…ظ†ط´ظˆط±ط§طھ ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„ظ…ظ†طھط¯ظ‰.",

    "Allow members to create threads that everyone in a channel can view.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ظٹظ…ظƒظ† ظ„ظ„ط¬ظ…ظٹط¹ ظپظٹ ط§ظ„ظ‚ظ†ط§ط© ظ…ط´ط§ظ‡ط¯طھظ‡ط§.",

    "Allow members to create invite-only threads.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ظ„ط¯ط¹ظˆط§طھ ظپظ‚ط·.",

    "Allows links that members share to show embedded content in text channels.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط±ظˆط§ط¨ط· ط§ظ„طھظٹ ظٹط´ط§ط±ظƒظ‡ط§ ط§ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¸ظ‡ط§ط± ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„ظ…ط¯ظ…ط¬ ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„ظ†طµظˆطµ.",

    "Allows members to upload files or media in text channels.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط±ظپط¹ ط§ظ„ظ…ظ„ظپط§طھ ط£ظˆ ط§ظ„ظˆط³ط§ط¦ط· ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„ظ†طµظˆطµ.",

    "Allows members to add new emoji reactions to a message. If this permission is disabled, members can still react using any existing reactions on a message.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¶ط§ظپط© طھظپط§ط¹ظ„ط§طھ ط¥ظٹظ…ظˆط¬ظٹ ط¬ط¯ظٹط¯ط© ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ط¦ظ„. ط¥ط°ط§ ظƒط§ظ†طھ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ظ…ط¹ط·ظ„ط©طŒ ظٹظ…ظƒظ† ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„طھظپط§ط¹ظ„ ط¨ط§ط³طھط®ط¯ط§ظ… ط£ظٹ طھظپط§ط¹ظ„ط§طھ ظ…ظˆط¬ظˆط¯ط© ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ظ„ط©.",
    "Allows members to delete messages by other members or pin any": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط­ط°ظپ ط±ط³ط§ط¦ظ„ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط£ظˆ طھط«ط¨ظٹطھ ط£ظٹ ط±ط³ط§ظ„ط©.",

    "Allows members to pin or unpin any message.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط«ط¨ظٹطھ ط£ظˆ ط¥ط²ط§ظ„ط© طھط«ط¨ظٹطھ ط£ظٹ ط±ط³ط§ظ„ط©.",

    "Allows members to rename, delete, close, and turn on slow mode for threads and posts. They can also view private threads.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¹ط§ط¯ط© طھط³ظ…ظٹط©طŒ ط­ط°ظپطŒ ط؛ظ„ظ‚طŒ ظˆطھظپط¹ظٹظ„ ظˆط¶ط¹ ط§ظ„طھط¨ط§ط·ط¤ ظ„ظ„ظ…ظˆط§ط¶ظٹط¹ ظˆط§ظ„ظ…ظ†ط´ظˆط±ط§طھ. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط¬ط¹ظ„ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ط®ط§طµط©.",

    "Allows members to read previous messages sent in channels. If this permission is disabled, members only see messages sent when they are online. This does not fully apply to threads and forum posts.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظ‚ط±ط§ط،ط© ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط³ط§ط¨ظ‚ط© ط§ظ„ظ…ط±ط³ظ„ط© ظپظٹ ط§ظ„ظ‚ظ†ظˆط§طھ. ط¥ط°ط§ ظƒط§ظ†طھ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ظ…ط¹ط·ظ„ط©طŒ ظپط¥ظ† ط§ظ„ط£ط¹ط¶ط§ط، ط³ظٹط´ط§ظ‡ط¯ظˆظ† ظپظ‚ط· ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط±ط³ظ„ط© ط¹ظ†ط¯ظ…ط§ ظٹظƒظˆظ†ظˆظ† ظ…طھطµظ„ظٹظ†. ظ‡ط°ط§ ظ„ط§ ظٹظ†ط·ط¨ظ‚ ط¨ط§ظ„ظƒط§ظ…ظ„ ط¹ظ„ظ‰ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ظˆظ…ظ†ط´ظˆط±ط§طھ ط§ظ„ظ…ظ†طھط¯ظ‰.",

    "Allows members to send text-to-speech messages by starting a message with /tts. These messages can be heard by anyone focused on the channel.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طھط­ظˆظٹظ„ ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ… ط¹ظ† ط·ط±ظٹظ‚ ط¨ط¯ط، ط§ظ„ط±ط³ط§ظ„ط© ط¨ظ€ /tts. ظٹظ…ظƒظ† ط³ظ…ط§ط¹ ظ‡ط°ظ‡ ط§ظ„ط±ط³ط§ط¦ظ„ ظ…ظ† ظ‚ط¨ظ„ ط£ظٹ ط´ط®طµ ظ…ط±ظƒط² ظپظٹ ط§ظ„ظ‚ظ†ط§ط©.",
    "Allows members to speak in voice channels by simply talking. If this permission is disabled, members are required to use Push-to-talk. Good for controlling background noise or noisy members.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„طھط­ط¯ط« ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ ط¨ظ…ط¬ط±ط¯ ط§ظ„ط­ط¯ظٹط«. ط¥ط°ط§ ظƒط§ظ†طھ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ظ…ط¹ط·ظ„ط©طŒ ظٹط­طھط§ط¬ ط§ظ„ط£ط¹ط¶ط§ط، ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط¶ط؛ط· ظ„ظ„طھط­ط¯ط« (Push-to-Talk). ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ظ…ظپظٹط¯ط© ظ„ظ„طھط­ظƒظ… ظپظٹ ط§ظ„ط¶ظˆط¶ط§ط، ط§ظ„ط®ظ„ظپظٹط© ط£ظˆ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…ط²ط¹ط¬ظٹظ†.",

    "Allows members to disconnect or move other members between voice channels that the member with this permission has access to.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظپطµظ„ ط£ظˆ ظ†ظ‚ظ„ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط¨ظٹظ† ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ ط§ظ„طھظٹ ظٹظ…ظƒظ† ظ„ظ„ط¹ط¶ظˆ ط§ظ„ط°ظٹ ظ„ط¯ظٹظ‡ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظٹظ‡ط§.",
    "Allows members to deafen other members in voice channels, which means they wonâ€™t be able to speak or hear others.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظƒطھظ… طµظˆطھ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھطŒ ظ…ظ…ط§ ظٹط¹ظ†ظٹ ط£ظ†ظ‡ظ… ظ„ظ† ظٹط³طھط·ظٹط¹ظˆط§ ط§ظ„طھط­ط¯ط« ط£ظˆ ط³ظ…ط§ط¹ ط§ظ„ط¢ط®ط±ظٹظ†.",
    "Allows members to use commands from applications, including slash commands and context menu commands.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ظˆط§ظ…ط± ظ…ظ† ط§ظ„طھط·ط¨ظٹظ‚ط§طھطŒ ط¨ظ…ط§ ظپظٹ ط°ظ„ظƒ ط£ظˆط§ظ…ط± ط§ظ„ط´ط±ظٹط· ظˆط£ظˆط§ظ…ط± ظ‚ط§ط¦ظ…ط© ط§ظ„ط³ظٹط§ظ‚.",
    "Allows members to delete messages by other members or pin any message.": "ظٹطھظٹط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط­ط°ظپ ط±ط³ط§ط¦ظ„ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط£ظˆ طھط«ط¨ظٹطھ ط£ظٹ ط±ط³ط§ظ„ط©.",
    "Allows members to use Activities.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ظ†ط´ط·ط©.",

    "Allows apps that members have added to their account to post messages.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„طھظٹ ط£ط¶ط§ظپظ‡ط§ ط§ظ„ط£ط¹ط¶ط§ط، ط¥ظ„ظ‰ ط­ط³ط§ط¨ظ‡ظ… ط¨ظ†ط´ط± ط§ظ„ط±ط³ط§ط¦ظ„.",

    "When disabled, the messages will be private.": "ط¹ظ†ط¯ طھط¹ط·ظٹظ„ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط©طŒ ط³طھظƒظˆظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط®ط§طµط©.",

    "Allows members to deafen other members in voice channels, which means they won't be able to speak or hear others.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظƒطھظ… طµظˆطھ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھطŒ ظ…ظ…ط§ ظٹط¹ظ†ظٹ ط£ظ†ظ‡ظ… ظ„ظ† ظٹط³طھط·ظٹط¹ظˆط§ ط§ظ„طھط­ط¯ط« ط£ظˆ ط³ظ…ط§ط¹ ط§ظ„ط¢ط®ط±ظٹظ†.",

    "Allows members to mute other members in voice channels for everyone.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظƒطھظ… طµظˆطھ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ ظ„ظ„ط¬ظ…ظٹط¹.",

    "Stage Channel Permissions": "طµظ„ط§ط­ظٹط§طھ ظ‚ظ†ظˆط§طھ ط§ظ„ط³طھظٹط¬",
    "Allows members to edit and cancel events.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط¹ط¯ظٹظ„ ظˆط¥ظ„ط؛ط§ط، ط§ظ„ظپط¹ط§ظ„ظٹط§طھ.",
    "Allow requests to speak in Stage channels. Stage moderators manually approve or deny each request.": "ط§ظ„ط³ظ…ط§ط­ ط¨ط·ظ„ط¨ط§طھ ط§ظ„طھط­ط¯ط« ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„ط³طھظٹط¬. ظٹظ‚ظˆظ… ظ…ط´ط±ظپظˆ ط§ظ„ط³طھظٹط¬ ط¨ط§ظ„ظ…ظˆط§ظپظ‚ط© ط£ظˆ ط§ظ„ط±ظپط¶ ظٹط¯ظˆظٹظ‹ط§ ظ„ظƒظ„ ط·ظ„ط¨.",
    "Allows apps that members have added to their account to post messages. When disabled, the messages will be private.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„طھظٹ ط£ط¶ط§ظپظ‡ط§ ط§ظ„ط£ط¹ط¶ط§ط، ط¥ظ„ظ‰ ط­ط³ط§ط¨ظ‡ظ… ط¨ظ†ط´ط± ط§ظ„ط±ط³ط§ط¦ظ„. ط¹ظ†ط¯ طھط¹ط·ظٹظ„ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط©طŒ ط³طھظƒظˆظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط®ط§طµط©.",
    "Allows members to create events.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ط§ظ„ظپط¹ط§ظ„ظٹط§طھ.",
    "Allows members to be more easily heard in voice channels. When activated, the volume of others without this permission will be automatically lowered. Priority Speaker is activated by using the keybind.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط£ظ† ظٹطھظ… ط³ظ…ط§ط¹ظ‡ظ… ط¨ط´ظƒظ„ ط£ط³ظ‡ظ„ ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ. ط¹ظ†ط¯ طھظپط¹ظٹظ„ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط©طŒ ظٹطھظ… طھظ‚ظ„ظٹظ„ ط­ط¬ظ… ط§ظ„طµظˆطھ ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط§ظ„ط°ظٹظ† ظ„ظٹط³ ظ„ط¯ظٹظ‡ظ… ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط©. ظٹطھظ… طھظپط¹ظٹظ„ ط§ظ„ظ…طھط­ط¯ط« ط°ظˆ ط§ظ„ط£ظˆظ„ظˆظٹط© ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط§ط®طھطµط§ط±.",
    "Allows members to send voice messages.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طµظˆطھظٹط©.",

    "Allows members to create": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط،",

    "Allows members to join voice channels and hear others.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ ظˆط§ظ„ط§ط³طھظ…ط§ط¹ ظ„ظ„ط¢ط®ط±ظٹظ†.",

    "Allows members to talk in voice channels. If this permission is disabled, members are default muted until somebody with the 'Mute Members' permission un-mutes them.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„طھط­ط¯ط« ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھ. ط¥ط°ط§ ظƒط§ظ†طھ ظ‡ط°ظ‡ ط§ظ„طµظ„ط§ط­ظٹط© ظ…ط¹ط·ظ„ط©طŒ ظٹطھظ… ظƒطھظ… ط§ظ„ط£ط¹ط¶ط§ط، ط¨ط´ظƒظ„ ط§ظپطھط±ط§ط¶ظٹ ط­طھظ‰ ظٹظ‚ظˆظ… ط´ط®طµ ط¢ط®ط± ظ„ط¯ظٹظ‡ طµظ„ط§ط­ظٹط© 'ظƒطھظ… ط§ظ„ط£ط¹ط¶ط§ط،' ط¨ط¥ظ„ط؛ط§ط، ظƒطھظ…ظ‡ظ….",
    "Allows members to use emoji from other servers, if theyâ€™re a Discord Nitro member.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط¥ظٹظ…ظˆط¬ظٹ ظ…ظ† ط³ظٹط±ظپط±ط§طھ ط£ط®ط±ظ‰طŒ ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ظ† ط£ط¹ط¶ط§ط، Discord Nitro.",

    "Allows members to use stickers from other servers, if theyâ€™re a Discord Nitro member.": "ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ظ…ظ„طµظ‚ط§طھ ظ…ظ† ط³ظٹط±ظپط±ط§طھ ط£ط®ط±ظ‰طŒ ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ظ† ط£ط¹ط¶ط§ط، Discord Nitro.",
    "Allows members to add custom emoji, stickers, and sounds in this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¶ط§ظپط© ط¥ظٹظ…ظˆط¬ظٹطŒ ظ…ظ„طµظ‚ط§طھطŒ ظˆط£طµظˆط§طھ ظ…ط®طµطµط© ظپظٹ ط§ظ„ط³ظٹط±ظپط±.",

    "Allows members to edit or remove custom emoji, stickers, and sounds in this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط¹ط¯ظٹظ„ ط£ظˆ ط¥ط²ط§ظ„ط© ط§ظ„ط¥ظٹظ…ظˆط¬ظٹطŒ ط§ظ„ظ…ظ„طµظ‚ط§طھطŒ ظˆط§ظ„ط£طµظˆط§طھ ط§ظ„ظ…ط®طµطµط© ظپظٹ ط§ظ„ط³ظٹط±ظپط±.",

    "Allows members to view a record of who made which changes in this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ط³ط¬ظ„ ظٹظˆط¶ط­ ظ…ظ† ظ‚ط§ظ… ط¨ط£ظٹ طھط؛ظٹظٹط±ط§طھ ظپظٹ ط§ظ„ط³ظٹط±ظپط±.",

    "Allows members to view Server Insights, which shows data on community growth, engagement, and more. This will allow them to see certain data about channel activity, even for channels they cannot access.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ط¥ط­طµط§ط¦ظٹط§طھ ط§ظ„ط³ظٹط±ظپط±طŒ ظˆط§ظ„طھظٹ طھط¹ط±ط¶ ط¨ظٹط§ظ†ط§طھ ط­ظˆظ„ ظ†ظ…ظˆ ط§ظ„ظ…ط¬طھظ…ط¹طŒ ط§ظ„طھظپط§ط¹ظ„طŒ ظˆط§ظ„ظ…ط²ظٹط¯. ظ‡ط°ط§ ط³ظٹظ…ظƒظ†ظ‡ظ… ظ…ظ† ط±ط¤ظٹط© ط¨ط¹ط¶ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط¹ظ† ظ†ط´ط§ط· ط§ظ„ظ‚ظ†ظˆط§طھ ط­طھظ‰ ظ„ظˆ ظ„ظ… ظٹظƒظ† ظ„ط¯ظٹظ‡ظ… ظˆطµظˆظ„ ظ…ط¨ط§ط´ط± ط¥ظ„ظٹظ‡ط§.",
    "Create": "ط¥ظ†ط´ط§ط،",
    "Allows members to create, edit, or delete webhooks, which can post messages from other apps or sites into this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط،طŒ طھط¹ط¯ظٹظ„طŒ ط£ظˆ ط­ط°ظپ ط§ظ„ظˆظگط¨ ظ‡ظˆظƒط³طŒ ظˆط§ظ„طھظٹ ظٹظ…ظƒظ†ظ‡ط§ ظ†ط´ط± ط±ط³ط§ط¦ظ„ ظ…ظ† طھط·ط¨ظٹظ‚ط§طھ ط£ظˆ ظ…ظˆط§ظ‚ط¹ ط£ط®ط±ظ‰ ط¯ط§ط®ظ„ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±.",
    "Allow members to change this server's name, switch regions, view all invites, add apps to this server and create and update AutoMod rules.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط§ط³ظ… ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±طŒ ظˆطھط؛ظٹظٹط± ط§ظ„ظ…ظ†ط·ظ‚ط©طŒ ظˆط¹ط±ط¶ ط¬ظ…ظٹط¹ ط§ظ„ط¯ط¹ظˆط§طھطŒ ظˆط¥ط¶ط§ظپط© ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±طŒ ظˆط¥ظ†ط´ط§ط، ظˆطھط­ط¯ظٹط« ظ‚ظˆط§ط¹ط¯ AutoMod",
    "Manage Server": "ظٹط³ظ…ط­ ظ„ظ„ط§ط¹ط¶ط§ط، طھط¹ط¯ظٹظ„ ط§ط³ظ… ط§ظ„ط³ظٹط±ظپط± ظˆطھط¹ط¯ظٹظ„ ظ…ط§ ط¯ط§ط®ظ„ ط§ظ„ط³ظٹط±ظپط± ظƒط§ظ…ظ„",
    "General Server Permissions": "طµظ„ط§ط­ظٹط§طھ ط§ظ„ط³ظٹط±ظپط± ط§ظ„ط¹ط§ظ…ط©",
    "View Channels": "ط¹ط±ط¶ ط§ظ„ظ‚ظ†ظˆط§طھ",
    "Manage Channels": "ط¥ط¯ط§ط±ط© ط§ظ„ظ‚ظ†ظˆط§طھ",
    "Manage Roles": "ط¥ط¯ط§ط±ط© ط§ظ„ط±ظڈطھط¨",
    "Create Expressions": "ط¥ظ†ط´ط§ط، ط§ظ„طھط¹ط§ط¨ظٹط± (ط¥ظٹظ…ظˆط¬ظٹ/ظ…ظ„طµظ‚ط§طھ/ط£طµظˆط§طھ)",
    "Manage Expressions": "ط¥ط¯ط§ط±ط© ط§ظ„طھط¹ط§ط¨ظٹط± (ط¥ظٹظ…ظˆط¬ظٹ/ظ…ظ„طµظ‚ط§طھ/ط£طµظˆط§طھ)",
    "View Audit Log": "ط¹ط±ط¶ ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚",
    "View Server Insights": "ط¹ط±ط¶ طھط­ظ„ظٹظ„ط§طھ ط§ظ„ط³ظٹط±ظپط±",

    "Manage Nicknames": "ط¥ط¯ط§ط±ط© ط§ظ„ط£ظ„ظ‚ط§ط¨",
    "Kick Members": "ط·ط±ط¯ ط§ظ„ط£ط¹ط¶ط§ط،",
    "Ban Members": "ط­ط¸ط± ط§ظ„ط£ط¹ط¶ط§ط،",
    "Allows members to invite new people to this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¯ط¹ظˆط© ط£ط´ط®ط§طµ ط¬ط¯ط¯ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±",
    "Timeout Members": "طھظ‚ظٹظٹط¯/ط¥ط³ظƒط§طھ ط§ظ„ط£ط¹ط¶ط§ط،",

    "Send TTS Messages": "ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طµظˆطھظٹط© TTS",
    "Send Polls": "ط¥ط±ط³ط§ظ„ ط§ط³طھط·ظ„ط§ط¹ط§طھ",

    "Priority Speaker": "ظ…ظڈطھط­ط¯ط« ط°ظˆ ط£ظˆظ„ظˆظٹط©",
    "Request to Speak": "ط·ظ„ط¨ ط§ظ„طھط­ط¯ط«",
    "Manage Events (Stage)": "ط¥ط¯ط§ط±ط© ظپط¹ط§ظ„ظٹط§طھ ط§ظ„ط³طھظٹط¬",

    "Allows members to change their own nickname, a custom name for just this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط£ظ„ظ‚ط§ط¨ظ‡ظ… ط§ظ„ط®ط§طµط©طŒ ظˆظ‡ظˆ ط§ط³ظ… ظ…ط®طµطµ ظ„ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط± ظپظ‚ط·",
    "Allows members to change the nicknames of other members.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط£ظ„ظ‚ط§ط¨ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ†",
    "Kick will remove other members from this server. Kicked members will be able to rejoin if they have another invite. If the server enables Member Requirements, this permission enables the ability to approve or reject members who request to join.": "ط³ظٹط¤ط¯ظٹ ط§ظ„ط·ط±ط¯ ط¥ظ„ظ‰ ط¥ط²ط§ظ„ط© ط£ط¹ط¶ط§ط، ط¢ط®ط±ظٹظ† ظ…ظ† ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±. ط³ظٹطھظ…ظƒظ† ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…ط·ط±ظˆط¯ظˆظ† ظ…ظ† ط¥ط¹ط§ط¯ط© ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ط°ط§ ظƒط§ظ† ظ„ط¯ظٹظ‡ظ… ط¯ط¹ظˆط© ط£ط®ط±ظ‰. ط¥ط°ط§ ظ‚ط§ظ… ط§ظ„ط³ظٹط±ظپط± ط¨طھظ…ظƒظٹظ† ظ…طھط·ظ„ط¨ط§طھ ط§ظ„ط¹ط¶ظˆطŒ ظپط¥ظ† ظ‡ط°ط§ ط§ظ„ط¥ط°ظ† ظٹطھظٹط­ ط§ظ„ظ‚ط¯ط±ط© ط¹ظ„ظ‰ ط§ظ„ظ…ظˆط§ظپظ‚ط© ط£ظˆ ط±ظپط¶ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط°ظٹظ† ظٹط·ظ„ط¨ظˆظ† ط§ظ„ط§ظ†ط¶ظ…ط§ظ….",
    "Allows members to permanently ban and delete the message history of other members from this server.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط­ط¸ط± ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط¨ط´ظƒظ„ ط¯ط§ط¦ظ… ظˆط­ط°ظپ ط³ط¬ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط© ط¨ظ‡ظ… ظ…ظ† ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±.",
    "When you put a user in timeout they will not be able to send messages in chat, reply within threads, react to messages, or speak in voice or Stage channels.": "ط¹ظ†ط¯ ظˆط¶ط¹ ط¹ط¶ظˆ ظپظٹ ظپطھط±ط© ط§ظ†طھط¸ط§ط±طŒ ظ„ظ† ظٹطھظ…ظƒظ† ظ…ظ† ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ط¯ط±ط¯ط´ط©طŒ ط§ظ„ط±ط¯ ط¯ط§ط®ظ„ ط§ظ„ط®ظٹظˆط·طŒ ط§ظ„طھظپط§ط¹ظ„ ظ…ط¹ ط§ظ„ط±ط³ط§ط¦ظ„طŒ ط£ظˆ ط§ظ„طھط­ط¯ط« ظپظٹ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھظٹط© ط£ظˆ ظ‚ظ†ظˆط§طھ Stage.",
    "Allow members to send messages in text channels and create posts in forum channels.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„ظ†طµظٹط© ظˆط¥ظ†ط´ط§ط، ظ…ظ†ط´ظˆط±ط§طھ ظپظٹ ظ‚ظ†ظˆط§طھ ط§ظ„ظ…ظ†طھط¯ظ‰.",
    "Learn more.": "ظ…ط²ظٹط¯ ظ…ظ† ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ",
    "Allows members to share their video, screen share, or stream a game in this server.": "ظٹطھظٹط­ ظ„ظ„ط£ط¹ط¶ط§ط، ظ…ط´ط§ط±ظƒط© ظپظٹط¯ظٹظˆط§طھظ‡ظ…طŒ ظˆظ…ط´ط§ط±ظƒط© ط§ظ„ط´ط§ط´ط©طŒ ط£ظˆ ط¨ط« ظ„ط¹ط¨ط© ظپظٹ ظ‡ط°ط§ ط§ظ„ط®ط§ط¯ظ….",
    "I don't like it": "ظ„ط§ ظٹط¹ط¬ط¨ظ†ظٹ",
    "Spam": "ط³ط¨ط§ظ…",
    "Abuse or harassment": "ط¥ط³ط§ط،ط© ط£ظˆ ظ…ط¶ط§ظٹظ‚ط©",
    "Harmful misinformation or glorifying violence": "ظ…ط¹ظ„ظˆظ…ط§طھ ظ…ط¶ظ„ظ„ط© ط¶ط§ط±ط© ط£ظˆ طھظ…ط¬ظٹط¯ ظ„ظ„ط¹ظ†ظپ",
    "Exposing private identifying information": "ظƒط´ظپ ظ…ط¹ظ„ظˆظ…ط§طھ طھط¹ط±ظٹظپظٹط© ط®ط§طµط©",
    "Something else": "ط´ظٹ ط؛ظٹط± ط°ط§ظ„ظƒ",
    "This person is too young to use Discord": "ظ‡ط°ط§ ط§ظ„ط´ط®طµ طµط؛ظٹط± ط¬ط¯ظ‹ط§ ط¹ظ„ظ‰ ط§ط³طھط®ط¯ط§ظ… ط¯ظٹط³ظƒظˆط±ط¯",
    "It mentions self-harm, suicide, or eating disorders": "ظٹطھط­ط¯ط« ط¹ظ† ط¥ظٹط°ط§ط، ط§ظ„ظ†ظپط³ ط£ظˆ ط§ظ„ط§ظ†طھط­ط§ط± ط£ظˆ ط§ط¶ط·ط±ط§ط¨ط§طھ ط§ظ„ط£ظƒظ„",
    "Ban evasion, raiding, or using alternate accounts": "طھط¬ط§ظˆط² ط§ظ„ط­ط¸ط± ط£ظˆ ط§ظ„ظ…ط¯ط§ظ‡ظ…ط§طھ ط£ظˆ ط§ط³طھط®ط¯ط§ظ… ط­ط³ط§ط¨ط§طھ ط¨ط¯ظٹظ„ط©",

    "Impersonation, scam, or fraud": "ط§ظ†طھط­ط§ظ„ ط£ظˆ ط§ط­طھظٹط§ظ„ ط£ظˆ ظ†طµط¨",
    "Distributing stolen accounts or credit cards": "طھظˆط²ظٹط¹ ط­ط³ط§ط¨ط§طھ ط£ظˆ ط¨ط·ط§ظ‚ط§طھ ط§ط¦طھظ…ط§ظ† ظ…ط³ط±ظˆظ‚ط©",
    "Selling drugs or other illegal goods": "ط¨ظٹط¹ ط§ظ„ظ…ط®ط¯ط±ط§طھ ط£ظˆ ط§ظ„ط³ظ„ط¹ ط؛ظٹط± ط§ظ„ظ‚ط§ظ†ظˆظ†ظٹط© ط§ظ„ط£ط®ط±ظ‰",
    "Yes, they state their age in this message": "ظ†ط¹ظ…طŒ ط°ظƒط±ظˆط§ ط£ط¹ظ…ط§ط±ظ‡ظ… ظپظٹ ظ‡ط°ظ‡ ط§ظ„ط±ط³ط§ظ„ط©",
    "No, they don't state their age in this message": "ظ„ط§طŒ ظ„ظ… ظٹط°ظƒط±ظˆط§ ط£ط¹ظ…ط§ط±ظ‡ظ… ظپظٹ ظ‡ط°ظ‡ ط§ظ„ط±ط³ط§ظ„ط©",
    "I'm worried they are planning to self harm": "ط£ظ†ط§ ظ‚ظ„ظ‚ ظ…ظ† ط£ظ†ظ‡ظ… ظٹط®ط·ط·ظˆظ† ظ„ط¥ظٹط°ط§ط، ط£ظ†ظپط³ظ‡ظ…",
    "Promoting self-harm": "ط§ظ„طھط±ظˆظٹط¬ ظ„ط¥ظٹط°ط§ط، ط§ظ„ظ†ظپط³",
    "I'm worried they are considering suicide": "ط£ظ†ط§ ظ‚ظ„ظ‚ ظ…ظ† ط£ظ†ظ‡ظ… ظٹظپظƒط±ظˆظ† ط¨ط§ظ„ط§ظ†طھط­ط§ط±",
    "Promoting suicide": "ط§ظ„طھط±ظˆظٹط¬ ظ„ظ„ط§ظ†طھط­ط§ط±",
    "Promoting eating disorders": "ط§ظ„طھط±ظˆظٹط¬ ظ„ط§ط¶ط·ط±ط§ط¨ط§طھ ط§ظ„ط£ظƒظ„",
    "Threatening to raid another Discord server": "ط§ظ„طھظ‡ط¯ظٹط¯ ط¨ظ…ط¯ط§ظ‡ظ…ط© ط®ط§ط¯ظ… ط¯ظٹط³ظƒظˆط±ط¯ ط¢ط®ط±",

    "Announcing or encouraging an active raid": "ط§ظ„ط¥ط¹ظ„ط§ظ† ط¹ظ† ط£ظˆ طھط´ط¬ظٹط¹ ظ…ط¯ط§ظ‡ظ…ط© ظ†ط´ط·ط©",
    "This person rejoined a server after they were banned": "ظ‡ط°ط§ ط§ظ„ط´ط®طµ ط¹ط§ط¯ ط¥ظ„ظ‰ ط§ظ„ط®ط§ط¯ظ… ط¨ط¹ط¯ ط£ظ† طھظ… ط­ط¸ط±ظ‡",
    "them": "ظ‡ظ…",
    "This person is messaging me after I blocked": "ظ‡ط°ط§ ط§ظ„ط´ط®طµ ظٹط±ط³ظ„ ظ„ظٹ ط±ط³ط§ط¦ظ„ ط¨ط¹ط¯ ط£ظ† ظ‚ظ…طھ ط¨ط­ط¸ط±ظ‡",
    "Impersonating an employee or support agent": "ط§ظ†طھط­ط§ظ„ ط´ط®طµظٹط© ظ…ظˆط¸ظپ ط£ظˆ ظˆظƒظٹظ„ ط¯ط¹ظ…",
    "Impersonating me or someone I know": "ط§ظ†طھط­ط§ظ„ ط´ط®طµظٹطھظٹ ط£ظˆ ط´ط®طµظٹط© ط´ط®طµ ط£ط¹ط±ظپظ‡",

    "Impersonating a celebrity or public figure": "ط§ظ†طھط­ط§ظ„ ط´ط®طµظٹط© ظ…ط´ظ‡ظˆط± ط£ظˆ ط´ط®طµظٹط© ط¹ط§ظ…ط©",
    "Impersonating a business or organization": "ط§ظ†طھط­ط§ظ„ ط´ط®طµظٹط© ط´ط±ظƒط© ط£ظˆ ظ…ظ†ط¸ظ…ط©",
    "Scamming or defrauding": "ط§ظ„ط§ط­طھظٹط§ظ„ ط£ظˆ ط§ظ„ظ†طµط¨",

    "Hacks, cheats, phishing or malicious links": "ط§ط®طھط±ط§ظ‚ط§طھ ط£ظˆ ط؛ط´ ط£ظˆ طھطµظٹط¯ ط§ط­طھظٹط§ظ„ظٹ ط£ظˆ ط±ظˆط§ط¨ط· ط¶ط§ط±ط©",
    "Spreading misinformation or conspiracy theories": "ظ†ط´ط± ظ…ط¹ظ„ظˆظ…ط§طھ ظ…ط¶ظ„ظ„ط© ط£ظˆ ظ†ط¸ط±ظٹط§طھ ظ…ط¤ط§ظ…ط±ط©",
    "Celebrating or glorifying acts of violence": "ط§ظ„ط§ط­طھظپط§ظ„ ط£ظˆ طھظ…ط¬ظٹط¯ ط£ط¹ظ…ط§ظ„ ط§ظ„ط¹ظ†ظپ",
    "Promoting hate based on identity or vulnerability": "ط§ظ„طھط±ظˆظٹط¬ ظ„ظ„ظƒط±ط§ظ‡ظٹط© ط¨ظ†ط§ط،ظ‹ ط¹ظ„ظ‰ ط§ظ„ظ‡ظˆظٹط© ط£ظˆ ط§ظ„ط¶ط¹ظپ",
    "They are saying bad things about me or someone I know": "ظٹظ‚ظˆظ„ظˆظ† ط£ط´ظٹط§ط، ط³ظٹط¦ط© ط¹ظ†ظٹ ط£ظˆ ط¹ظ† ط´ط®طµ ط£ط¹ط±ظپظ‡",
    "Spreading fake news or harmful conspiracy theories": "ظ†ط´ط± ط£ط®ط¨ط§ط± ظƒط§ط°ط¨ط© ط£ظˆ ظ†ط¸ط±ظٹط§طھ ظ…ط¤ط§ظ…ط±ط© ط¶ط§ط±ط©",
    "Turo On Camera": "طھط´ط؛ظٹظ„ ط§ظ„ظƒط§ظ…ظٹط±ط§",
    "Share Your Screen": "ظ…ط´ط§ط±ظƒط© ط´ط§ط´طھظƒ",
    "Start An Activity": "ط¨ط¯ط، ظ†ط´ط§ط·",
    "Open Soundboard": "ظپطھط­ ظ„ظˆط­ط© ط§ظ„ط£طµظˆط§طھ",
    "Stop Streaming": "ط¥ظٹظ‚ط§ظپ ط§ظ„ط¨ط«",
    "Change Stream": "طھط؛ظٹظٹط± ط§ظ„ط¨ط«",
    "Stream Quality": "ط¬ظˆط¯ط© ط§ظ„ط¨ط«",
    "Share Stream Audio": "ظ…ط´ط§ط±ظƒط© طµظˆطھ ط§ظ„ط¨ط«",
    "Verbally harassing me or someone else": "ظ…ط¶ط§ظٹظ‚طھظٹ ط£ظˆ ظ…ط¶ط§ظٹظ‚ط© ط´ط®طµ ط¢ط®ط± ظ„ظپط¸ظٹط§ظ‹",
    "Using rude, vulgar, or offensive language": "ط§ط³طھط®ط¯ط§ظ… ظ„ط؛ط© ظپط¸ط© ط£ظˆ ط¨ط°ظٹط¦ط© ط£ظˆ ظ…ط³ظٹط¦ط©",
    "Explicit, graphic, or unwanted sexual content": "ظ…ط­طھظˆظ‰ ط¬ظ†ط³ظٹ طµط±ظٹط­ ط£ظˆ ط±ط³ظˆظ…ظٹ ط£ظˆ ط؛ظٹط± ظ…ط±ط؛ظˆط¨ ظپظٹظ‡",
    "Evading a ban or block with an alternate account": "طھط¬ط§ظˆط² ط§ظ„ط­ط¸ط± ط£ظˆ ط§ظ„ط­ط¬ط¨ ط¨ط§ط³طھط®ط¯ط§ظ… ط­ط³ط§ط¨ ط¨ط¯ظٹظ„",
    "Threatening violence or real world harm": "طھظ‡ط¯ظٹط¯ ط¨ط§ظ„ط¹ظ†ظپ ط£ظˆ ط§ظ„ط¶ط±ط± ظپظٹ ط§ظ„ط¹ط§ظ„ظ… ط§ظ„ط­ظ‚ظٹظ‚ظٹ",
    "Content targeting or involving a minor": "ظ…ط­طھظˆظ‰ ظٹط³طھظ‡ط¯ظپ ط£ظˆ ظٹط®طµ ظ‚ط§طµط±ط§ظ‹",
    "Gore, animal cruelty, or violent shock content": "ظ…ط­طھظˆظ‰ ط¯ظ…ظˆظٹ ط£ظˆ ط¹ظ†ظپ ط¶ط¯ ط§ظ„ط­ظٹظˆط§ظ†ط§طھ ط£ظˆ طµط§ط¯ظ…",
    "Unwanted adult sexual images": "طµظˆط± ط¬ظ†ط³ظٹط© ظ„ظ„ط¨ط§ظ„ط؛ظٹظ† ط؛ظٹط± ظ…ط±ط؛ظˆط¨ ظپظٹظ‡ط§",
    "Degrading adult pornography": "ظ…ظˆط§ط¯ ط¥ط¨ط§ط­ظٹط© ظ„ظ„ط¨ط§ظ„ط؛ظٹظ† ظ…ظ‡ظٹظ†ط©",
    "Revenge porn or a threat to share it": "ط§ظ†طھظ‚ط§ظ… ط¥ط¨ط§ط­ظٹ ط£ظˆ طھظ‡ط¯ظٹط¯ ط¨ظ…ط´ط§ط±ظƒطھظ‡",
    "Applications": "ط§ظ„طھط·ط¨ظٹظ‚ط§طھ",
    "This person is talking about minors in a sexual way": "ظ‡ط°ط§ ط§ظ„ط´ط®طµ ظٹطھط­ط¯ط« ط¹ظ† ط§ظ„ظ‚ط§طµط±ظٹظ† ط¨ط·ط±ظٹظ‚ط© ط¬ظ†ط³ظٹط©",
    "This person is sending suggestive or sexual messages to a minor": "ظٹظ‚ظˆظ… ظ‡ط°ط§ ط§ظ„ط´ط®طµ ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ ط¥ظٹط­ط§ط¦ظٹط© ط£ظˆ ط¬ظ†ط³ظٹط© ط¥ظ„ظ‰ ظ‚ط§طµط±",
    "A minor is posting or sending sexual messages": "ظ‚ط§طµط± ظٹظ†ط´ط± ط£ظˆ ظٹط±ط³ظ„ ط±ط³ط§ط¦ظ„ ط¬ظ†ط³ظٹط©",
    "Photos or videos depicting real world child sexual abuse": "ط§ظ„طµظˆط± ط£ظˆ ظ…ظ‚ط§ط·ط¹ ط§ظ„ظپظٹط¯ظٹظˆ ط§ظ„طھظٹ طھطµظˆط± ط§ظ„ط§ط¹طھط¯ط§ط، ط§ظ„ط¬ظ†ط³ظٹ ط¹ظ„ظ‰ ط§ظ„ط£ط·ظپط§ظ„ ظپظٹ ط§ظ„ط¹ط§ظ„ظ… ط§ظ„ط­ظ‚ظٹظ‚ظٹ",
    "Add Category": "ط¥ط¶ط§ظپط© ظپط¦ط©",
    "Pin": "طھط«ط¨ظٹطھ",
    "Pin DM's": "طھط«ط¨ظٹطھ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط©",
    "Entire Screen": "ط§ظ„ط´ط§ط´ط© ظƒط§ظ…ظ„ط©",
    "Threads": "ط§ظ„ظ…ط­ط§ط¯ط«ط§طھ ط§ظ„ظپط±ط¹ظٹط©",
    "Hide Member List": "ط¥ط®ظپط§ط، ظ‚ط§ط¦ظ…ط© ط§ظ„ط£ط¹ط¶ط§ط،",
    "Pin Channel to Top": "طھط«ط¨ظٹطھ ط§ظ„ظ‚ظ†ط§ط© ظپظٹ ط§ظ„ط£ط¹ظ„ظ‰",
    "Invite to Channel": "ط¯ط¹ظˆط© ط¥ظ„ظ‰ ط§ظ„ظ‚ظ†ط§ط©",
    "Update": "طھط­ط¯ظٹط«",
    "Online": "ظ…طھطµظ„",
    "Idle": "ط®ط§ظ…ظ„",
    "Do Not Disturb": "ظ…ط´ط؛ظˆظ„",
    "Invisible": "ط؛ظٹط± ظ…ط±ط¦ظٹ",
    "Offline": "ط؛ظٹط± ظ…طھطµظ„",
    "File": "ظ…ظ„ظپ",
    "Edit": "طھط­ط±ظٹط±",
    "Profiles": "ظ‚ط§ط¦ظ…ط© ط§ظ„ط¨ط±ظˆظپط§ظٹظ„",
    "Data & Privacy": "ط§ظ„ط¨ظٹط§ظ†ط§طھ ظˆط§ظ„ط®طµظˆطµظٹط©",
    "Family Center": "ظ…ط±ظƒط² ط§ظ„ط¹ط§ط¦ظ„ط©",
    "Devices": "ط§ظ„ط§ط¬ظ‡ط²ط© ط§ظ„ظ…ط±ط¨ظˆط·ظ‡ ظپظٹ ط­ط³ط§ط¨ظٹ",
    "Clips": "ظ…ظ‚ط§ط·ط¹ ط§ظ„ظپظٹط¯ظٹظˆ ط§ظ„ظ‚طµظٹط±ط©",
    "Nitro": "ط´ط±ط§ط، ظ†ظٹطھط±ظˆ",
    "View": "ط¹ط±ط¶",
    "Help": "ظ…ط³ط§ط¹ط¯ط©",
    "Content & Social": "ط§ظ„ظ…ط­طھظˆظ‰ ظˆظˆط³ط§ط¦ظ„ ط§ظ„طھظˆط§طµظ„",
    "Bio": "ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "Custom Status": "ط§ظ„ط­ط§ظ„ط© ط§ظ„ظ…ط®طµطµط©",
    "Server Boost": "ط§ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¨ظˆط³طھ",
    "Subscriptions": "ط£ط´طھط±ظƒط§طھ ط§ظ„ظ†ظٹطھط±ظˆ",
    "Integrations": "ط§ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¨ظˆطھط§طھ",
    "Permissions": "ظ‚ط§ط¦ظ…ط© ط§ظ„طµظ„ط§ط­ظٹط§طھ",
    "Channel Topic": "ظ…ظˆط¶ظˆط¹ ط§ظ„ظ‚ظ†ط§ط©",
    "Overview": "ظ†ط¸ط±ط© ط¹ط§ظ…ط©",
    "Roles": "ط±ظˆظ„ط§طھ ط§ظ„ط³ظٹط±ظپط±",
    "Members": "ط§ظ„ط£ط¹ط¶ط§ط،",
    "Kick": "ط·ط±ط¯",
    "Ban": "ط­ط¸ط±",
    "Mention @everyone when a Stage starts": "ط°ظƒط± @everyone ط¹ظ†ط¯ ط¨ط¯ط، ط§ظ„ظ€Stage",
    "Allow Stage Moderators with this role to notify @everyone when a Stage starts. This is the same permission as Mention @everyone, @here, and All Roles.": "ظٹط³ظ…ط­ ظ„ظ…ط´ط±ظپظٹ ط§ظ„ظ€Stage ط§ظ„ط°ظٹظ† ظ„ط¯ظٹظ‡ظ… ظ‡ط°ط§ ط§ظ„ط¯ظˆط± ط¨طھظ†ط¨ظٹظ‡ @everyone ط¹ظ†ط¯ ط¨ط¯ط، ط§ظ„ظ€Stage. ظ‡ط°ط§ ظ†ظپط³ ط§ظ„ط¥ط°ظ† ط§ظ„ظ…ط®طµطµ ظ„ط°ظƒط± @everyone ظˆ @here ظˆط¬ظ…ظٹط¹ ط§ظ„ط£ط¯ظˆط§ط±.",
    "Theme": "ط§ظ„ظ…ط¸ظ‡ط±",
    "Dark": "ط¯ط§ظƒظ†",
    "Light": "ظپط§طھط­",
    "Sync with computer": "ظ…ط²ط§ظ…ظ†ط© ظ…ط¹ ط§ظ„ظƒظ…ط¨ظٹظˆطھط±",
    "Developer Options": "ط®ظٹط§ط±ط§طھ ط§ظ„ظ…ط·ظˆط±",
    "Advanced": "ظ…طھظ‚ط¯ظ…",
    "Input Device": "ط¬ظ‡ط§ط² ط§ظ„ط¥ط¯ط®ط§ظ„",
    "Output Device": "ط¬ظ‡ط§ط² ط§ظ„ط¥ط®ط±ط§ط¬",
    "Input Volume": "ظ…ط³طھظˆظ‰ ط§ظ„طµظˆطھ ظ„ظ„ط¥ط¯ط®ط§ظ„",
    "Output Volume": "ظ…ط³طھظˆظ‰ ط§ظ„طµظˆطھ ظ„ظ„ط¥ط®ط±ط§ط¬",
    "Enable Desktop Notifications": "طھظپط¹ظٹظ„ ط¥ط´ط¹ط§ط±ط§طھ ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨",
    "Enable Push Notifications": "طھظپط¹ظٹظ„ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ظ…ظ†ط¨ط«ظ‚ط©",
    "Enable Taskbar Flashing": "طھظپط¹ظٹظ„ ظˆظ…ظٹط¶ ط´ط±ظٹط· ط§ظ„ظ…ظ‡ط§ظ…",
    "Reason for Ban": "ط³ط¨ط¨ ط§ظ„ط­ط¸ط±",
    "Suspicious or spam account": "ط­ط³ط§ط¨ ظ…ط´ط¨ظˆظ‡ ط£ظˆ ط³ط¨ط§ظ…",
    "Compromised or hacked account": "ط­ط³ط§ط¨ ظ…ط®طھط±ظ‚ ط£ظˆ طھظ… ط§ط®طھط±ط§ظ‚ظ‡",
    "Breaking server rules": "ظ…ط®ط§ظ„ظپط© ظ‚ظˆط§ط¹ط¯ ط§ظ„ط³ظٹط±ظپط±",
    "Other": "ط£ط®ط±ظ‰",
    "Delete Message History": "ط­ط°ظپ ط³ط¬ظ„ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Don't Delete Any": "ط­ط¸ط± ظ†ظ‡ط§ط¦ظٹ",
    "Previous Hour": "ط­ط¸ط± ظ„ظ…ط¯ط© ط³ط§ط¹ط©",
    "Previous 6 Hours": "ط­ط¸ط± ظ„ظ…ط¯ط© ط³طھط© ط³ط§ط¹ط§طھ",
    "Previous 12 Hours": "ط­ط¸ط± ظ„ظ…ط¯ط© 12 ط³ط§ط¹ظ‡",
    "Previous 24 Hours": "ط­ط¸ط± ظ„ظ…ط¯ط© 24 ط³ط§ط¹ط©",
    "Previous 3 Days": "ط­ط¸ط± ظ„ظ…ط¯ط© 3 ط§ظٹط§ظ…",
    "Invite People": "ط£ط±ط³ط§ظ„ ط¯ط¹ظˆط© ظ…ط¬طھظ…ط¹",
    "PEOPLE": "ط§ط¯ط¹ط¯ط§ط¯طھ ط§ظ„ط¹ط§ظ…ط©",
    "User Volume": "ظ…ط³طھظˆظ‰ طµظˆطھ ط§ظ„ظ…ط³طھط®ط¯ظ…",
    "Mute": "ظƒطھظ… ط§ظ„طµظˆطھ",
    "Main Profile": "ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ ط§ظ„ط±ط¦ظٹط³ظٹ",
    "Per-server Profiles": "ظ…ظ„ظپط§طھ ط´ط®طµظٹط© ظ„ظƒظ„ ط³ظٹط±ظپط±",
    "Display Name": "ط§ط³ظ… ط§ظ„ط¹ط±ط¶",
    "Pronouns": "ط§ظ„ط¶ظ…ط§ط¦ط±",
    "Avatar": "ط§ظ„طµظˆط±ط© ط§ظ„ط±ظ…ط²ظٹط©",
    "Change Avatar": "طھط؛ظٹظٹط± ط§ظ„طµظˆط±ط© ط§ظ„ط±ظ…ط²ظٹط©",
    "Remove Avatar": "ط¥ط²ط§ظ„ط©",
    "Security": "Security VI",
    "Standing": "ط§ظ„ظˆط¶ط¹ ط§ظ„ط­ط§ظ„ظٹ",
    "Content": "ط§ظ„ظ…ط­طھظˆظ‰",
    "Sensitive content filters": "ظپظ„طھط± ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„ط­ط³ط§ط³",
    "Direct Message spam": "ط±ط³ط§ط¦ظ„ ظ…ط¨ط§ط´ط±ط© ظ…ط²ط¹ط¬ط©",
    "Filter all": "طھطµظپظٹط© ط§ظ„ظƒظ„",
    "All DMs will be filtered for spam": "ط³ظٹطھظ… طھطµظپظٹط© ط¬ظ…ظٹط¹ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظ„ظ„ظƒط´ظپ ط¹ظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط²ط¹ط¬ط©",
    "Filter from non-friends": "طھطµظپظٹط© ظ…ظ† ط؛ظٹط± ط§ظ„ط£طµط¯ظ‚ط§ط،",
    "DMs from non-friends will be filtered for spam": "ط³ظٹطھظ… طھطµظپظٹط© ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظ…ظ† ط؛ظٹط± ط§ظ„ط£طµط¯ظ‚ط§ط، ظ„ظ„ظƒط´ظپ ط¹ظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط²ط¹ط¬ط©",
    "Do not filter": "ط¹ط¯ظ… ط§ظ„طھطµظپظٹط©",
    "DMs will not be filtered for spam": "ظ„ظ† ظٹطھظ… طھطµظپظٹط© ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظ„ظ„ظƒط´ظپ ط¹ظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط²ط¹ط¬ط©",
    "Allow access to age-restricted commands from apps in Direct Messages": "ط§ظ„ط³ظ…ط§ط­ ط¨ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ ط§ظ„ط£ظˆط§ظ…ط± ط§ظ„ظ…ظ‚ظٹط¯ط© ط¨ط§ظ„ط¹ظ…ط± ظ…ظ† ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ظپظٹ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط©",
    "This setting applies to all apps. Allows people 18+ to access commands marked as age-restricted in DMs": "ظٹظ†ط·ط¨ظ‚ ظ‡ط°ط§ ط§ظ„ط¥ط¹ط¯ط§ط¯ ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„طھط·ط¨ظٹظ‚ط§طھ. ظٹط³ظ…ط­ ظ„ظ„ط£ط´ط®ط§طµ ظپظˆظ‚ 18 ط¹ط§ظ…ظ‹ط§ ط¨ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ ط§ظ„ط£ظˆط§ظ…ط± ط§ظ„ظ…ط­ط¯ط¯ط© ظƒظ…ظ‚ظٹط¯ط© ط¨ط§ظ„ط¹ظ…ط± ظپظٹ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط©",
    "Allow access to age-restricted servers on iOS": "ط§ظ„ط³ظ…ط§ط­ ط¨ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ ط§ظ„ط³ظٹط±ظپط±ط§طھ ط§ظ„ظ…ظ‚ظٹط¯ط© ط¨ط§ظ„ط¹ظ…ط± ط¹ظ„ظ‰ ط£ط¬ظ‡ط²ط© iOS",
    "After joining on desktop, view your servers for people 18+ on iOS devices": "ط¨ط¹ط¯ ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ظ…ظ† ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨طŒ ظٹظ…ظƒظ†ظƒ ط¹ط±ط¶ ط§ظ„ط³ظٹط±ظپط±ط§طھ ط§ظ„ظ…ط®طµطµط© ظ„ظ„ط£ط´ط®ط§طµ ظپظˆظ‚ 18 ط¹ط§ظ…ظ‹ط§ ط¹ظ„ظ‰ ط£ط¬ظ‡ط²ط© iOS",
    "Social permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„طھظˆط§طµظ„ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹ",
    "Direct Messages": "ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط©",
    "Allow DMs from other server members": "ط§ظ„ط³ظ…ط§ط­ ط¨ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظ…ظ† ط£ط¹ط¶ط§ط، ط§ظ„ط³ظٹط±ظپط± ط§ظ„ط¢ط®ط±ظٹظ†",
    "Message requests": "ط·ظ„ط¨ط§طھ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Filter messages from server members you may not know": "طھطµظپظٹط© ط§ظ„ط±ط³ط§ط¦ظ„ ظ…ظ† ط£ط¹ط¶ط§ط، ط§ظ„ط³ظٹط±ظپط± ط§ظ„ط°ظٹظ† ظ‚ط¯ ظ„ط§ طھط¹ط±ظپظ‡ظ…",
    "Friend requests": " ",
    "Everyone": "ط§ظ„ط¬ظ…ظٹط¹",
    "Friend of friends": "ط£طµط¯ظ‚ط§ط، ط§ظ„ط£طµط¯ظ‚ط§ط،",
    "Server members": "ط£ط¹ط¶ط§ط، ط§ظ„ط³ظٹط±ظپط±",
    "Accounts you've blocked or ignored": "ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„طھظٹ ظ‚ظ…طھ ط¨ط­ط¸ط±ظ‡ط§ ط£ظˆ طھط¬ط§ظ‡ظ„ظ‡ط§",
    "Avatar Decoration": "ط²ظٹظ†ط© ط§ظ„طµظˆط±ط© ط§ظ„ط±ظ…ط²ظٹط©",
    "Change Decoration": "طھط؛ظٹظٹط± ط§ظ„ط²ظٹظ†ط©",
    "Nameplate": "ظ„ظˆط­ط© ط§ظ„ط§ط³ظ…",
    "Change Nameplate": "طھط£ط«ظٹط±",
    "Profile Effect": "طھط£ط«ظٹط± ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ",
    "Change Effect": "طھط؛ظٹظٹط± ط§ظ„طھط£ط«ظٹط±",
    "Profile Banner": "ط¨ط§ظ†ط± ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ",
    "Change Banner": "طھط؛ظٹظٹط± ط§ظ„ط¨ط§ظ†ط±",
    "Remove Banner": "ط¥ط²ط§ظ„ط©",
    "Password and Authentication": "ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط± ظˆط§ظ„ظ…طµط§ط¯ظ‚ط©",
    "Multi-Factor Authentication enabled": "طھظ… طھظپط¹ظٹظ„ ط§ظ„ظ…طµط§ط¯ظ‚ط© ظ…طھط¹ط¯ط¯ط© ط§ظ„ط¹ظˆط§ظ…ظ„",
    "Authenticator App": "طھط·ط¨ظٹظ‚ ط§ظ„ظ…طµط§ط¯ظ‚ط©",
    "Configuring an authenticator app is a good way to add an extra layer of security to your Discord account to make sure that only you have the ability to log in.": "طھظƒظˆظٹظ† طھط·ط¨ظٹظ‚ ط§ظ„ظ…طµط§ط¯ظ‚ط© ط·ط±ظٹظ‚ط© ط¬ظٹط¯ط© ظ„ط¥ط¶ط§ظپط© ط·ط¨ظ‚ط© ط£ظ…ط§ظ† ط¥ط¶ط§ظپظٹط© ظ„ط­ط³ط§ط¨ظƒ ظپظٹ Discord ظ„ط¶ظ…ط§ظ† ط£ظ† ظ„ط¯ظٹظƒ ظˆط­ط¯ظƒ ط§ظ„ظ‚ط¯ط±ط© ط¹ظ„ظ‰ طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„.",
    "SMS Backup Authentication": "ط§ظ„ظ…طµط§ط¯ظ‚ط© ط§ظ„ط§ط­طھظٹط§ط·ظٹط© ط¹ط¨ط± ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ‚طµظٹط±ط©",
    "Add your phone as a backup MFA method in case you lose access to your authenticator app or backup codes.": "ط£ط¶ظپ ظ‡ط§طھظپظƒ ظƒط·ط±ظٹظ‚ط© ط§ط­طھظٹط§ط·ظٹط© ظ„ظ„ظ…طµط§ط¯ظ‚ط© ظ…طھط¹ط¯ط¯ط© ط§ظ„ط¹ظˆط§ظ…ظ„ ظپظٹ ط­ط§ظ„ ظپظ‚ط¯طھ ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ طھط·ط¨ظٹظ‚ ط§ظ„ظ…طµط§ط¯ظ‚ط© ط£ظˆ ط±ظ…ظˆط² ط§ظ„ظ†ط³ط® ط§ظ„ط§ط­طھظٹط§ط·ظٹ.",
    "Your current phone number is:": "ط±ظ‚ظ… ظ‡ط§طھظپظƒ ط§ظ„ط­ط§ظ„ظٹ ظ‡ظˆ:",
    "Security Keys": "ظ…ظپط§طھظٹط­ ط§ظ„ط£ظ…ط§ظ†",
    "Add an additional layer of protection to your account with a Security Key.": "ط£ط¶ظپ ط·ط¨ظ‚ط© ط­ظ…ط§ظٹط© ط¥ط¶ط§ظپظٹط© ظ„ط­ط³ط§ط¨ظƒ ط¨ط§ط³طھط®ط¯ط§ظ… ظ…ظپطھط§ط­ ط£ظ…ط§ظ†.",
    "Account Removal": "ط­ط°ظپ ط§ظ„ط­ط³ط§ط¨",
    "Disabling your account means you can recover it at any time after taking this action.": "طھط¹ط·ظٹظ„ ط­ط³ط§ط¨ظƒ ظٹط¹ظ†ظٹ ط£ظ†ظ‡ ظٹظ…ظƒظ†ظƒ ط§ط³طھط¹ط§ط¯طھظ‡ ظپظٹ ط£ظٹ ظˆظ‚طھ ط¨ط¹ط¯ ط§طھط®ط§ط° ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط،.",
    "Mute Soundboard": "ظƒطھظ… ظ„ظˆط­ط© ط§ظ„طµظˆطھ",
    "Disable Video": "طھط¹ط·ظٹظ„ ط§ظ„ظپظٹط¯ظٹظˆ",
    "Change Nickname": "طھط؛ظٹظٹط± ط§ظ„ط§ط³ظ… ط§ظ„ظ…ط³طھط¹ط§ط±",
    "Server Settings": "ط£ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ط¬طھظ…ط¹",
    "Create Channel": "ط¥ظ†ط´ط§ط، ظ‚ظ†ط§ط©",
    "Create Category": "ط¥ظ†ط´ط§ط، ظ…ط¬ظ„ط¯",
    "Create Event": "ط¥ظ†ط´ط§ط، ط­ط¯ط«",
    "Active Threads": "ط§ظ„ظ…ط­ط§ط¯ط«ط§طھ ط§ظ„ظ†ط´ط·ط©",
    "App Directory": "ط¯ظ„ظٹظ„ ط§ظ„طھط·ط¨ظٹظ‚ط§طھ",
    "Privacy Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط®طµظˆطµظٹط©",
    "Edit Per-server Profile": "طھط¹ط¯ظٹظ„ ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ ظ„ظƒظ„ ط³ظٹط±ظپط±",
    "Hide Muted Channels": "ط¥ط®ظپط§ط، ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„ظ…ظƒطھظˆظ…ط©",
    "Leave Server": "ظ…ط؛ط§ط¯ط±ط© ط§ظ„ظ…ط¬طھظ…ط¹",
    "Server Insights": "ط¥ط­طµط§ط،ط§طھ ط§ظ„ط³ظٹط±ظپط±",
    "Show All Channels": "ط£ط¸ظ‡ط§ط± ط§ظ„ط±ظˆظ…ط§طھ ط§ظ„ظ…ط®ظپظٹط©",
    "Server Profile": "ظ…ظ„ظپ ط§ظ„ط³ظٹط±ظپط±",
    "Server Tag": "ط¹ظ„ط§ظ…ط© ط§ظ„ط³ظٹط±ظپط±",
    "Engagement": "ط§ظ„طھظپط§ط¹ظ„",
    "Boost Perks": "ظ…ظ…ظٹط²ط§طھ ط§ظ„ط¨ظˆط³طھ",
    "EXPRESSION": "ط§ظ„طھط¹ط¨ظٹط±ط§طھ",
    "Emoji": "ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط©",
    "Stickers": "ط§ظ„ظ…ظ„طµظ‚ط§طھ",
    "Soundboard": "ظ„ظˆط­ط© ط§ظ„طµظˆطھ",
    "Server Template": "ظ‚ط§ظ„ط¨ ط§ظ„ط³ظٹط±ظپط±",
    "Saturation": "ط§ظ„طھط´ط¨ط¹",
    "Reduce the saturation of colors within the application, for those with color sensitivities. This does not affect the saturation of images, videos, role colors or other user-provided content by default.": "طھظ‚ظ„ظٹظ„ طھط´ط¨ط¹ ط§ظ„ط£ظ„ظˆط§ظ† ط¯ط§ط®ظ„ ط§ظ„طھط·ط¨ظٹظ‚ ظ„ظ„ط£ط´ط®ط§طµ ط°ظˆظٹ ط§ظ„ط­ط³ط§ط³ظٹط© طھط¬ط§ظ‡ ط§ظ„ط£ظ„ظˆط§ظ†. ظ‡ط°ط§ ظ„ط§ ظٹط¤ط«ط± ط¹ظ„ظ‰ طھط´ط¨ط¹ ط§ظ„طµظˆط± ط£ظˆ ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ ط£ظˆ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط± ط£ظˆ ط£ظٹ ظ…ط­طھظˆظ‰ ظٹظ‚ط¯ظ…ظ‡ ط§ظ„ظ…ط³طھط®ط¯ظ… ط¨ط´ظƒظ„ ط§ظپطھط±ط§ط¶ظٹ.",
    "Apply to custom color choices": "طھط·ط¨ظٹظ‚ ط¹ظ„ظ‰ ط®ظٹط§ط±ط§طھ ط§ظ„ط£ظ„ظˆط§ظ† ط§ظ„ظ…ط®طµطµط©",
    "Turn on to apply this adjustment to custom color choices, like role colors": "ظ‚ظ… ط¨طھظپط¹ظٹظ„ ظ‡ط°ط§ ظ„طھط·ط¨ظٹظ‚ ظ‡ط°ط§ ط§ظ„طھط¹ط¯ظٹظ„ ط¹ظ„ظ‰ ط®ظٹط§ط±ط§طھ ط§ظ„ط£ظ„ظˆط§ظ† ط§ظ„ظ…ط®طµطµط©طŒ ظ…ط«ظ„ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط±",
    "Always underline links": "ط¯ط§ط¦ظ…ط§ظ‹ ط¶ط¹ ط®ط·ط§ظ‹ طھط­طھ ط§ظ„ط±ظˆط§ط¨ط·",
    "Make links to websites, help articles, and other pages stand out more by underlining them.": "ط§ط¬ط¹ظ„ ط§ظ„ط±ظˆط§ط¨ط· ط¥ظ„ظ‰ ط§ظ„ظ…ظˆط§ظ‚ط¹ ظˆط§ظ„ظ…ظ‚ط§ظ„ط§طھ ط§ظ„ط¥ط±ط´ط§ط¯ظٹط© ظˆط§ظ„طµظپط­ط§طھ ط§ظ„ط£ط®ط±ظ‰ ط£ظƒط«ط± ظˆط¶ظˆط­ط§ظ‹ ط¹ظ† ط·ط±ظٹظ‚ ظˆط¶ط¹ ط®ط· طھط­طھظ‡ط§.",
    "Role Colors": "ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط±",
    "Choose a display for role colors.": "ط§ط®طھط± ط·ط±ظٹظ‚ط© ط¹ط±ط¶ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط±.",
    "Show role colors in names": "ط¹ط±ط¶ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط± ظپظٹ ط§ظ„ط£ط³ظ…ط§ط،",
    "Show role colors next to names": "ط¹ط±ط¶ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط± ط¨ط¬ط§ظ†ط¨ ط§ظ„ط£ط³ظ…ط§ط،",
    "Don't show role colors": "ط¹ط¯ظ… ط¹ط±ط¶ ط£ظ„ظˆط§ظ† ط§ظ„ط£ط¯ظˆط§ط±",
    "Profile Colors": "ط£ظ„ظˆط§ظ† ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ",
    "Sync profile themes": "ظ…ط²ط§ظ…ظ†ط© ط³ظ…ط§طھ ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ",
    "Enable Reduced Motion": "طھظ…ظƒظٹظ† طھظ‚ظ„ظٹظ„ ط§ظ„ط­ط±ظƒط©",
    "Automatically play GIFs when Discord is focused.": "طھط´ط؛ظٹظ„ ظ…ظ„ظپط§طھ GIF طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¹ظ†ط¯ طھط±ظƒظٹط² Discord.",
    "Play animated emoji": "طھط´ط؛ظٹظ„ ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط© ط§ظ„ظ…طھط­ط±ظƒط©",
    "This controls when stickers animate.": "ظ‡ط°ط§ ظٹطھط­ظƒظ… ظپظٹ ظˆظ‚طھ طھط­ط±ظٹظƒ ط§ظ„ظ…ظ„طµظ‚ط§طھ.",
    "Always animate": "طھط­ط±ظٹظƒ ط¯ط§ط¦ظ…ظ‹ط§",
    "Animate on interaction": "طھط­ط±ظٹظƒ ط¹ظ†ط¯ ط§ظ„طھظپط§ط¹ظ„",
    "On the desktop client, stickers will animate on hover or focus. On mobile clients, stickers will animate on long-press.": "ظپظٹ طھط·ط¨ظٹظ‚ ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨طŒ طھطھط­ط±ظƒ ط§ظ„ظ…ظ„طµظ‚ط§طھ ط¹ظ†ط¯ ط§ظ„ظ…ط±ظˆط± ظپظˆظ‚ظ‡ط§ ط£ظˆ ط§ظ„طھط±ظƒظٹط² ط¹ظ„ظٹظ‡ط§. ظپظٹ طھط·ط¨ظٹظ‚ط§طھ ط§ظ„ظ‡ط§طھظپطŒ طھطھط­ط±ظƒ ط¹ظ†ط¯ ط§ظ„ط¶ط؛ط· ط§ظ„ظ…ط·ظˆظ„.",
    "Never animate": "ط¹ط¯ظ… ط§ظ„طھط­ط±ظٹظƒ ط£ط¨ط¯ظ‹ط§",
    "Chat Input": "ط¥ط¯ط®ط§ظ„ ط§ظ„ط¯ط±ط¯ط´ط©",
    "Show Send Message button": "ط¹ط±ط¶ ط²ط± ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Use the legacy chat input": "ط§ط³طھط®ط¯ط§ظ… ط¥ط¯ط®ط§ظ„ ط§ظ„ط¯ط±ط¯ط´ط© ط§ظ„ظ‚ط¯ظٹظ…",
    "Disables most chat features but may work better with screen readers": "طھط¹ط·ظٹظ„ ظ…ط¹ط¸ظ… ظ…ظٹط²ط§طھ ط§ظ„ط¯ط±ط¯ط´ط© ظˆظ„ظƒظ† ظ‚ط¯ ظٹط¹ظ…ظ„ ط¨ط´ظƒظ„ ط£ظپط¶ظ„ ظ…ط¹ ظ‚ط§ط±ط¦ط§طھ ط§ظ„ط´ط§ط´ط©",
    "Text-to-Speech": "ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ…",
    "Allow playback and usage of /tts command": "ط§ظ„ط³ظ…ط§ط­ ط¨طھط´ط؛ظٹظ„ ظˆط§ط³طھط®ط¯ط§ظ… ط£ظ…ط± /tts",
    "Text-to-Speech rate": "ظ…ط¹ط¯ظ„ ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ…",
    "Contrast": "ط§ظ„طھط¨ط§ظٹظ†",
    "Sync contrast settings": "ظ…ط²ط§ظ…ظ†ط© ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„طھط¨ط§ظٹظ†",
    "Reduced Motion": "طھظ‚ظ„ظٹظ„ ط§ظ„ط­ط±ظƒط©",
    "Input Profile": "ظ…ظ„ظپ ط§ظ„ط¥ط¯ط®ط§ظ„",
    "Voice Isolation": "ط¹ط²ظ„ ط§ظ„طµظˆطھ",
    "Just your beautiful voice: let Discord cut through the noise": "طµظˆطھظƒ ط§ظ„ط¬ظ…ظٹظ„ ظپظ‚ط·: ط¯ط¹ Discord ظٹط²ظٹظ„ ط§ظ„ط¶ظˆط¶ط§ط،",
    "Studio": "ط§ط³طھظˆط¯ظٹظˆ",
    "Pure audio: open mic with no processing": "طµظˆطھ ظ†ظ‚ظٹ: ظ…ظٹظƒط±ظˆظپظˆظ† ظ…ظپطھظˆط­ ط¨ط¯ظˆظ† ظ…ط¹ط§ظ„ط¬ط©",
    "Custom": "ظ…ط®طµطµ",
    "Advanced mode: give me all the buttons and dials!": "ط§ظ„ظˆط¶ط¹ ط§ظ„ظ…طھظ‚ط¯ظ…: ط£ط¹ط·ظ†ظٹ ظƒظ„ ط§ظ„ط£ط²ط±ط§ط± ظˆط§ظ„طھط­ظƒظ…ط§طھ!",
    "Input Mode": "ظˆط¶ط¹ ط§ظ„ط¥ط¯ط®ط§ظ„",
    "Voice Activity": "ظ†ط´ط§ط· ط§ظ„طµظˆطھ",
    "Push to Talk": "ط§ط¶ط؛ط· ظ„ظ„طھط­ط¯ط«",
    "Input Sensitivity": "ط­ط³ط§ط³ظٹط© ط§ظ„ط¥ط¯ط®ط§ظ„",
    "Automatically determine input sensitivity": "طھط­ط¯ظٹط¯ ط­ط³ط§ط³ظٹط© ط§ظ„ط¥ط¯ط®ط§ظ„ طھظ„ظ‚ط§ط¦ظٹظ‹ط§",
    "If the indicator is solid green then Discord is transmitting your beautiful voice.": "ط¥ط°ط§ ظƒط§ظ† ط§ظ„ظ…ط¤ط´ط± ط£ط®ط¶ط± ط«ط§ط¨طھ ظپظ‡ط°ط§ ظٹط¹ظ†ظٹ ط£ظ† Discord ظٹظ†ظ‚ظ„ طµظˆطھظƒ ط§ظ„ط¬ظ…ظٹظ„.",
    "Voice Processing": "ظ…ط¹ط§ظ„ط¬ط© ط§ظ„طµظˆطھ",
    "Echo Cancellation": "ط¥ظ„ط؛ط§ط، ط§ظ„طµط¯ظ‰",
    "Channel Name": "ط£ط³ظ… ط§ظ„ط±ظˆظ…",
    "Use permissions to customize who can do what in this channel.": "ط§ط³طھط®ط¯ظ… ط§ظ„ط£ط°ظˆظ†ط§طھ ظ„طھط®طµظٹطµ ظ…ظ† ظٹظ…ظƒظ†ظ‡ ظپط¹ظ„ ظ…ط§ط°ط§ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Channel Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ظ‚ظ†ط§ط©",
    "Advanced permissions": "",
    "Allows members to view this channel by default. Disabling this for @everyone will make this channel private.": "ط³ظٹطµط¨ط­ ط§ظ„ظ‚ظ†ط§ط© ط®ط§طµط© ط¹ظ†ط¯ طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط®ظٹط§ط±طŒ ظˆظ„ظ† ظٹطھظ…ظƒظ† ط£ظٹ ط´ط®طµ ظ…ظ† ط±ط¤ظٹط© ظ…ط­طھظˆظ‰ ط§ظ„ط±ظˆظ… ط£ظˆ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©.",
    "Stickers can be static (JPG, PNG) or animated (APNG, GIF). Stickers must be exactly 320 x 320 pixels and no larger than 512KB. We will automatically resize static JPG, PNG and animated GIF stickers for you.": "ظٹظ…ظƒظ† ط£ظ† طھظƒظˆظ† ط§ظ„ظ…ظ„طµظ‚ط§طھ ط«ط§ط¨طھط© (JPG, PNG) ط£ظˆ ظ…طھط­ط±ظƒط© (APNG, GIF). ظٹط¬ط¨ ط£ظ† طھظƒظˆظ† ط§ظ„ظ…ظ„طµظ‚ط§طھ ط¨ظ…ظ‚ط§ط³ 320 أ— 320 ط¨ظƒط³ظ„ ظˆط¨ط­ط¬ظ… ظ„ط§ ظٹطھط¬ط§ظˆط² 512 ظƒظٹظ„ظˆط¨ط§ظٹطھ. ط³ظ†ظ‚ظˆظ… طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¨طھط؛ظٹظٹط± ط­ط¬ظ… ط§ظ„ظ…ظ„طµظ‚ط§طھ ط§ظ„ط«ط§ط¨طھط© JPG, PNG ظˆط§ظ„ظ…طھط¬ط±ظƒط© GIF ظ…ظ† ط£ط¬ظ„ظƒ.",
    "Delete Channel": "ط­ط°ظپ ط§ظ„ط±ظˆظ…",
    "Add Friend": "ط£ط¶ط§ظپط© طµط¯ظٹظ‚ ط¬ط¯ظٹط¯",
    "Remove Reactions": "ط­ط°ظپ ط§ظ„ط±ظٹط§ظƒط´ظ†",
    "Remove All Reactions": "ط­ط°ظپ ط¬ظ…ظٹط¹ ط§ظ„ط±ظٹط§ظƒط´ظ†",
    "Upload custom sound reactions that anyone in this server can use. Nitro members will be able to access these sounds in any server on Discord.": "ظ‚ظ… ط¨ط±ظپط¹ ط±ط¯ظˆط¯ ط£ظپط¹ط§ظ„ طµظˆطھظٹط© ظ…ط®طµطµط© ظٹظ…ظƒظ† ظ„ط£ظٹ ط´ط®طµ ظپظٹ ظ‡ط°ط§ ط§ظ„ط®ط§ط¯ظ… ط§ط³طھط®ط¯ط§ظ…ظ‡ط§. ط³ظٹطھظ…ظƒظ† ط£ط¹ط¶ط§ط، Nitro ظ…ظ† ط§ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„ط£طµظˆط§طھ ظپظٹ ط£ظٹ ط®ط§ط¯ظ… ط¹ظ„ظ‰ ط¯ظٹط³ظƒظˆط±ط¯.",
    "Manage settings that help keep your server active.": "ط¥ط¯ط§ط±ط© ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„طھظٹ طھط³ط§ط¹ط¯ ظپظٹ ط§ظ„ط­ظپط§ط¸ ط¹ظ„ظ‰ ظ†ط´ط§ط· ط³ظٹط±ظپط±ظƒ.",
    "System Messages": "ط±ط³ط§ط¦ظ„ ط§ظ„ظ†ط¸ط§ظ…",
    "Configure system event messages sent to your server.": "طھظƒظˆظٹظ† ط±ط³ط§ط¦ظ„ ط£ط­ط¯ط§ط« ط§ظ„ظ†ط¸ط§ظ… ط§ظ„ظ…ط±ط³ظ„ط© ط¥ظ„ظ‰ ط³ظٹط±ظپط±ظƒ.",
    "Send a random welcome message when someone joins this server.": "ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© طھط±ط­ظٹط¨ ط¹ط´ظˆط§ط¦ظٹط© ط¹ظ†ط¯ ط§ظ†ط¶ظ…ط§ظ… ط´ط®طµ ظ…ط§ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±.",
    "Prompt members to reply to welcome messages with a sticker.": "ط­ط« ط§ظ„ط£ط¹ط¶ط§ط، ط¹ظ„ظ‰ ط§ظ„ط±ط¯ ط¹ظ„ظ‰ ط±ط³ط§ط¦ظ„ ط§ظ„طھط±ط­ظٹط¨ ط¨ط§ط³طھط®ط¯ط§ظ… ظ…ظ„طµظ‚.",
    "Send a message when someone boosts this server.": "ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ط¹ظ†ط¯ ظ‚ظٹط§ظ… ط´ط®طµ ظ…ط§ ط¨ط¯ط¹ظ… ط§ظ„ط³ظٹط±ظپط±.",
    "Send helpful tips for server setup.": "ط¥ط±ط³ط§ظ„ ظ†طµط§ط¦ط­ ظ…ظپظٹط¯ط© ظ„ط¥ط¹ط¯ط§ط¯ ط§ظ„ط³ظٹط±ظپط±.",
    "System Messages Channel": "ظ‚ظ†ط§ط© ط±ط³ط§ط¦ظ„ ط§ظ„ظ†ط¸ط§ظ…",
    "This is the channel we send system event messages to.": "ظ‡ط°ظ‡ ظ‡ظٹ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طھظٹ ظ†ط±ط³ظ„ ط¥ظ„ظٹظ‡ط§ ط±ط³ط§ط¦ظ„ ط£ط­ط¯ط§ط« ط§ظ„ظ†ط¸ط§ظ….",
    "Activity Feed Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ظ…ظˆط¬ط² ط§ظ„ظ†ط´ط§ط·",
    "Shows a feed of activity from games and connected apps in this server.": "ظٹط¹ط±ط¶ ظ…ظˆط¬ط²ظ‹ط§ ظ„ظ„ظ†ط´ط§ط· ظ…ظ† ط§ظ„ط£ظ„ط¹ط§ط¨ ظˆط§ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„ظ…طھطµظ„ط© ظپظٹ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±.",
    "Display Activity Feed in this server": "ط¹ط±ط¶ ظ…ظˆط¬ط² ط§ظ„ظ†ط´ط§ط· ظپظٹ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±",
    "Default Notification Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ط§ظپطھط±ط§ط¶ظٹط©",
    "This will determine whether members who have not explicitly set their notification settings receive a notification for every message sent in this server or not. We highly recommend setting this to only @mentions for a Community Server.": "ط³ظٹط­ط¯ط¯ ظ‡ط°ط§ ظ…ط§ ط¥ط°ط§ ظƒط§ظ† ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط°ظٹظ† ظ„ظ… ظٹظ‚ظˆظ…ظˆط§ ط¨طھط¹ظٹظٹظ† ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ طµط±ط§ط­ط©ظ‹ ط³ظٹطھظ„ظ‚ظˆظ† ط¥ط´ط¹ط§ط±ظ‹ط§ ظ„ظƒظ„ ط±ط³ط§ظ„ط© ظ…ط±ط³ظ„ط© ظپظٹ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط± ط£ظ… ظ„ط§. ظ†ظˆطµظٹ ط¨ط´ط¯ط© ط¨طھط¹ظٹظٹظ† ظ‡ط°ط§ ط¹ظ„ظ‰ @mentions ظپظ‚ط· ظ„ط³ظٹط±ظپط±ط§طھ ط§ظ„ظ…ط¬طھظ…ط¹.",
    "Due to this server's size, members will not get mobile push notifications for non-@mention messages.": "ظ†ط¸ط±ظ‹ط§ ظ„ط­ط¬ظ… ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط±طŒ ظ„ظ† ظٹطھظ„ظ‚ظ‰ ط§ظ„ط£ط¹ط¶ط§ط، ط¥ط´ط¹ط§ط±ط§طھ ط¯ظپط¹ ط¹ظ„ظ‰ ط§ظ„ظ‡ط§طھظپ ظ„ظ„ط±ط³ط§ط¦ظ„ ط؛ظٹط± ط§ظ„ظ…ظ†ط´ظ†.",
    "Only @mentions": "ظپظ‚ط· @mentions",
    "Automatically move members to this channel and mute them when they have been idle for longer than the inactive timeout. This does not affect browsers.": "ظ†ظ‚ظ„ ط§ظ„ط£ط¹ط¶ط§ط، طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ظˆظƒطھظ…ظ‡ظ… ط¹ظ†ط¯ ط¨ظ‚ط§ط¦ظ‡ظ… ط®ط§ظ…ظ„ظٹظ† ظ„ط£ظƒط«ط± ظ…ظ† ط§ظ„ظ…ظ‡ظ„ط© ط§ظ„ظ…ط­ط¯ط¯ط© ظ„ظ„ط®ظ…ظˆظ„. ظ‡ط°ط§ ظ„ط§ ظٹط¤ط«ط± ط¹ظ„ظ‰ ط§ظ„ظ…طھطµظپط­ط§طھ.",
    "Server Widget": "ط£ط¯ط§ط© ط§ظ„ط³ظٹط±ظپط±",
    "and invite link.": "ظˆط±ط§ط¨ط· ط§ظ„ط¯ط¹ظˆط©.",
    "Embed an HTML widget on your website to display your online members, voice channels,": "طھط¶ظ…ظٹظ† ط£ط¯ط§ط© HTML ط¹ظ„ظ‰ ظ…ظˆظ‚ط¹ظƒ ظ„ط¹ط±ط¶ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھطµظ„ظٹظ† ظˆط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھظٹط©طŒ",
    "Enable Server Widget": "طھظ…ظƒظٹظ† ط£ط¯ط§ط© ط§ظ„ط³ظٹط±ظپط±",
    "If a channel is selected then an invite link will be generated with the widget, otherwise only online members and voice channels will be provided.": "ط¥ط°ط§ طھظ… ط§ط®طھظٹط§ط± ظ‚ظ†ط§ط©طŒ ط³ظٹطھظ… ط¥ظ†ط´ط§ط، ط±ط§ط¨ط· ط¯ط¹ظˆط© ظ…ط¹ ط§ظ„ط£ط¯ط§ط©طŒ ظˆط¥ظ„ط§ ظپط³ظٹطھظ… ط¹ط±ط¶ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھطµظ„ظٹظ† ظˆط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھظٹط© ظپظ‚ط·.",
    "Upload Sound": "ط±ظپط¹ ظ…ظ„ظپ طµظˆطھظٹ",
    "Use roles to group your server members and assign permissions.": "ط¶ط¨ط· طµظ„ط§ط­ظٹط§طھ ط§ظ„ط±ظˆظ„ط§طھ ط¯ط§ط®ظ„ ط§ظ„ط³ظٹط±ظپط±",
    "Customize how your server appears in invite links and, if enabled, in Server Discovery and Announcement Channel messages": "طھط®طµظٹطµ ظƒظٹظپظٹط© ط¸ظ‡ظˆط± ط³ظٹط±ظپط±ظƒ ظپظٹ ط±ظˆط§ط¨ط· ط§ظ„ط¯ط¹ظˆط©طŒ ظˆط¥ط°ط§ طھظ… ط§ظ„طھظپط¹ظٹظ„طŒ ظپظٹ ط±ط³ط§ط¦ظ„ ط§ظƒطھط´ط§ظپ ط§ظ„ط³ظٹط±ظپط± ظˆظ‚ظ†ط§ط© ط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ.",
    "Allows members to join this voice channel and hear others.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ظˆط³ظ…ط§ط¹ ط§ظ„ط¢ط®ط±ظٹظ†.",
    "Allows members to view this channel by default.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¨ط´ظƒظ„ ط§ظپطھط±ط§ط¶ظٹ.",
    "Allows members to change this channelâ€™s name, description, and voice settings. They can also delete the channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط§ط³ظ… ط§ظ„ظ‚ظ†ط§ط©طŒ ظˆطµظپظ‡ط§طŒ ظˆط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„طµظˆطھ. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط­ط°ظپ ط§ظ„ظ‚ظ†ط§ط©.",
    "Allows members to add new emoji reactions to a message in this channel and send reactions in voice channels. If this permission is disabled, members can still react using any existing reactions on a message.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¶ط§ظپط© ط±ط¯ظˆط¯ ظپط¹ظ„ ط¬ط¯ظٹط¯ط© ط¨ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط© ط¹ظ„ظ‰ ط±ط³ط§ظ„ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ظˆط¥ط±ط³ط§ظ„ ط±ط¯ظˆط¯ ظپظٹ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھظٹط©. ط¥ط°ط§ طھظ… طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ†طŒ ظٹظ…ظƒظ† ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط§ط³طھظ…ط±ط§ط± ظپظٹ ط§ط³طھط®ط¯ط§ظ… ط£ظٹ ط±ط¯ظˆط¯ ظپط¹ظ„ ظ…ظˆط¬ظˆط¯ط© ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ظ„ط©.",
    "Allows members to disconnect other members from this channel. They will also be able to move somebody into other channels that they have this permission in.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظپطµظ„ ط§ظ„ط¢ط®ط±ظٹظ† ظ…ظ† ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط³ظٹطھظ…ظƒظ†ظˆظ† ط£ظٹط¶ظ‹ط§ ظ…ظ† ظ†ظ‚ظ„ ط´ط®طµ ط¥ظ„ظ‰ ظ‚ظ†ظˆط§طھ ط£ط®ط±ظ‰ ظ„ط¯ظٹظ‡ظ… ط¥ط°ظ† ظپظٹظ‡ط§.",
    "Set Voice Channel Status": "طھط¹ظٹظٹظ† ط­ط§ظ„ط© ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©",
    "Allows members to create and edit voice channel status.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظˆطھط­ط±ظٹط± ط­ط§ظ„ط© ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©.",
    "Voice Channel Chat Permissions": "ط£ط°ظˆظ†ط§طھ ط¯ط±ط¯ط´ط© ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©",
    "Automated moderation makes monitoring text chat in voice channels easier.": "طھط³ظ‡ظ‘ظ„ ط§ظ„ط¥ط¯ط§ط±ط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط© ظ…ط±ط§ظ‚ط¨ط© ط¯ط±ط¯ط´ط© ط§ظ„ظ†طµظˆطµ ظپظٹ ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„طµظˆطھظٹط©.",
    "Text Channel Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„ظ†طµظٹط©",
    "Allows members to mute other members in this voice channel for everyone.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظƒطھظ… ط§ظ„ط¢ط®ط±ظٹظ† ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ظ„ظ„ط¬ظ…ظٹط¹.",
    "Send Messages": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Allows members to send messages in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    'Allows members to send voice messages in this channel. Requires the "Attach Files" permission as well.': "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طµظˆطھظٹط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ظٹطھط·ظ„ط¨ ط£ظٹط¶ظ‹ط§ ط¥ط°ظ† 'ط¥ط±ظپط§ظ‚ ط§ظ„ظ…ظ„ظپط§طھ'.",
    "Create Polls": "ط¥ظ†ط´ط§ط، ط§ط³طھط·ظ„ط§ط¹ط§طھ",
    "Allows members to create polls.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ط§ط³طھط·ظ„ط§ط¹ط§طھ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Apps Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„طھط·ط¨ظٹظ‚ط§طھ",

    "Use Application Commands": "ط§ط³طھط®ط¯ط§ظ… ط£ظˆط§ظ…ط± ط§ظ„طھط·ط¨ظٹظ‚ط§طھ",
    "Allows members to use commands from applications in this channel, including slash commands and context menu commands.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط£ظˆط§ظ…ط± ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©طŒ ط¨ظ…ط§ ظپظٹ ط°ظ„ظƒ ط£ظˆط§ظ…ط± ط§ظ„ط´ط±ط· ط§ظ„ظ…ط§ط¦ظ„ (slash) ظˆط£ظˆط§ظ…ط± ظ‚ط§ط¦ظ…ط© ط§ظ„ط³ظٹط§ظ‚.",

    "Use Activities": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ظ†ط´ط·ط©",
    "Allows members to use Activities in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ظ†ط´ط·ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Use External Apps": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„ط®ط§ط±ط¬ظٹط©",
    "Allows apps that members have added to their account to post messages in this channel. When disabled, the messages will be private.": "ظٹط³ظ…ط­ ظ„ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„طھظٹ ط£ط¶ط§ظپظ‡ط§ ط§ظ„ط£ط¹ط¶ط§ط، ط¥ظ„ظ‰ ط­ط³ط§ط¨ظ‡ظ… ط¨ظ†ط´ط± ط±ط³ط§ط¦ظ„ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط¹ظ†ط¯ طھط¹ط·ظٹظ„ظ‡طŒ ط³طھظƒظˆظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط®ط§طµط©.",
    "Send Messages in Threads": "ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ…ظˆط§ط¶ظٹط¹",
    "Allow members to send messages in threads under this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ ظپظٹ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ط§ظ„ظپط±ط¹ظٹط© ظ„ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Create Public Threads": "ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ط¹ط§ظ…ط©",
    "Allow members to create threads that everyone in this channel can view.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ظٹظ…ظƒظ† ظ„ظ„ط¬ظ…ظٹط¹ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¹ط±ط¶ظ‡ط§.",

    "Create Private Threads": "ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ط®ط§طµط©",
    "Allow members to create invite-only threads in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظ…ظˆط§ط¶ظٹط¹ ط®ط§طµط© ط¨ط§ظ„ط¯ط¹ظˆط© ظپظ‚ط· ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Embed Links": "طھط¶ظ…ظٹظ† ط§ظ„ط±ظˆط§ط¨ط·",
    "Allows links that members share to show embedded content in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط±ظˆط§ط¨ط· ط§ظ„طھظٹ ظٹط´ط§ط±ظƒظ‡ط§ ط§ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ظ…ط­طھظˆظ‰ ظ…ط¶ظ…ظ† ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Attach Files": "ط¥ط±ظپط§ظ‚ ط§ظ„ظ…ظ„ظپط§طھ",
    "Allows members to upload files or media in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط­ظ…ظٹظ„ ط§ظ„ظ…ظ„ظپط§طھ ط£ظˆ ط§ظ„ظˆط³ط§ط¦ط· ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",

    "Add Reactions": "ط¥ط¶ط§ظپط© ط±ط¯ظˆط¯ ظپط¹ظ„",
    "Allows members to add new emoji reactions to a message in this channel. If this permission is disabled, members can still react using any existing reactions on a message.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¶ط§ظپط© ط±ط¯ظˆط¯ ظپط¹ظ„ ط¬ط¯ظٹط¯ط© ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ط¦ظ„ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط¥ط°ط§ طھظ… طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ†طŒ ظٹظ…ظƒظ† ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط§ط³طھظ…ط±ط§ط± ظپظٹ ط§ط³طھط®ط¯ط§ظ… ط£ظٹ ط±ط¯ظˆط¯ ظپط¹ظ„ ظ…ظˆط¬ظˆط¯ط© ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ظ„ط©.",

    "Use External Emoji": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط© ط§ظ„ط®ط§ط±ط¬ظٹط©",
    "Allows members to use emoji from other servers in this channel, if theyâ€™re a Discord Nitro member.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط© ظ…ظ† ط³ظٹط±ظپط±ط§طھ ط£ط®ط±ظ‰ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ظ† ط£ط¹ط¶ط§ط، Discord Nitro.",
    "Allows members to invite new people to this server via a direct invite link to this channel. The recipient will automatically join the voice channel if they have permission to connect.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¯ط¹ظˆط© ط£ط´ط®ط§طµ ط¬ط¯ط¯ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط®ط§ط¯ظ… ط¹ط¨ط± ط±ط§ط¨ط· ط¯ط¹ظˆط© ظ…ط¨ط§ط´ط± ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط³ظٹظ†ط¶ظ… ط§ظ„ظ…ط³طھظ„ظ… طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¥ظ„ظ‰ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ط¥ط°ط§ ظƒط§ظ† ظ„ط¯ظٹظ‡ ط¥ط°ظ† ط¨ط§ظ„ط§طھطµط§ظ„.",

    "Voice Channel Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©",

    "Connect": "ط§ظ„ط§طھطµط§ظ„",
    "Allow members to join this Stage channel as the audience. Disabling this and the View Channel permissions for @everyone will make this channel private.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ظ‚ظ†ط§ط© Stage ظ‡ط°ظ‡ ظƒط¬ظ…ظ‡ظˆط±. ط³ظٹط¤ط¯ظٹ طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ† ظˆط¥ط°ظ† 'ط¹ط±ط¶ ط§ظ„ظ‚ظ†ط§ط©' ظ„ظ„ط¬ظ…ظٹط¹ ط¥ظ„ظ‰ ط¬ط¹ظ„ ط§ظ„ظ‚ظ†ط§ط© ط®ط§طµط©.",

    "Video": "ط§ظ„ظپظٹط¯ظٹظˆ",
    "Allows speakers to share their video, screen share, or stream a game in this Stage channel.": "ظٹط³ظ…ط­ ظ„ظ„ظ…طھط­ط¯ط«ظٹظ† ط¨ظ…ط´ط§ط±ظƒط© ط§ظ„ظپظٹط¯ظٹظˆ ط§ظ„ط®ط§طµ ط¨ظ‡ظ… ط£ظˆ ظ…ط´ط§ط±ظƒط© ط§ظ„ط´ط§ط´ط© ط£ظˆ ط¨ط« ظ„ط¹ط¨ط© ظپظٹ ظ‚ظ†ط§ط© Stage ظ‡ط°ظ‡.",
    "General Channel Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„ط¹ط§ظ…ط©",
    "View Channel": "ط¹ط±ط¶ ط§ظ„ظ‚ظ†ط§ط©",
    "Allows members to view this channel by default. Disabling this and the Connect permission for @everyone will make this channel private.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¹ط±ط¶ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¨ط´ظƒظ„ ط§ظپطھط±ط§ط¶ظٹ. ط³ظٹط¬ط¹ظ„ طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط®ظٹط§ط± ظ…ط¹ ط¥ط°ظ† ط§ظ„ط§طھطµط§ظ„ ظ„ظ€ @everyone ط§ظ„ظ‚ظ†ط§ط© ط®ط§طµط©.",
    "(Required for Stage moderator) Allow members to set a topic to start the Stage and enable or disable requests to speak. They can also delete the Stage channel.": "(ظ…ط·ظ„ظˆط¨ ظ„ظ…ط´ط±ظپ ط§ظ„ط³طھظٹط¬) ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط­ط¯ظٹط¯ ظ…ظˆط¶ظˆط¹ ظ„ط¨ط¯ط، ط§ظ„ط³طھظٹط¬ ظˆطھظپط¹ظٹظ„ ط£ظˆ طھط¹ط·ظٹظ„ ط·ظ„ط¨ط§طھ ط§ظ„طھط­ط¯ط«. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط­ط°ظپ ظ‚ظ†ط§ط© ط§ظ„ط³طھظٹط¬.",
    "Mute Members": "ظƒطھظ… ط§ظ„ط£ط¹ط¶ط§ط،",
    "(Required for Stage moderator) Allow members to add or remove Speakers.": "(ظ…ط·ظ„ظˆط¨ ظ„ظ„ظ…ط´ط±ظپ ط¹ظ„ظ‰ ط§ظ„ظ€ Stage) ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¶ط§ظپط© ط§ظ„ظ…طھط­ط¯ط«ظٹظ† ط£ظˆ ط¥ط²ط§ظ„طھظ‡ظ….",
    "Allow members to change this channelâ€™s permissions.": "ظٹط³ظ…ط­ ظ…ظ† ط§ظ„ط§ط´ط®ط§طµ طھط¹ط¯ظٹظ„ ط¹ظ„ظ‰ ط§ظ„ط±ظˆظ… ظˆ طµظ„ط§ط­ظٹط§طھ ط§ظ„ط±ظˆظ… ظƒط§ظ…ظ„ظ‡",
    "Move Members": "ظ†ظ‚ظ„ ط§ظ„ط£ط¹ط¶ط§ط،",
    "(Required for Stage moderator) Allow members to force others to disconnect from this channel.": "(ظ…ط·ظ„ظˆط¨ ظ„ظ„ظ…ط´ط±ظپ ط¹ظ„ظ‰ ط§ظ„ظ€ Stage) ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¬ط¨ط§ط± ط§ظ„ط¢ط®ط±ظٹظ† ط¹ظ„ظ‰ ظ‚ط·ط¹ ط§ظ„ط§طھطµط§ظ„ ظ…ظ† ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Allows members to use stickers from other servers in this channel, if theyâ€™re a Discord Nitro member.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظ„طµظ‚ط§طھ ظ…ظ† ط³ظٹط±ظپط±ط§طھ ط£ط®ط±ظ‰ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ظ† ط£ط¹ط¶ط§ط، Discord Nitro.",
    "Events Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ظپط¹ط§ظ„ظٹط§طھ",
    "Create Events": "ط¥ظ†ط´ط§ط، ظپط¹ط§ظ„ظٹط§طھ",
    "Allows members to create events in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ظپط¹ط§ظ„ظٹط§طھ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Manage Events": "ط¥ط¯ط§ط±ط© ط§ظ„ظپط¹ط§ظ„ظٹط§طھ",
    "Allows members to edit and cancel events in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط¹ط¯ظٹظ„ ط£ظˆ ط¥ظ„ط؛ط§ط، ط§ظ„ظپط¹ط§ظ„ظٹط§طھ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Mention @everyone, @here, and All Roles": "ظ…ظ†ط´ظ† @everyone ظˆ @here ظˆط¬ظ…ظٹط¹ ط§ظ„ط±طھط¨",

    "Allows members to use @everyone or @here (only online members) in this channel. They can also @mention all roles in this channel, even if the roleâ€™s â€œAllow anyone to mention this roleâ€‌ permission is disabled.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… @everyone ط£ظˆ @here (ظ„ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھطµظ„ظٹظ† ظپظ‚ط·) ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ظ…ظ†ط´ظ† ط¬ظ…ظٹط¹ ط§ظ„ط±طھط¨ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط­طھظ‰ ظ„ظˆ ظƒط§ظ† ط¥ط°ظ† 'ط§ظ„ط³ظ…ط§ط­ ظ„ط£ظٹ ط´ط®طµ ط¨ظ…ظ†ط´ظ† ظ‡ط°ظ‡ ط§ظ„ط±طھط¨ط©' ظ…ط¹ط·ظ„.",
    "Manage Messages": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط­ط°ظپ ط±ط³ط§ط¦ظ„ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ط£ظˆ طھط«ط¨ظٹطھ ط£ظٹ ط±ط³ط§ظ„ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Pin Messages": "طھط«ط¨ظٹطھ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Allows members to pin or unpin any message in this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط«ط¨ظٹطھ ط£ظˆ ط¥ط²ط§ظ„ط© طھط«ط¨ظٹطھ ط£ظٹ ط±ط³ط§ظ„ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©!",

    "Manage Threads": "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظˆط§ط¶ظٹط¹",
    "Allows members to rename, delete, close, and turn on slow mode for threads in this channel. They can also view private threads.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط¹ط§ط¯ط© طھط³ظ…ظٹط©طŒ ط­ط°ظپطŒ ط¥ط؛ظ„ط§ظ‚طŒ ظˆطھظپط¹ظٹظ„ ظˆط¶ط¹ ط§ظ„ط¨ط·ظٹط، ظ„ظ„ظ…ظˆط§ط¶ظٹط¹ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط¹ط±ط¶ ط§ظ„ظ…ظˆط§ط¶ظٹط¹ ط§ظ„ط®ط§طµط©.",

    "Read Message History": "ظ‚ط±ط§ط،ط© ط³ط¬ظ„ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Allows members to read previous messages sent in this channel. If this permission is disabled, members only see messages sent when they are online.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظ‚ط±ط§ط،ط© ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط³ط§ط¨ظ‚ط© ط§ظ„ظ…ط±ط³ظ„ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط¥ط°ط§ طھظ… طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ†طŒ ط³ظٹط±ظ‰ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط±ط³ط§ط¦ظ„ ظپظ‚ط· ط¹ظ†ط¯ طھظˆط§ط¬ط¯ظ‡ظ… ظ…طھطµظ„ظٹظ†.",

    "Send Text-to-Speech Messages": "ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طھط­ظˆظٹظ„ ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ…",
    "Allows members to send text-to-speech messages in this channel by starting a message with /tts. These messages can be heard by anyone focused on this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طھط­ظˆظٹظ„ ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ… ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¨ط¨ط¯ط، ط§ظ„ط±ط³ط§ظ„ط© ط¨ظ€ /tts. ظٹظ…ظƒظ† ظ„ط£ظٹ ط´ط®طµ ظ…طھط§ط¨ط¹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط³ظ…ط§ط¹ ظ‡ط°ظ‡ ط§ظ„ط±ط³ط§ط¦ظ„.",

    "Send Voice Messages": "ط¥ط±ط³ط§ظ„ ط±ط³ط§ط¦ظ„ طµظˆطھظٹط©",
    "Use External Stickers": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظ„طµظ‚ط§طھ ط§ظ„ط®ط§ط±ط¬ظٹط©",
    "Allows members to use stickers from other servers in this channel, if they're a Discord Nitro member.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ…ظ„طµظ‚ط§طھ ظ…ظ† ط³ظٹط±ظپط±ط§طھ ط£ط®ط±ظ‰ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ظ† ط£ط¹ط¶ط§ط، Discord Nitro.",
    "Manage Channel": "ط¥ط¯ط§ط±ط© ط§ظ„ظ‚ظ†ط§ط©",
    "Allows members to change this channelâ€™s name, description, and text settings. They can also delete the channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط§ط³ظ… ط§ظ„ظ‚ظ†ط§ط©طŒ ظˆطµظپظ‡ط§طŒ ظˆط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ†طµظˆطµ. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط­ط°ظپ ط§ظ„ظ‚ظ†ط§ط©.",
    "Manage Permissions": "ظٹط³ظ…ط­ ظ…ظ† ط§ظ„ط§ط´ط®ط§طµ طھط¹ط¯ظٹظ„ ط¹ظ„ظ‰ ط§ظ„ط±ظˆظ… ظˆ طµظ„ط§ط­ظٹط§طھ ط§ظ„ط±ظˆظ… ظƒط§ظ…ظ„ظ‡",
    "Allows members to change this channelâ€™s permissions.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط£ط°ظˆظ†ط§طھ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Manage Webhooks": "ط¥ط¯ط§ط±ط© Webhooks",
    "Allows members to create, edit, or delete webhooks in this channel, which can post messages from other apps or sites.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ظ†ط´ط§ط، ط£ظˆ طھط¹ط¯ظٹظ„ ط£ظˆ ط­ط°ظپ ط§ظ„ظ€ Webhooks ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©طŒ ظˆط§ظ„طھظٹ ظٹظ…ظƒظ†ظ‡ط§ ظ†ط´ط± ط±ط³ط§ط¦ظ„ ظ…ظ† طھط·ط¨ظٹظ‚ط§طھ ط£ظˆ ظ…ظˆط§ظ‚ط¹ ط£ط®ط±ظ‰.",
    "Membership Permissions": "ط£ط°ظˆظ†ط§طھ ط§ظ„ط¹ط¶ظˆظٹط©",
    "Allows members to change this channel's name, description, and text settings. They can also delete the channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط§ط³ظ… ط§ظ„ظ‚ظ†ط§ط©طŒ ظˆطµظپظ‡ط§طŒ ظˆط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ†طµظˆطµ. ظٹظ…ظƒظ†ظ‡ظ… ط£ظٹط¶ظ‹ط§ ط­ط°ظپ ط§ظ„ظ‚ظ†ط§ط©.",
    "Allows members to change this channels permissions.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨طھط؛ظٹظٹط± ط£ط°ظˆظ†ط§طھ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Create Invite": "ط¥ظ†ط´ط§ط، ط¯ط¹ظˆط©",
    "Allows members to invite new people to this server via a direct invite link to this channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¯ط¹ظˆط© ط£ط´ط®ط§طµ ط¬ط¯ط¯ ط¥ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ط³ظٹط±ظپط± ط¹ط¨ط± ط±ط§ط¨ط· ط¯ط¹ظˆط© ظ…ط¨ط§ط´ط± ظ„ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©.",
    "Noise Suppression": "ظƒط¨طھ ط§ظ„ط¶ظˆط¶ط§ط،",
    "Suppress background noise from your mic.": "ظƒط¨طھ ط¶ظˆط¶ط§ط، ط§ظ„ط®ظ„ظپظٹط© ظ…ظ† ط§ظ„ظ…ظٹظƒط±ظˆظپظˆظ†.",
    "Krisp": "ظƒط±ظٹط³ط¨",
    "Allows members to share their video, screen share, or stream a game in this voice channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظ…ط´ط§ط±ظƒط© ط§ظ„ظپظٹط¯ظٹظˆ ط£ظˆ ظ…ط´ط§ط±ظƒط© ط§ظ„ط´ط§ط´ط© ط£ظˆ ط¨ط« ظ„ط¹ط¨ط© ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©.",
    "Use Soundboard": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط£طµظˆط§طھ ظ…ظ† ظ„ظˆط­ط© ط§ظ„ط£طµظˆط§طھ ط§ظ„ط®ط§طµط© ط¨ط§ظ„ط®ط§ط¯ظ… ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©.",
    "Allows members to send sounds from server soundboard in this voice channel.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط£طµظˆط§طھ ظ…ظ† ظ„ظˆط­ط© ط§ظ„ط£طµظˆط§طھ ط§ظ„ط®ط§طµط© ط¨ط§ظ„ط®ط§ط¯ظ… ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©.",
    "Use External Sounds": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£طµظˆط§طھ ط§ظ„ط®ط§ط±ط¬ظٹط©",
    "Allows members to use sounds from other servers, if they're a Discord Nitro member.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£طµظˆط§طھ ظ…ظ† ط§ظ„ط®ظˆط§ط¯ظ… ط§ظ„ط£ط®ط±ظ‰ ط¥ط°ط§ ظƒط§ظ†ظˆط§ ظ…ط´طھط±ظƒظٹظ† ظپظٹ Discord Nitro.",
    "Use Voice Activity": "ط§ط³طھط®ط¯ط§ظ… ظ†ط´ط§ط· ط§ظ„طµظˆطھ",
    "Allows members to speak in this voice channel by simply talking. If this permission is disabled, members are required to use Push-to-talk. Good for controlling background noise or noisy members.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„طھط­ط¯ط« ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ط¨ظ…ط¬ط±ط¯ ط§ظ„طھط­ط¯ط«. ط¥ط°ط§ طھظ… طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ†طŒ ظٹظڈط·ظ„ط¨ ظ…ظ† ط§ظ„ط£ط¹ط¶ط§ط، ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط¶ط؛ط· ظ„ظ„طھط­ط¯ط«. ظ…ظپظٹط¯ ظ„ظ„طھط­ظƒظ… ظپظٹ ط§ظ„ط¶ظˆط¶ط§ط، ط§ظ„ط®ظ„ظپظٹط© ط£ظˆ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…ط²ط¹ط¬ظٹظ†.",
    "Allows members to join this voice channel and hear others. Disabling this and the View Channel permissions for @everyone will make this channel private.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ظˆط³ظ…ط§ط¹ ط§ظ„ط¢ط®ط±ظٹظ†. ط³ظٹط¬ط¹ظ„ طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط®ظٹط§ط± ظ…ط¹ ط¥ط°ظ† ط¹ط±ط¶ ط§ظ„ظ‚ظ†ط§ط© ظ„ظ€ @everyone ط§ظ„ظ‚ظ†ط§ط© ط®ط§طµط©.",
    "Speak": "ط§ظ„طھط­ط¯ط«",
    "Allows members to talk in voice channels. If this permission is disabled, members are default muted until somebody with the â€œMute Membersâ€‌ permission un-mutes them.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ط§ظ„طھط­ط¯ط« ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©. ط¥ط°ط§ طھظ… طھط¹ط·ظٹظ„ ظ‡ط°ط§ ط§ظ„ط¥ط°ظ†طŒ ظپط³ظٹظƒظˆظ† ط§ظ„ط£ط¹ط¶ط§ط، ظ…ظƒطھظˆظ…ظٹظ† ط§ظپطھط±ط§ط¶ظٹظ‹ط§ ط­طھظ‰ ظٹظ‚ظˆظ… ط´ط®طµ ظ„ط¯ظٹظ‡ ط¥ط°ظ† \"ظƒطھظ… ط§ظ„ط£ط¹ط¶ط§ط،\" ط¨ط¥ظ„ط؛ط§ط، ظƒطھظ…ظ‡ظ….",
    "Standard": "ظ‚ظٹط§ط³ظٹ",
    "Members will be restricted to sending one message and creating one thread per this interval, unless they have Manage Channel or Manage Messages permissions.": "ط³ظٹطھظ… طھظ‚ظٹظٹط¯ ط§ظ„ط£ط¹ط¶ط§ط، ط¨ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ظˆط§ط­ط¯ط© ظˆط¥ظ†ط´ط§ط، ظ…ظˆط¶ظˆط¹ ظˆط§ط­ط¯ ظپظ‚ط· ط®ظ„ط§ظ„ ظ‡ط°ظ‡ ط§ظ„ظ…ط¯ط©طŒ ظ…ط§ ظ„ظ… ظٹظƒظ† ظ„ط¯ظٹظ‡ظ… طµظ„ط§ط­ظٹط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ظ‚ظ†ط§ط© ط£ظˆ ط¥ط¯ط§ط±ط© ط§ظ„ط±ط³ط§ط¦ظ„.",
    "Age-Restricted Channel": "ظ‚ظ†ط§ط© ظ…ظ‚ظٹظ‘ط¯ط© ط¨ط§ظ„ط¹ظ…ط±",
    "Users will need to confirm they are of over the legal age to view in the content in this channel. Age-restricted channels are exempt from the explicit content filter.": "ط³ظٹط­طھط§ط¬ ط§ظ„ظ…ط³طھط®ط¯ظ…ظˆظ† ظ„طھط£ظƒظٹط¯ ط£ظ†ظ‡ظ… ظپظˆظ‚ ط§ظ„ط³ظ† ط§ظ„ظ‚ط§ظ†ظˆظ†ظٹ ظ„ط¹ط±ط¶ ط§ظ„ظ…ط­طھظˆظ‰ ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط©. ط§ظ„ظ‚ظ†ظˆط§طھ ط§ظ„ظ…ظ‚ظٹظ‘ط¯ط© ط¨ط§ظ„ط¹ظ…ط± ظ…ط¹ظپط§ط© ظ…ظ† ظپظ„طھط± ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„طµط±ظٹط­.",
    "Deafen Members": "ظƒطھظ… ط³ظ…ط§ط¹ ط§ظ„ط£ط¹ط¶ط§ط،",
    "Allows members to deafen other members in this voice channel, which means they wonâ€™t be able to speak or hear others.": "ظٹط³ظ…ط­ ظ„ظ„ط£ط¹ط¶ط§ط، ط¨ظƒطھظ… ط³ظ…ط§ط¹ ط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ط¢ط®ط±ظٹظ† ظپظٹ ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©طŒ ظ…ظ…ط§ ظٹط¹ظ†ظٹ ط£ظ†ظ‡ظ… ظ„ظ† ظٹطھظ…ظƒظ†ظˆط§ ظ…ظ† ط§ظ„طھط­ط¯ط« ط£ظˆ ط³ظ…ط§ط¹ ط§ظ„ط¢ط®ط±ظٹظ†.",

    "Announcement Channel": "ظ‚ظ†ط§ط© ط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ",
    "Users can Follow this channel in their own servers. Posts you \"Publish\" from this channel will appear in those servers.": "ظٹظ…ظƒظ† ظ„ظ„ظ…ط³طھط®ط¯ظ…ظٹظ† ظ…طھط§ط¨ط¹ط© ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ظپظٹ ط³ظٹط±ظپط±ط§طھظ‡ظ… ط§ظ„ط®ط§طµط©. ط§ظ„ظ…ظ†ط´ظˆط±ط§طھ ط§ظ„طھظٹ طھظ‚ظˆظ… ط¨ظ€ \"ظ†ط´ط±ظ‡ط§\" ظ…ظ† ظ‡ط°ظ‡ ط§ظ„ظ‚ظ†ط§ط© ط³طھط¸ظ‡ط± ظپظٹ طھظ„ظƒ ط§ظ„ط³ظٹط±ظپط±ط§طھ.",

    "By creating an announcement channel, your server profile will be visible to others outside your server members. You can control Profile privacy in Server Settings > Profile.": "ط¨ط¥ظ†ط´ط§ط، ظ‚ظ†ط§ط© ط¥ط¹ظ„ط§ظ†ط§طھطŒ ط³ظٹطµط¨ط­ ظ…ظ„ظپ ط³ظٹط±ظپط±ظƒ ظ…ط±ط¦ظٹظ‹ط§ ظ„ظ„ط¢ط®ط±ظٹظ† ط®ط§ط±ط¬ ط£ط¹ط¶ط§ط، ط§ظ„ط³ظٹط±ظپط±. ظٹظ…ظƒظ†ظƒ ط§ظ„طھط­ظƒظ… ط¨ط®طµظˆطµظٹط© ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ ظ…ظ† ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط³ظٹط±ظپط± > ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ.",
    "Hide After Inactivity": "ط§ظ„ط¥ط®ظپط§ط، ط¨ط¹ط¯ ط§ظ„ط®ظ…ظˆظ„",
    "None": "ظ„ط§ ط´ظٹط،",
    "Advanced Voice Activity": "ظƒط´ظپ ط§ظ„طµظˆطھ ط§ظ„ظ…طھظ‚ط¯ظ…",
    "Turning this off may help if your voice is not being detected by the automatic input sensitivity.": "ظ„ظˆ ط·ظپظٹطھظ‡ط§ ظٹظ…ظƒظ† طھط³ط§ط¹ط¯ ظ„ظˆ طµظˆطھظƒ ظ…ط§ ظٹطھظ… ط§ظƒطھط´ط§ظپظ‡ طھظ„ظ‚ط§ط¦ظٹظ‹ط§.",
    "Automatic Gain Control": "ط§ظ„طھط­ظƒظ… ط§ظ„طھظ„ظ‚ط§ط¦ظٹ ط¨ط§ظ„ظ…ظٹظƒط±ظˆظپظˆظ†",
    "Automatically adjust microphone volume to keep it clear and consistent.": "ظٹط¶ط¨ط· طµظˆطھ ط§ظ„ظ…ظٹظƒط±ظˆظپظˆظ† طھظ„ظ‚ط§ط¦ظٹ ط¹ط´ط§ظ† ظٹظƒظˆظ† ظˆط§ط¶ط­ ظˆط«ط§ط¨طھ.",
    "Bypass System Audio Input Processing": "طھط¬ط§ظˆط² ظ…ط¹ط§ظ„ط¬ط© طµظˆطھ ط§ظ„ظ†ط¸ط§ظ…",
    "System audio processing may interfere with Discord's audio processing": "ظ…ط¹ط§ظ„ط¬ط© طµظˆطھ ط§ظ„ظ†ط¸ط§ظ… ظ…ظ…ظƒظ† طھطھط¯ط§ط®ظ„ ظ…ط¹ طµظˆطھ Discord",
    "Show a warning when Discord is not detecting audio from your mic": "ظˆط±ظ‘ظٹظƒ طھط­ط°ظٹط± ظ„ظˆ Discord ظ…ط§ ظٹظ„طھظ‚ط· طµظˆطھظƒ ظ…ظ† ط§ظ„ظ…ظٹظƒط±ظˆظپظˆظ†",
    "Switch voice channel warning": "طھط­ط°ظٹط± ظ‚ط¨ظ„ طھط؛ظٹظٹط± ظ‚ظ†ط§ط© ط§ظ„طµظˆطھ",
    "Show a confirmation prompt before switching to a different voice channel.": "ظˆط±ظ‘ظٹظƒ طھط£ظƒظٹط¯ ظ‚ط¨ظ„ طھط؛ظٹظٹط± ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط©",
    "Global Attenuation": "ط®ظپط¶ طµظˆطھ ط§ظ„ط¨ط±ط§ظ…ط¬ ط§ظ„ط«ط§ظ†ظٹط©",
    "User Join": "ط¯ط®ظˆظ„ ظ…ط³طھط®ط¯ظ…",
    "User Leave": "ط®ط±ظˆط¬ ظ…ط³طھط®ط¯ظ…",
    "User Moved": "طھظ… ظ†ظ‚ظ„ ط§ظ„ظ…ط³طھط®ط¯ظ…",
    "Outgoing Ring": "ظ…ظƒط§ظ„ظ…ط© طµط§ط¯ط±ط©",
    "Incoming Ring": "ظ…ظƒط§ظ„ظ…ط© ظˆط§ط±ط¯ط©",
    "Stream Started": "ط¨ط¯ط£ ط§ظ„ط¨ط«",
    "Stream Stopped": "طھظˆظ‚ظپ ط§ظ„ط¨ط«",
    "Viewer Join": "ط§ظ†ط¶ظ…ط§ظ… ظ…ط´ط§ظ‡ط¯",
    "Viewer Leave": "ط®ط±ظˆط¬ ظ…ط´ط§ظ‡ط¯",
    "Activity Start": "ط¨ط¯ط، ط§ظ„ظ†ط´ط§ط·",
    "Activity End": "ط§ظ†طھظ‡ط§ط، ط§ظ„ظ†ط´ط§ط·",
    "Activity User Join": "ط§ظ†ط¶ظ…ط§ظ… ظ…ط³طھط®ط¯ظ… ظ„ظ„ظ†ط´ط§ط·",
    "Activity User Leave": "ظ…ط؛ط§ط¯ط±ط© ظ…ط³طھط®ط¯ظ… ظ…ظ† ط§ظ„ظ†ط´ط§ط·",
    "Invited to Speak": "ط¯ط¹ظˆط© ظ„ظ„طھط­ط¯ط«",
    "Sounds": "ط§ظ„ط£طµظˆط§طھ",
    "Enable same-channel message notifications": "طھظپط¹ظٹظ„ طھظ†ط¨ظٹظ‡ط§طھ ط§ظ„ط±ط³ط§ط¦ظ„ ظ„ظ†ظپط³ ط§ظ„ط±ظˆظ…",
    "Play a unique sound when there's a new message in the channel you're currently reading.": "طھط´ط؛ظٹظ„ طµظˆطھ ظ…ظ…ظٹط² ط¹ظ†ط¯ ظˆطµظˆظ„ ط±ط³ط§ظ„ط© ط¬ط¯ظٹط¯ط© ظپظٹ ط§ظ„ط±ظˆظ… ط§ظ„ظ„ظٹ طھظ‚ط±ط£ظ‡ ط­ط§ظ„ظٹط§ظ‹.",
    "Disable All Notification Sounds": "ط¥ظٹظ‚ط§ظپ ظƒظ„ ط£طµظˆط§طھ ط§ظ„طھظ†ط¨ظٹظ‡ط§طھ",
    "Your existing notification sound settings will be preserved.": "ط³ظٹطھظ… ط­ظپط¸ ط¥ط¹ط¯ط§ط¯ط§طھ ط£طµظˆط§طھ ط§ظ„طھظ†ط¨ظٹظ‡ط§طھ ط§ظ„ط­ط§ظ„ظٹط©.",
    "Blusy": "ط¨ظ„ظˆط³ظٹ",
    "you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings.": "ظ„ظˆ طھط¨ط؛ظ‰ ط¥ط´ط¹ط§ط±ط§طھ ظ„ظƒظ„ ط±ظˆظ… ط£ظˆ ط³ظٹط±ظپط±طŒ ط§ط¶ط؛ط· ط¨ط§ظ„ط²ط± ط§ظ„ظٹظ…ظٹظ† ط¹ظ„ظ‰ ط£ظٹظ‚ظˆظ†ط© ط§ظ„ط³ظٹط±ظپط± ظˆط§ط®طھط± ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ.",
    "Mute Server": "ظƒطھظ… ط§ظ„ط³ظٹط±ظپط±",
    "Unmute Server": "ط¥ظ„ط؛ط§ط، ظƒطھظ… ط§ظ„ط³ظٹط±ظپط±",
    "Enable Unread Message Badge": "طھظپط¹ظٹظ„ ط´ط§ط±ط© ط§ظ„ط±ط³ط§ط¦ظ„ ط؛ظٹط± ط§ظ„ظ…ظ‚ط±ظˆط،ط©",
    "Shows a red badge on the app icon when you have unread messages.": "ظٹط¸ظ‡ط± ط´ط±ظٹط· ط£ط­ظ…ط± ط¹ظ„ظ‰ ط£ظٹظ‚ظˆظ†ط© ط§ظ„طھط·ط¨ظٹظ‚ ظ„ظ…ط§ ظٹظƒظˆظ† ط¹ظ†ط¯ظƒ ط±ط³ط§ط¦ظ„ ط؛ظٹط± ظ…ظ‚ط±ظˆط،ط©.",
    "Flashes the app in your taskbar when you have new notifications.": "ظٹط®ظ„ظٹ ط§ظ„طھط·ط¨ظٹظ‚ ظٹظˆظ…ط¶ ظپظٹ ط´ط±ظٹط· ط§ظ„ظ…ظ‡ط§ظ… ط¹ظ†ط¯ ظˆطµظˆظ„ ط¥ط´ط¹ط§ط±ط§طھ ط¬ط¯ظٹط¯ط©.",
    "Quests": "ط§ظ„ظ…ظ‡ظ…ط§طھ",
    "All Quests": "ظƒظ„ ط§ظ„ظ…ظ‡ظ…ط§طھ",
    "Claimed Quests": "ط§ظ„ظ…ظ‡ظ…ط§طھ ط§ظ„ظ…ظ†ط¬ط²ط©",
    "Open the Shop": "ظپطھط­ ط§ظ„ظ…طھط¬ط±",
    "Accept Quest": "ظ‚ط¨ظˆظ„ ط§ظ„ظ…ظ‡ظ…ط©",
    "Play Game": "طھط´ط؛ظٹظ„ ط§ظ„ظ„ط¹ط¨ط©",
    "Play Now": "ط§ظ„ظ„ط¹ط¨ ط§ظ„ط§ظ†",
    "Buy Now": "ط§ظ„ط´ط±ط§ط، ط§ظ„ط§ظ†",
    "Get Game": "ط§ط­طµظ„ ط¹ظ„ظ‰ ط§ظ„ظ„ط¹ط¨ط©",
    "View More": "ظ…ط´ط§ظ‡ط¯ط© ط§ظ„ظ…ط²ظٹط¯",
    "Watch": "ظ…ط´ط§ظ‡ط¯ط©",
    "Available Quests": "ط§ظ„ظ…ظ‡ط§ظ… ط§ظ„ظ…طھط§ط­ط©",
    "Reaction Notifications": "ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„طھظپط§ط¹ظ„",
    "Receive notifications when your messages are reacted to.": "ط§ط³طھظ‚ط¨ط§ظ„ ط¥ط´ط¹ط§ط± ظ„ظ…ط§ ط£ط­ط¯ ظٹطھظپط§ط¹ظ„ ظ…ط¹ ط±ط³ط§ط¦ظ„ظƒ.",
    "All Messages": "ظƒظ„ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Only Direct Messages": "ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط© ظپظ‚ط·",
    "Email Notifications": "ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ",

    "Communication Emails": "ط±ط³ط§ط¦ظ„ ط§ظ„طھظˆط§طµظ„",
    "Receive emails for missed calls, messages, and message digests.": "ط§ط³طھظ‚ط¨ظ„ ط¥ظٹظ…ظٹظ„ط§طھ ظ„ظ„ظ…ظƒط§ظ„ظ…ط§طھ ط§ظ„ظپط§ط¦طھط©طŒ ط§ظ„ط±ط³ط§ط¦ظ„طŒ ظˆظ…ظ„ط®طµط§طھ ط§ظ„ط±ط³ط§ط¦ظ„.",
    "Enable Streamer Mode": "طھظپط¹ظٹظ„ ظˆط¶ط¹ ط§ظ„ط³طھط±ظٹظ…ط±",

    "Automatically Enable/Disable": "ط§ظ„طھظپط¹ظٹظ„/ط§ظ„طھط¹ط·ظٹظ„ ط§ظ„طھظ„ظ‚ط§ط¦ظٹ",
    "Automatically enable/disable Streamer Mode if OBS or Split are running on this computer.": "طھظپط¹ظٹظ„/طھط¹ط·ظٹظ„ ظˆط¶ط¹ ط§ظ„ط³طھط±ظٹظ…ط± طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¥ط°ط§ ظƒط§ظ† OBS ط£ظˆ Split ظٹط¹ظ…ظ„ط§ظ† ط¹ظ„ظ‰ ظ‡ط°ط§ ط§ظ„ظƒظ…ط¨ظٹظˆطھط±.",

    "Options": "ط§ظ„ط®ظٹط§ط±ط§طھ",
    "Developer Mode": "ظˆط¶ط¹ ط§ظ„ظ…ط·ظˆط±",

    "Developer Mode exposes context menu items helpful for people writing apps using the": "ظˆط¶ط¹ ط§ظ„ظ…ط·ظˆط± ظٹط¹ط±ط¶ ط¹ظ†ط§طµط± ظ‚ط§ط¦ظ…ط© ط§ظ„ط³ظٹط§ظ‚ ط§ظ„ظ…ظپظٹط¯ط© ظ„ظ„ظ…ط·ظˆط±ظٹظ† ط¹ظ†ط¯ ظƒطھط§ط¨ط© ط§ظ„طھط·ط¨ظٹظ‚ط§طھ.",

    "Hardware Acceleration": "طھط³ط±ظٹط¹ ط§ظ„ط¹طھط§ط¯",
    "Uses your GPU to make Discord smoother. Turn this off if you are experiencing visual problems.": "ظٹط³طھط®ط¯ظ… ط¨ط·ط§ظ‚ط© ط§ظ„ط±ط³ظˆظ…ظٹط§طھ (GPU) ظ„ط¬ط¹ظ„ ط¯ظٹط³ظƒظˆط±ط¯ ط£ظƒط«ط± ط³ظ„ط§ط³ط©. ظ‚ظ… ط¨ط¥ظٹظ‚ط§ظپظ‡ ط¥ط°ط§ ظˆط§ط¬ظ‡طھ ظ…ط´ط§ظƒظ„ ط¨طµط±ظٹط©.",

    "Application Test Mode": "ظˆط¶ط¹ ط§ط®طھط¨ط§ط± ط§ظ„طھط·ط¨ظٹظ‚",
    "Enter your Discord application ID to enable test mode for that application.": "ط£ط¯ط®ظ„ ظ…ط¹ط±ظپ طھط·ط¨ظٹظ‚ ط¯ظٹط³ظƒظˆط±ط¯ ظ„طھظپط¹ظٹظ„ ظˆط¶ط¹ ط§ظ„ط§ط®طھط¨ط§ط± ظ„ظ‡ط°ط§ ط§ظ„طھط·ط¨ظٹظ‚.",

    "Show Play Again in DMs List": "ط¹ط±ط¶ 'ط§ظ„ط¹ط¨ ظ…ط±ط© ط£ط®ط±ظ‰' ظپظٹ ظ‚ط§ط¦ظ…ط© ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط©",
    "Show Recent Activities or the â€œPlay Againâ€‌ section on desktop in Direct Messages.": "ظٹط¹ط±ط¶ ط§ظ„ط£ظ†ط´ط·ط© ط§ظ„ط£ط®ظٹط±ط© ط£ظˆ ظ‚ط³ظ… 'ط§ظ„ط¹ط¨ ظ…ط±ط© ط£ط®ط±ظ‰' ط¹ظ„ظ‰ ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨ ط¶ظ…ظ† ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط©.",
    "Hide Personal Information": "ط¥ط®ظپط§ط، ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط´ط®طµظٹط©",
    "Hides email, connected accounts, notes, and anonymizes number tags.": "ظٹط®ظپظٹ ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹطŒ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…طھطµظ„ط©طŒ ط§ظ„ظ…ظ„ط§ط­ط¸ط§طھطŒ ظˆظٹظڈط®ظپظٹ ط£ط±ظ‚ط§ظ… ط§ظ„طھط§ط¬ط§طھ.",

    "Hide Invite Links": "ط¥ط®ظپط§ط، ط±ظˆط§ط¨ط· ط§ظ„ط¯ط¹ظˆط©",
    "Recommended if you don't want random people accessing your Discord servers.": "ظ…ظˆطµظ‰ ط¨ظ‡ ط¥ط°ط§ ظƒظ†طھ ظ„ط§ طھط±ظٹط¯ ظ„ط£ط´ط®ط§طµ ط¹ط´ظˆط§ط¦ظٹظٹظ† ط§ظ„ظˆطµظˆظ„ ظ„ط³ظٹط±ظپط±ط§طھ ط¯ظٹط³ظƒظˆط±ط¯ ط§ظ„ط®ط§طµط© ط¨ظƒ.",

    "Disable Sounds": "طھط¹ط·ظٹظ„ ط§ظ„ط£طµظˆط§طھ",
    "All sound effects will be disabled.": "ط³ظٹطھظ… طھط¹ط·ظٹظ„ ط¬ظ…ظٹط¹ ط§ظ„طھط£ط«ظٹط±ط§طھ ط§ظ„طµظˆطھظٹط©.",

    "Disable Notifications": "طھط¹ط·ظٹظ„ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ",
    "All desktop notifications will be disabled.": "ط³ظٹطھظ… طھط¹ط·ظٹظ„ ط¬ظ…ظٹط¹ ط¥ط´ط¹ط§ط±ط§طھ ط³ط·ط­ ط§ظ„ظ…ظƒطھط¨.",

    "Hide Discord Window from Screen Capture": "ط¥ط®ظپط§ط، ظ†ط§ظپط°ط© ط¯ظٹط³ظƒظˆط±ط¯ ظ…ظ† طھط³ط¬ظٹظ„ ط§ظ„ط´ط§ط´ط©",
    "Hides most Discord windows from most screen capture software.": "ظٹط®ظپظٹ ظ…ط¹ط¸ظ… ظ†ظˆط§ظپط° ط¯ظٹط³ظƒظˆط±ط¯ ظ…ظ† ط£ط؛ظ„ط¨ ط¨ط±ط§ظ…ط¬ طھط³ط¬ظٹظ„ ط§ظ„ط´ط§ط´ط©.",
    "Social Emails": "ط±ط³ط§ط¦ظ„ ط§ط¬طھظ…ط§ط¹ظٹط©",
    "Receive emails for friend requests, new friend suggestions, and events in your server.": "ط§ط³طھظ‚ط¨ظ„ ط¥ظٹظ…ظٹظ„ط§طھ ظ„ط·ظ„ط¨ط§طھ ط§ظ„طµط¯ط§ظ‚ط©طŒ ط§ظ‚طھط±ط§ط­ط§طھ ط§ظ„ط£طµط¯ظ‚ط§ط، ط§ظ„ط¬ط¯ط¯طŒ ظˆط§ظ„ظپط¹ط§ظ„ظٹط§طھ ظپظٹ ط³ظٹط±ظپط±ظƒ.",

    "Announcements and Update Emails": "ط±ط³ط§ط¦ظ„ ط§ظ„طھط­ط¯ظٹط«ط§طھ ظˆط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ",
    "Receive emails about product updates, our newest features, improvements and bug fixes.": "ط§ط³طھظ‚ط¨ظ„ ط¥ظٹظ…ظٹظ„ط§طھ ط¹ظ† طھط­ط¯ظٹط«ط§طھ ط§ظ„ظ…ظ†طھط¬طŒ ط§ظ„ظ…ط²ط§ظٹط§ ط§ظ„ط¬ط¯ظٹط¯ط©طŒ ط§ظ„طھط­ط³ظٹظ†ط§طھ ظˆط¥طµظ„ط§ط­ ط§ظ„ط£ط®ط·ط§ط،.",

    "Tip Emails": "ط±ط³ط§ط¦ظ„ ط§ظ„ظ†طµط§ط¦ط­",
    "Receive emails with helpful advice on how to use Discord and information on lesser known features.": "ط§ط³طھظ‚ط¨ظ„ ط¥ظٹظ…ظٹظ„ط§طھ طھط­طھظˆظٹ ظ†طµط§ط¦ط­ ظ…ظپظٹط¯ط© ظ„ط§ط³طھط®ط¯ط§ظ… ط¯ظٹط³ظƒظˆط±ط¯ ظˆظ…ط¹ظ„ظˆظ…ط§طھ ط¹ظ† ط§ظ„ظ…ط²ط§ظٹط§ ط§ظ„ط£ظ‚ظ„ ط´ظ‡ط±ط©.",

    "Recommendations Emails": "ط±ط³ط§ط¦ظ„ ط§ظ„طھظˆطµظٹط§طھ",
    "Receive emails with recommended servers and suggested events.": "ط§ط³طھظ‚ط¨ظ„ ط¥ظٹظ…ظٹظ„ط§طھ ط¨ط³ظٹط±ظپط±ط§طھ ظ…ظ‚طھط±ط­ط© ظˆظپط¹ط§ظ„ظٹط§طھ ظ…ظˆطµظ‰ ط¨ظ‡ط§.",
    "System Startup Behavior": "ط³ظ„ظˆظƒ ط¨ط¯ط، طھط´ط؛ظٹظ„ ط§ظ„ظ†ط¸ط§ظ…",

    "Open Discord": "ظپطھط­ ط¯ظٹط³ظƒظˆط±ط¯",
    "Save yourself a few clicks and let Discord greet you on computer startup.": "ظˆظپظ‘ط± ط¨ط¹ط¶ ط§ظ„ظ†ظ‚ط±ط§طھ ظˆط¯ط¹ ط¯ظٹط³ظƒظˆط±ط¯ ظٹط±ط­ط¨ ط¨ظƒ ط¹ظ†ط¯ طھط´ط؛ظٹظ„ ط§ظ„ظƒظ…ط¨ظٹظˆطھط±.",

    "Start Minimized": "ط§ط¨ط¯ط£ ظ…طµط؛ظ‘ط±ظ‹ط§",
    "Discord starts in the background and remains out of your way.": "ظٹط¨ط¯ط£ ط¯ظٹط³ظƒظˆط±ط¯ ظپظٹ ط§ظ„ط®ظ„ظپظٹط© ظˆظٹط¨ظ‚ظ‰ ط¨ط¹ظٹط¯ظ‹ط§ ط¹ظ† ط·ط±ظٹظ‚ظƒ.",

    "Close Button": "ط²ط± ط§ظ„ط¥ط؛ظ„ط§ظ‚",
    "Keybind Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ط®طھطµط§ط±ط§طھ ظ„ظˆط­ط© ط§ظ„ظ…ظپط§طھظٹط­",

    "Minimize to Tray": "طھطµط؛ظٹط± ط¥ظ„ظ‰ ط´ط±ظٹط· ط§ظ„ظ…ظ‡ط§ظ…",
    "Hitting X will make Discord sit back and relax in your system tray when you close the app.": "ط¨ط§ظ„ط¶ط؛ط· ط¹ظ„ظ‰ X ط³ظٹط¬ظ„ط³ ط¯ظٹط³ظƒظˆط±ط¯ ظپظٹ ط´ط±ظٹط· ط§ظ„ظ…ظ‡ط§ظ… ط¹ظ†ط¯ ط¥ط؛ظ„ط§ظ‚ ط§ظ„طھط·ط¨ظٹظ‚ ظˆظٹط³طھط±ظٹط­ ظ‡ظ†ط§ظƒ.",
    "Unsubscribe from all marketing emails": "ط¥ظ„ط؛ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ ظ…ظ† ظƒظ„ ط±ط³ط§ط¦ظ„ ط§ظ„طھط³ظˆظٹظ‚",
    "This includes any emails about product updates, new features, tips on using Discord, and recommendations on new servers, events or stage channels.": "ظ‡ط°ط§ ظٹط´ظ…ظ„ ط£ظٹ ط¥ظٹظ…ظٹظ„ط§طھ ط¹ظ† طھط­ط¯ظٹط«ط§طھ ط§ظ„ظ…ظ†طھط¬طŒ ط§ظ„ظ…ط²ط§ظٹط§ ط§ظ„ط¬ط¯ظٹط¯ط©طŒ ط§ظ„ظ†طµط§ط¦ط­ ظ„ط§ط³طھط®ط¯ط§ظ… ط¯ظٹط³ظƒظˆط±ط¯طŒ ظˆط§ظ„طھظˆطµظٹط§طھ ط¹ظ† ط³ظٹط±ظپط±ط§طھ ط£ظˆ ظپط¹ط§ظ„ظٹط§طھ ط£ظˆ ظ‚ظ†ظˆط§طھ ظ…ط³ط±ط­ظٹط©.",
    "Push Notification Inactive Timeout": "ظ…ط¯ط© ط®ظ…ظˆظ„ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ظپظˆط±ظٹط©",
    "Discord avoids sending push notifications to your mobile device when you are at your computer. Use this setting to control how long you need to be inactive on desktop for before you receive push notifications.": "ط¯ظٹط³ظƒظˆط±ط¯ ظٹطھط¬ظ†ط¨ ط¥ط±ط³ط§ظ„ ط¥ط´ط¹ط§ط±ط§طھ ط¥ظ„ظ‰ ط¬ظˆط§ظ„ظƒ ظ„ظ…ط§ طھظƒظˆظ† طھط³طھط®ط¯ظ… ط§ظ„ظƒظ…ط¨ظٹظˆطھط±. ظ‡ط°ط§ ط§ظ„ط¥ط¹ط¯ط§ط¯ ظٹط­ط¯ط¯ ظƒظ… طھط¬ظ„ط³ ط؛ظٹط± ظ†ط´ط· ط¹ظ„ظ‰ ط§ظ„ظƒظ…ط¨ظٹظˆطھط± ظ‚ط¨ظ„ ظ…ط§ طھظˆطµظ„ظƒ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط¹ظ„ظ‰ ط§ظ„ط¬ظˆط§ظ„.",
    "Text-to-Speech Notifications": "ط¥ط´ط¹ط§ط±ط§طھ طھط­ظˆظٹظ„ ط§ظ„ظ†طµ ط¥ظ„ظ‰ ظƒظ„ط§ظ…",
    "Turn this on to have a high tech robot speak your notifications to you.": "ظپط¹ظ‘ظ„ ظ‡ط°ط§ ط§ظ„ط®ظٹط§ط± ط¹ط´ط§ظ† ط±ظˆط¨ظˆطھ طھظ‚ظ†ظٹ ظٹظ‚ط±ط£ ظ„ظƒ ط¥ط´ط¹ط§ط±ط§طھظƒ ط¨طµظˆطھ.",
    "For all channels": "ظ„ظƒظ„ ط§ظ„ط±ظˆظ…ط§طھ",
    "For current selected channel": "ظ„ظ„ط±ظˆظ… ط§ظ„ط­ط§ظ„ظٹ ظپظ‚ط·",
    "Never": "ط£ط¨ط¯ط§ظ‹",
    "Deafen": "ظƒطھظ… ط§ظ„ظƒظ„",
    "Undeafen": "ط¥ظ„ط؛ط§ط، ظƒطھظ… ط§ظ„ظƒظ„",
    "Unmute": "ط¥ظ„ط؛ط§ط، ط§ظ„ظƒطھظ…",
    "Camera On": "طھط´ط؛ظٹظ„ ط§ظ„ظƒط§ظ…ظٹط±ط§",
    "Camera Off": "ط¥ظٹظ‚ط§ظپ ط§ظ„ظƒط§ظ…ظٹط±ط§",
    "Voice Disconnected": "طھظ… ظپطµظ„ ط§ظ„طµظˆطھ",
    "PTT Activate": "طھظپط¹ظٹظ„ ط§ظ„ط¶ط؛ط· ظ„ظ„طھط­ط¯ط«",
    "PTT Deactivate": "ط¥ظٹظ‚ط§ظپ ط§ظ„ط¶ط؛ط· ظ„ظ„طھط­ط¯ط«",
    "Display images, videos, and lolcats": "ط¹ط±ط¶ ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ ظˆط§ظ„ظ€ lolcats",
    "When posted as links to chat": "ط¹ظ†ط¯ ظ†ط´ط±ظ‡ط§ ظƒط±ظˆط§ط¨ط· ظپظٹ ط§ظ„ط¯ط±ط¯ط´ط©",
    "When uploaded directly to Discord": "ط¹ظ†ط¯ ط±ظپط¹ظ‡ط§ ظ…ط¨ط§ط´ط±ط© ط¹ظ„ظ‰ Discord",
    "Images larger than 10 MB will not be previewed.": "ط§ظ„طµظˆط± ط§ظ„ط£ظƒط¨ط± ظ…ظ† 10 ظ…ظٹط¬ط§ط¨ط§ظٹطھ ظ„ظ† طھظڈط¹ط±ط¶ ظ…ط¹ط§ظٹظ†طھظ‡ط§",
    "With image descriptions": "ظ…ط¹ ظˆطµظپ ط§ظ„طµظˆط±",
    "Image descriptions are used to describe images for screenreaders.": "ظˆطµظپ ط§ظ„طµظˆط± ظٹظڈط³طھط®ط¯ظ… ظ„ظˆطµظپ ط§ظ„طµظˆط± ظ„ط¨ط±ط§ظ…ط¬ ظ‚ط±ط§ط،ط© ط§ظ„ط´ط§ط´ط©",
    "Embeds and Link Previews": "ط§ظ„طھط¶ظ…ظٹظ†ط§طھ ظˆظ…ط¹ط§ظٹظ†ط§طھ ط§ظ„ط±ظˆط§ط¨ط·",
    "Show embeds and preview website links pasted into chat": "ط¹ط±ط¶ ط§ظ„طھط¶ظ…ظٹظ†ط§طھ ظˆظ…ط¹ط§ظٹظ†ط© ط±ظˆط§ط¨ط· ط§ظ„ظ…ظˆط§ظ‚ط¹ ظپظٹ ط§ظ„ط¯ط±ط¯ط´ط©",
    "Show emoji reactions on messages": "ط¹ط±ط¶ ط±ط¯ظˆط¯ ط§ظ„ط¥ظٹظ…ظˆط¬ظٹ ط¹ظ„ظ‰ ط§ظ„ط±ط³ط§ط¦ظ„",
    "Automatically convert emotions in your messages to emoji": "طھط­ظˆظٹظ„ ط§ظ„ظ…ط´ط§ط¹ط± ظپظٹ ط±ط³ط§ط¦ظ„ظƒ طھظ„ظ‚ط§ط¦ظٹظ‹ط§ ط¥ظ„ظ‰ ط¥ظٹظ…ظˆط¬ظٹ",
    "For example, when you type :) Discord will convert it to C": "ظ…ط«ظ„ط§ظ‹طŒ ط¹ظ†ط¯ ظƒطھط§ط¨ط© :) Discord ط³ظٹط­ظˆظ„ظ‡ط§ ط¥ظ„ظ‰ ط¥ظٹظ…ظˆط¬ظٹ",
    "Stickers in Autocomplete": "ط§ظ„ظ…ظ„طµظ‚ط§طھ ظپظٹ ط§ظ„ط¥ظƒظ…ط§ظ„ ط§ظ„طھظ„ظ‚ط§ط¦ظٹ",
    "Allows stickers to appear in your autocomplete results.": "ظٹط³ظ…ط­ ظ„ظ„ظ…ظ„طµظ‚ط§طھ ط¨ط§ظ„ط¸ظ‡ظˆط± ظپظٹ ظ†طھط§ط¦ط¬ ط§ظ„ط¥ظƒظ…ط§ظ„ ط§ظ„طھظ„ظ‚ط§ط¦ظٹ",
    "Text box": "طµظ†ط¯ظˆظ‚ ط§ظ„ظ†طµ",
    "Preview emoji, mentions, and markdown syntax as you type": "ط¹ط±ط¶ ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط¥ظٹظ…ظˆط¬ظٹ ظˆط§ظ„ظ€ mentions ظˆطµظٹط§ط؛ط© ط§ظ„ظ…ط§ط±ظƒط¯ط§ظˆظ† ط£ط«ظ†ط§ط، ط§ظ„ظƒطھط§ط¨ط©",
    "Lower the volume of other applications by this percent when someone is speaking. Set to 0% to completely disable global attenuation.": "ظٹظ‚ظ„ظ„ طµظˆطھ ط§ظ„ط¨ط±ط§ظ…ط¬ ط§ظ„ط«ط§ظ†ظٹط© ط¨ظ†ط³ط¨ط© ظ…ط¹ظٹظ†ط© ظ„ظ…ط§ ط­ط¯ط§ ظٹط­ظƒظٹ. ط­ط· 0% ظ„ظˆ طھط¨ظٹ طھظˆظ‚ظپ ط§ظ„ط®ط§طµظٹط© طھظ…ط§ظ…ظ‹ط§.",
    "When I speak": "ظ„ظ…ط§ ط£ظ†ط§ ط§طھظƒظ„ظ…",
    "When others speak": "ظ„ظ…ط§ ط؛ظٹط±ظٹ ظٹطھظƒظ„ظ…",
    "Enable Quality of Service High Packet Priority": "طھظپط¹ظٹظ„ ط£ظˆظ„ظˆظٹط© ط­ط²ظ… Discord ط§ظ„ط¹ط§ظ„ظٹط©",
    "Hints to your router that the packets Discord is transmitting are high priority. Some routers or internet service providers may misbehave when this is set.": "ظٹط¹ط·ظٹ ط±ط§ظˆطھط±ظƒ ط¥ط´ط§ط±ط© ط¥ظ† ط­ط²ظ… Discord ظ…ظ‡ظ…ط©. ط¨ط¹ط¶ ط§ظ„ط±ط§ظˆطھط±ط§طھ ط£ظˆ ظ…ط²ظˆط¯ظٹ ط§ظ„ط¥ظ†طھط±ظ†طھ ظ…ظ…ظƒظ† ظٹط´طھظƒظˆظ† ظ„ظˆ ظپط¹ظ„طھظ‡ط§.",
    "Delete Server": "ط­ط°ظپ ط§ظ„ط³ظٹط±ظپط±",
    "Allows us to use and process your information to understand and improve our services.": "ظٹط³ظ…ط­ ظ„ظ†ط§ ط¨ط§ط³طھط®ط¯ط§ظ… ظˆظ…ط¹ط§ظ„ط¬ط© ظ…ط¹ظ„ظˆظ…ط§طھظƒ ظ„ظپظ‡ظ… ط®ط¯ظ…ط§طھظ†ط§ ظˆطھط­ط³ظٹظ†ظ‡ط§.",
    "Enable Clipping": "طھظپط¹ظٹظ„ طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹",
    "Enables you to capture clips while you're streaming by using the clipping keybind.": "ظٹظڈظ…ظƒظ‘ظ†ظƒ ظ…ظ† طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹ ط£ط«ظ†ط§ط، ط§ظ„ط¨ط« ط¨ط§ط³طھط®ط¯ط§ظ… ظ…ظپطھط§ط­ ط§ظ„ط§ط®طھطµط§ط±.",
    "ESC": "ط®ط±ظˆط¬",
    "Please note that clips are currently captured at the same quality as your stream when streaming.": "ظٹط±ط¬ظ‰ ظ…ظ„ط§ط­ط¸ط© ط£ظ† ط§ظ„ظ…ظ‚ط§ط·ط¹ طھظڈط³ط¬ظ„ ط¨ظ†ظپط³ ط¬ظˆط¯ط© ط§ظ„ط¨ط« ط§ظ„ط­ط§ظ„ظٹ.",
    "Clip Length": "ظ…ط¯ط© ط§ظ„ظ…ظ‚ط·ط¹",
    "By default, clips are 30 seconds long.": "ط§ظپطھط±ط§ط¶ظٹظ‹ط§طŒ ظ…ط¯ط© ط§ظ„ظ…ظ‚ط§ط·ط¹ 30 ط«ط§ظ†ظٹط©.",
    "Clip Resolution": "ط¯ظ‚ط© ط§ظ„ظ…ظ‚ط·ط¹",
    "This is the maximum resolution your clips will be recorded in.": "ظ‡ط°ظ‡ ظ‡ظٹ ط£ط¹ظ„ظ‰ ط¯ظ‚ط© ط³ظٹطھظ… طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹ ط¨ظ‡ط§.",
    "Clip Frame Rate": "ظ…ط¹ط¯ظ„ ط¥ط·ط§ط±ط§طھ ط§ظ„ظ…ظ‚ط·ط¹",
    "This is the maximum frame rate your clips will be recorded at.": "ظ‡ط°ط§ ظ‡ظˆ ط§ظ„ط­ط¯ ط§ظ„ط£ظ‚طµظ‰ ظ„ظ…ط¹ط¯ظ„ ط§ظ„ط¥ط·ط§ط±ط§طھ ظ„طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹.",
    "Clipping Keybind": "ظ…ظپطھط§ط­ طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹",
    "Set up your keybind to capture clips. The default is ALT + C.": "ظ‚ظ… ط¨طھط¹ظٹظٹظ† ظ…ظپطھط§ط­ ظ„ط§ط®طھطµط§ط± طھط³ط¬ظٹظ„ ط§ظ„ظ…ظ‚ط§ط·ط¹. ط§ظ„ط§ظپطھط±ط§ط¶ظٹ ظ‡ظˆ ALT + C.",
    "Edit Keybind": "طھط¹ط¯ظٹظ„ ط§ظ„ط§ط®طھطµط§ط±",
    "Storage Location": "ظ…ظƒط§ظ† ط§ظ„طھط®ط²ظٹظ†",
    "Choose where to store your clips.": "ط§ط®طھط± ظ…ظƒط§ظ† طھط®ط²ظٹظ† ط§ظ„ظ…ظ‚ط§ط·ط¹ ط§ظ„ط®ط§طµط© ط¨ظƒ.",
    "Allow my voice to be recorded in Clips": "ط§ظ„ط³ظ…ط§ط­ ط¨طھط³ط¬ظٹظ„ طµظˆطھظٹ ظپظٹ ط§ظ„ظ…ظ‚ط§ط·ط¹",
    "By turning on this setting, your voice may be included when someone in the same voice channel uses Clips.": "ط¨طھظپط¹ظٹظ„ ظ‡ط°ط§ ط§ظ„ط®ظٹط§ط±طŒ ظ‚ط¯ ظٹطھظ… طھط¶ظ…ظٹظ† طµظˆطھظƒ ط¹ظ†ط¯ظ…ط§ ظٹط³طھط®ط¯ظ… ط´ط®طµ ط¢ط®ط± ظپظٹ ظ†ظپط³ ط§ظ„ظ‚ظ†ط§ط© ط§ظ„طµظˆطھظٹط© ظ…ظٹط²ط© ط§ظ„ظ…ظ‚ط§ط·ط¹.",
    "Invites": "ط§ظ„ط¯ط¹ظˆط§طھ",
    "Access": "ط§ظ„ظˆطµظˆظ„",
    "MODERATION": "ط§ظ„ط¥ط´ط±ط§ظپ",
    "Safety Setup": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط£ظ…ط§ظ†",
    "Audit Log": "ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚",
    "Bans": "ط§ظ„ط­ط¸ط±",
    "Community Overview": "ظ†ط¸ط±ط© ط¹ط§ظ…ط© ط¹ظ„ظ‰ ط§ظ„ظ…ط¬طھظ…ط¹",
    "Onboarding": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط§ظ†ط¶ظ…ط§ظ…",
    "Enable Monetization": "طھظ…ظƒظٹظ† ط§ظ„ط±ط¨ط­",
    "Server Boost Status": "ط­ط§ظ„ط© طھط¹ط²ظٹط² ط§ظ„ط³ظٹط±ظپط±",
    "How Discord uses your data": "ظƒظٹظپ ظٹط³طھط®ط¯ظ… Discord ط¨ظٹط§ظ†ط§طھظƒ",
    "Use data to improve Discord": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ„طھط­ط³ظٹظ† Discord",
    "Accessibility": "ط³ظ‡ظˆظ„ط© ط§ظ„ظˆطµظˆظ„",
    "Chat": "ط£ط¹ط¯ط§ط¯طھ ط§ظ„ط´ط§طھ",
    "Copy Image": "ظ†ط³ط® ط§ظ„طµظˆط±ط©",
    "Add Note": "ط£ط¶ط§ظپط© ظ…ط°ظƒط±ط©",
    "Mute Channel": "ظƒطھظ… ط§ظ„ط±ظˆظ…",
    "Notification Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ",
    "Edit Channel": "ط£ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط±ظˆظ…",
    "Duplicate Channel": "ظ†ط³ط® ط§ظ„ط±ظˆظ…",
    "Create Text Channel": "ط£ظ†ط´ط§ط، ط±ظˆظ… ط¬ط¯ظٹط¯",
    "Channel Type": "ظ†ظˆط¹ ط§ظ„ظ‚ظ†ط§ط©",
    "# Text": "ظ†طµ",
    "Send messages, images, GIFs, emoji, opinions, and puns": "ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ط¦ظ„طŒ ط§ظ„طµظˆط±طŒ ط§ظ„طµظˆط± ط§ظ„ظ…طھط­ط±ظƒط© (GIF)طŒ ط§ظ„ط±ظ…ظˆط² ط§ظ„طھط¹ط¨ظٹط±ظٹط©طŒ ط§ظ„ط¢ط±ط§ط، ظˆط§ظ„ظ†ظƒط§طھ",
    "Voice": "طµظˆطھ",
    "Hang out together with voice, video, and screen share": "ط§ظ„طھظˆط§طµظ„ ظ…ط¹ ط§ظ„ط¢ط®ط±ظٹظ† ط¨ط§ظ„طµظˆطھ ظˆط§ظ„ظپظٹط¯ظٹظˆ ظˆظ…ط´ط§ط±ظƒط© ط§ظ„ط´ط§ط´ط©",
    "Forum": "ظ…ظ†طھط¯ظ‰",
    "Create a space for organized discussions": "ط¥ظ†ط´ط§ط، ظ…ط³ط§ط­ط© ظ„ظ„ظ†ظ‚ط§ط´ط§طھ ط§ظ„ظ…ظ†ط¸ظ…ط©",
    "Announcement": "ط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ",
    "Important updates for people in and out of the server": "طھط­ط¯ظٹط«ط§طھ ظ…ظ‡ظ…ط© ظ„ظ„ط£ط´ط®ط§طµ ط¯ط§ط®ظ„ ظˆط®ط§ط±ط¬ ط§ظ„ط³ظٹط±ظپط±",
    "Stage": "ط§ظ„ظ…ط±ط­ظ„ط©",
    "Host events, panels, and Q&As for an audience": "ط§ط³طھط¶ط§ظپط© ظپط¹ط§ظ„ظٹط§طھطŒ ط­ظ„ظ‚ط§طھ ظ†ظ‚ط§ط´طŒ ظˆط¬ظ„ط³ط§طھ ط£ط³ط¦ظ„ط© ظˆط£ط¬ظˆط¨ط© ظ„ظ„ط¬ظ…ظ‡ظˆط±",
    "Mark As Read": "ظˆط¶ط¹ ط¹ظ„ط§ظ…ط© ظƒظ…ظ‚ط±ظˆط،",
    "Join Thread": "ط§ظ„ط§ظ†ط¶ظ…ط§ظ… ط¥ظ„ظ‰ ط§ظ„ظ…ظˆط¶ظˆط¹",
    "Close Thread": "ط¥ط؛ظ„ط§ظ‚ ط§ظ„ظ…ظˆط¶ظˆط¹",
    "Lock Thread": "ظ‚ظپظ„ ط§ظ„ظ…ظˆط¶ظˆط¹",
    "Edit Thread": "طھط¹ط¯ظٹظ„ ط§ظ„ظ…ظˆط¶ظˆط¹",
    "Mute Thread": "ظƒطھظ… ط§ظ„ظ…ظˆط¶ظˆط¹",
    "Anyone can invite": "ظٹظ…ظƒظ† ظ„ط£ظٹ ط´ط®طµ ط¯ط¹ظˆط© ط§ظ„ط¢ط®ط±ظٹظ†",
    "Private Channel": "ط¬ط¹ظ„ ط§ظ„ظ‚ظ†ط§ط© ط®ط§طµط©",
    "More": "ط§ظ„ظ…ط²ظٹط¯",
    "View Server As Role": "ط¹ط±ط¶ ط§ظ„ط³ظٹط±ظپط± ظƒط±ظˆظ„",
    "banner Color": "ظ„ظˆظ† ط§ظ„ط¨ظ†ط±",
    "Save Image": "ط­ظپط¸ ط§ظ„طµظˆط±ط©",
    "Copy Link": "ظ†ط³ط® ط§ظ„ط±ط§ط¨ط·",
    "Open Link": "ظپطھط­ ظپظٹ ط§ظ„ظ…طھطµظپط­",
    "Add Reaction": "ط£ط¶ط§ظپط© طھط¹ط§ط¨ظٹط±",
    "Delete Message": "ط­ط°ظپ ط§ظ„ط±ط³ط§ظ„ط©",
    "Are you sure you want to delete this message?": "ظ‡ظ„ ط§ظ†طھ ظ…طھط§ظƒط¯ ظ…ظ† ط­ط°ظپ ظ‡ط°ظ‡ ط§ظ„ط±ط³ط§ظ„ط© ظ…ظ† ط§ظ„ظ…ط­ط¯ط«ط§طھ !!",
    "Accept": "ظ‚ط¨ظˆظ„ ط§ظ„طµط¯ط§ظ‚ط©",
    "Start Voice Call": "ط£طھطµظ„ ظپظٹ طµط¯ظٹظ‚ظƒ",
    "Start Video Call": "ط£طھطµظ„ ظپظٹط¯ظٹظˆ ",
    "Pinned Messages": "طھط«ط¨ظٹطھ ط§ظ„ظ…ط­ط¯ط«ط§طھ",
    "Add Friends to DM": "ط¥ط¶ط§ظپط© ط£طµط¯ظ‚ط§ط، ط¥ظ„ظ‰ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ط®ط§طµط©",
    "Hide User Profile": "ط§ط®ظپط§ط، ط§ظ„ظٹظˆط²ط±",
    "Edit Message": "طھط¹ط¯ظٹظ„ ط§ظ„ط±ط³ط§ظ„ط©",
    "Reply": "ط§ظ„ط±ط¯",
    "Forward": "ط¥ط¹ط§ط¯ط© ط§ظ„ط¥ط±ط³ط§ظ„",
    "Copy Text": "ظ†ط³ط® ط§ظ„ظ†طµ",
    "Pin Message": "طھط«ط¨ظٹطھ ط§ظ„ط±ط³ط§ظ„ط©",
    "Apps": "ط§ظ„طھط·ط¨ظٹظ‚ط§طھ",
    "Mark Unread": "ظˆط¶ط¹ ط¹ظ„ط§ظ…ط© ظƒط؛ظٹط± ظ…ظ‚ط±ظˆط،",
    "Copy Message Link": "ظ†ط³ط® ط±ط§ط¨ط· ط§ظ„ط±ط³ط§ظ„ط©",
    "Speak Message": "ظ‚ط±ط§ط،ط© ط§ظ„ط±ط³ط§ظ„ط©",
    "All": "ط§ظ„ط¬ظ…ظٹط¹",
    "Accept Friend Request": "ظ‚ط¨ظˆظ„ ط§ظ„طµط¯ط§ظ‚ط©",
    "Search": "ظ‚ط§ط¦ظ…ط© ط§ظ„ط¨ط­ط«",
    "ظŒReceived": "طھظ… ط§ظ„ط§ط³طھظ„ط§ظ…",
    "Friends": "ط§ظ„ط¥طµط¯ظ‚ط§ط،",
    "Shop": "ظ…طھط¬ط± ط§ظ„ط¯ظٹط³ظƒظˆط±ط¯",
    "Nitro Home": "ظ‚ط§ط¦ظ…ط© ط§ظ„ظ†ظٹطھط±ظˆ",
    "Learn more": "ظ…ط²ظٹط¯ ظ…ظ† ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ",
    "In-game rewards (aka Quests)": "ط§ظ„ظ…ظƒط§ظپط¢طھ ط¯ط§ط®ظ„ ط§ظ„ظ„ط¹ط¨ط© (ط§ظ„ظ…ظ‡ط§ظ…)",
    "Use data to personalize my Discord experience": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ„طھط®طµظٹطµ طھط¬ط±ط¨طھظٹ ط¹ظ„ظ‰ Discord",
    "Use data to make Discord work": "ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ„ط¬ط¹ظ„ Discord ظٹط¹ظ…ظ„ ط¨ط´ظƒظ„ ط£ظپط¶ظ„",
    "Request your data": "ط§ط·ظ„ط¨ ط¨ظٹط§ظ†ط§طھظƒ",
    "Request all of my data": "ط§ط·ظ„ط¨ ظƒظ„ ط¨ظٹط§ظ†ط§طھظٹ",
    "Windows Settings": "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظˆظٹظ†ط¯ظˆط²",
    "Streamer Mode": "ظˆط¶ط¹ ط§ظ„ط¨ط« ًںژ¥",
    "Billing": "ظپظˆط§طھظٹط± ط§ظ„ط´ط±ط§ط،"
};

let observer: MutationObserver | null = null;
let supportButtons: HTMLElement | null = null;

// ظˆط¸ظٹظپط© ط§ظ„طھط±ط¬ظ…ط© ط§ظ„ط§ط­طھط±ط§ظپظٹط© ط¨ط§ط³طھط®ط¯ط§ظ… TreeWalker (ظ…ظ‚ط§ظˆظ…ط© ظ„ظ„ط§ظ†ظ‡ظٹط§ط± طھظ…ط§ظ…ط§ظ‹ ظˆطھطھط­ظ…ظ„ ط§ظ„طµظپط­ط§طھ ط§ظ„ط¶ط®ظ…ط©)
function translateElement(rootNode: Node) {
    if (!rootNode) return;

    // طھط±ط¬ظ…ط© ط§ظ„ط¹ظ‚ط¯ط© ط§ظ„ط£ط³ط§ط³ظٹط© ط£ظˆظ„ط§ظ‹ ط¥ط°ط§ ظƒط§ظ†طھ ظ†طµظٹط© ط£ظˆ طھط­طھظˆظٹ ط¹ظ„ظ‰ Placeholder
    if (rootNode.nodeType === Node.TEXT_NODE) {
        const text = rootNode.textContent?.trim();
        if (text && translations[text]) {
            rootNode.textContent = translations[text];
        }
    } else if (rootNode.nodeType === Node.ELEMENT_NODE) {
        const el = rootNode as HTMLInputElement;
        if (el.placeholder && translations[el.placeholder]) {
            el.placeholder = translations[el.placeholder];
        }
    }

    // ط§ظ„ظپط­طµ ط§ظ„ط´ط§ظ…ظ„ ظˆط§ظ„ط¢ظ…ظ† ظ„ظƒظ„ ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ظپط±ط¹ظٹط© ط¨ط¯ظˆظ† ط§ظ„ط§ط³طھط¯ط¹ط§ط، ط§ظ„ط°ط§طھظٹ ط§ظ„ظ…طھظƒط±ط± (No Recursion)
    const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        null
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            const text = currentNode.textContent?.trim();
            if (text && translations[text]) {
                currentNode.textContent = translations[text];
            }
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const el = currentNode as HTMLInputElement;
            if (el.placeholder && translations[el.placeholder]) {
                el.placeholder = translations[el.placeholder];
            }
        }
        currentNode = walker.nextNode();
    }
}

// ظˆط¸ظٹظپط© ط¥ط¯ط§ط±ط© ط£ط²ط±ط§ط± ط§ظ„ط¯ط¹ظ… (ط¥ط¸ظ‡ط§ط±/ط¥ط®ظپط§ط،)
function manageSupportButtons(show: boolean) {
    if (show) {
        if (document.getElementById("arabic-vi3-support")) return;

        supportButtons = document.createElement("div");
        supportButtons.id = "arabic-vi3-support";
        supportButtons.style.cssText = "position: fixed; bottom: 50px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";

        supportButtons.innerHTML = `
            <a href="https://paypal.me/V1store?locale.x=ar_EG&country.x=SA" target="_blank">
                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" style="width: 32px; height: 32px; cursor: pointer;">
            </a>
            <a href="https://discord.gg/vi3myl" target="_blank">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/018/930/718/small_2x/discord-logo-discord-icon-transparent-free-png.png" style="width: 32px; height: 32px; cursor: pointer;">
            </a>
            <a href="https://www.youtube.com/vi3myl" target="_blank">
                <img src="https://www.pngplay.com/wp-content/uploads/13/YouTube-Background-PNG.png" style="width: 32px; height: 32px; cursor: pointer;">
            </a>
        `;
        document.body.appendChild(supportButtons);
    } else {
        if (supportButtons && supportButtons.parentNode) {
            supportButtons.parentNode.removeChild(supportButtons);
            supportButtons = null;
        } else {
            const existingBtn = document.getElementById("arabic-vi3-support");
            if (existingBtn) existingBtn.remove();
        }
    }
}

export default definePlugin({
    name: "Ardiscord", // طھط£ظƒط¯ ط£ظ† ط§ظ„ط§ط³ظ… ظٹط·ط§ط¨ظ‚ ط§ط³ظ… ط§ظ„ظ…ط¬ظ„ط¯ طھظ…ط§ظ…ط§ظ‹
    description: "طھط¹ط±ظٹط¨ ظˆط§ط¬ظ‡ط© ط¯ظٹط³ظƒظˆط±ط¯ ط¨ط§ظ„ظƒط§ظ…ظ„ ظ…ط¹ ط®ظٹط§ط±ط§طھ ط§ظ„طھط­ظƒظ… ط¨ط£ط²ط±ط§ط± ط§ظ„ط¯ط¹ظ….",
    authors: [{ name: "0x.vi3myl", id: 1135886879372357764n }],

    settings,

    start() {
        // ط­ظ…ط§ظٹط© ط§ظ„طھط±ط¬ظ…ط© ظˆط§ظ„ظ…ط±ط§ظ‚ط¨ ط¨ظ€ try-catch ظ„ظ…ظ†ط¹ طھط¹ط·ظٹظ„ ط§ظ„ط¨ظ„ظˆظ‚ظ† ط¹ظ†ط¯ ط§ظ„ط±ظٹط³طھط§ط±طھ
        try {
            observer = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    mutation.addedNodes.forEach(node => {
                        translateElement(node);
                    });
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
            translateElement(document.body);
        } catch (error) {
            console.error("[Ardiscord] Translation init error:", error);
        }

        // ط­ظ…ط§ظٹط© طھط´ط؛ظٹظ„ ط§ظ„ط£ط²ط±ط§ط± ظˆظ…ط³طھظ…ط¹ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ
        try {
            manageSupportButtons(settings.store.showSupportButtons);

            if (settings && typeof settings.addListener === "function") {
                settings.addListener(() => {
                    manageSupportButtons(settings.store.showSupportButtons);
                });
            }
        } catch (error) {
            console.error("[Ardiscord] Settings init error:", error);
        }
    },

    stop() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        manageSupportButtons(false);
    }
});
