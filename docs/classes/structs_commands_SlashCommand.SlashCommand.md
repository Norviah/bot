[Bot](../README.md) / [structs/commands/SlashCommand](../modules/structs_commands_SlashCommand.md) / SlashCommand

# Class: SlashCommand

[structs/commands/SlashCommand](../modules/structs_commands_SlashCommand.md).SlashCommand

The base structure for slash commands.

Slash commands are a type of application command, they are Discord's own
implementation of commands. They provide a variety of features that are not
present when using commands simply as messages.

Slash commands are an essential part of a Discord application, they allow
users to interact with the application in variety of ways. They are invoked
by typing `/` in a channel or DM, selecting the desired command from the
autocomplete menu.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#slash-commands

## Hierarchy

- [`BaseCommand`](structs_commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType.ChatInput`\>

  ↳ **`SlashCommand`**

## Table of contents

### Constructors

- [constructor](structs_commands_SlashCommand.SlashCommand.md#constructor)

### Properties

- [category](structs_commands_SlashCommand.SlashCommand.md#category)
- [clientPermissions](structs_commands_SlashCommand.SlashCommand.md#clientpermissions)
- [description](structs_commands_SlashCommand.SlashCommand.md#description)
- [descriptionLocalizations](structs_commands_SlashCommand.SlashCommand.md#descriptionlocalizations)
- [dm](structs_commands_SlashCommand.SlashCommand.md#dm)
- [guilds](structs_commands_SlashCommand.SlashCommand.md#guilds)
- [handler](structs_commands_SlashCommand.SlashCommand.md#handler)
- [logger](structs_commands_SlashCommand.SlashCommand.md#logger)
- [name](structs_commands_SlashCommand.SlashCommand.md#name)
- [nameLocalizations](structs_commands_SlashCommand.SlashCommand.md#namelocalizations)
- [nsfw](structs_commands_SlashCommand.SlashCommand.md#nsfw)
- [options](structs_commands_SlashCommand.SlashCommand.md#options)
- [permissions](structs_commands_SlashCommand.SlashCommand.md#permissions)
- [type](structs_commands_SlashCommand.SlashCommand.md#type)
- [util](structs_commands_SlashCommand.SlashCommand.md#util)

### Methods

- [exec](structs_commands_SlashCommand.SlashCommand.md#exec)
- [initialize](structs_commands_SlashCommand.SlashCommand.md#initialize)
- [isContextCommand](structs_commands_SlashCommand.SlashCommand.md#iscontextcommand)
- [isMessageContextCommand](structs_commands_SlashCommand.SlashCommand.md#ismessagecontextcommand)
- [isSlashCommand](structs_commands_SlashCommand.SlashCommand.md#isslashcommand)
- [isUserContextCommand](structs_commands_SlashCommand.SlashCommand.md#isusercontextcommand)
- [onError](structs_commands_SlashCommand.SlashCommand.md#onerror)
- [toJSON](structs_commands_SlashCommand.SlashCommand.md#tojson)

## Constructors

### constructor

• **new SlashCommand**(`handler`)

Initializes a new `Module` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`Handler`](structs_handlers_Handler.Handler.md)<[`Module`](structs_Module.Module.md)\> | The handler that manages the module. |

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[constructor](structs_commands_BaseCommand.BaseCommand.md#constructor)

#### Defined in

[src/structs/Module.ts:69](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L69)

## Properties

### category

• `Readonly` **category**: `string` = `'default'`

The category that the module belongs to.

Modules are pieces of functionality that are grouped together, however,
modules can further be grouped together. This property can be used to
group modules together within the handler.

For example, commands are pieces of modules that can be represented through
the `Module` class. In addition, modules can be grouped together by their
purpose, such as administration commands or music commands.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[category](structs_commands_BaseCommand.BaseCommand.md#category)

#### Defined in

[src/structs/Module.ts:36](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L36)

___

### clientPermissions

• `Optional` `Readonly` **clientPermissions**: (``"CreateInstantInvite"`` \| ``"KickMembers"`` \| ``"BanMembers"`` \| ``"Administrator"`` \| ``"ManageChannels"`` \| ``"ManageGuild"`` \| ``"AddReactions"`` \| ``"ViewAuditLog"`` \| ``"PrioritySpeaker"`` \| ``"Stream"`` \| ``"ViewChannel"`` \| ``"SendMessages"`` \| ``"SendTTSMessages"`` \| ``"ManageMessages"`` \| ``"EmbedLinks"`` \| ``"AttachFiles"`` \| ``"ReadMessageHistory"`` \| ``"MentionEveryone"`` \| ``"UseExternalEmojis"`` \| ``"ViewGuildInsights"`` \| ``"Connect"`` \| ``"Speak"`` \| ``"MuteMembers"`` \| ``"DeafenMembers"`` \| ``"MoveMembers"`` \| ``"UseVAD"`` \| ``"ChangeNickname"`` \| ``"ManageNicknames"`` \| ``"ManageRoles"`` \| ``"ManageWebhooks"`` \| ``"ManageEmojisAndStickers"`` \| ``"ManageGuildExpressions"`` \| ``"UseApplicationCommands"`` \| ``"RequestToSpeak"`` \| ``"ManageEvents"`` \| ``"ManageThreads"`` \| ``"CreatePublicThreads"`` \| ``"CreatePrivateThreads"`` \| ``"UseExternalStickers"`` \| ``"SendMessagesInThreads"`` \| ``"UseEmbeddedActivities"`` \| ``"ModerateMembers"`` \| ``"ViewCreatorMonetizationAnalytics"`` \| ``"UseSoundboard"`` \| ``"UseExternalSounds"`` \| ``"SendVoiceMessages"``)[]

Permissions the client needs in order to execute the command.

This property differs from the `permissions` property as it is in regards
to the client itself. If specified, the client will check that it has all
provided permissions before executing the command.

If the client is missing any of the provided permissions, the command will
not be executed.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[clientPermissions](structs_commands_BaseCommand.BaseCommand.md#clientpermissions)

#### Defined in

[src/structs/commands/BaseCommand.ts:90](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L90)

___

### description

• `Readonly` `Abstract` **description**: `string`

The command's description.

An in-depth description of the command, this property should present a
thorough description of the command and its functionality.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[description](structs_commands_BaseCommand.BaseCommand.md#description)

#### Defined in

[src/structs/commands/BaseCommand.ts:40](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L40)

___

### descriptionLocalizations

• `Optional` `Readonly` **descriptionLocalizations**: `Partial`<`Record`<``"id"`` \| ``"en-US"`` \| ``"en-GB"`` \| ``"bg"`` \| ``"zh-CN"`` \| ``"zh-TW"`` \| ``"hr"`` \| ``"cs"`` \| ``"da"`` \| ``"nl"`` \| ``"fi"`` \| ``"fr"`` \| ``"de"`` \| ``"el"`` \| ``"hi"`` \| ``"hu"`` \| ``"it"`` \| ``"ja"`` \| ``"ko"`` \| ``"lt"`` \| ``"no"`` \| ``"pl"`` \| ``"pt-BR"`` \| ``"ro"`` \| ``"ru"`` \| ``"es-ES"`` \| ``"sv-SE"`` \| ``"th"`` \| ``"tr"`` \| ``"uk"`` \| ``"vi"``, ``null`` \| `string`\>\>

Localization dictionary for the command's name.

Represents the localization dictionary for the command's description, which
will cause the application to use the localcized description dependent on
the client's selected language.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#localization

#### Defined in

[src/structs/commands/SlashCommand.ts:32](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L32)

___

### dm

• `Optional` `Readonly` **dm**: `boolean`

Indicates whether if the command is available within the client's DMs.

This flag is only applicable for globally-scoped commands, it is ignored
for guild-specific commands.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[dm](structs_commands_BaseCommand.BaseCommand.md#dm)

#### Defined in

[src/structs/commands/BaseCommand.ts:98](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L98)

___

### guilds

• `Optional` `Readonly` **guilds**: `string`[]

The guilds to restrict the command to.

If specified, the command will be deployed *only* the specified guilds,
meaning the command will not be available globally.

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#registering-a-command

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[guilds](structs_commands_BaseCommand.BaseCommand.md#guilds)

#### Defined in

[src/structs/commands/BaseCommand.ts:118](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L118)

___

### handler

• `Readonly` **handler**: [`Handler`](structs_handlers_Handler.Handler.md)<[`SlashCommand`](structs_commands_SlashCommand.SlashCommand.md)\>

A reference to the handler that manages this module.

This property references the handler that manages the module, allowing the
module to access the Discord client and other modules within the handler.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[handler](structs_commands_BaseCommand.BaseCommand.md#handler)

#### Defined in

[src/structs/Module.ts:62](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L62)

___

### logger

• `Readonly` **logger**: `Logger` = `logger`

The logging system.

A useful logging system that prints messages in a structured format, all
logs are additionally stored in a file for future reference.

**`See`**

https://github.com/norviah/logger

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[logger](structs_commands_BaseCommand.BaseCommand.md#logger)

#### Defined in

[src/structs/Module.ts:46](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L46)

___

### name

• `Readonly` `Abstract` **name**: `string`

The module's name.

This will represent how the module is referenced within the handler and
possible error messages.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[name](structs_commands_BaseCommand.BaseCommand.md#name)

#### Defined in

[src/structs/Module.ts:23](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L23)

___

### nameLocalizations

• `Optional` `Readonly` **nameLocalizations**: `Partial`<`Record`<``"id"`` \| ``"en-US"`` \| ``"en-GB"`` \| ``"bg"`` \| ``"zh-CN"`` \| ``"zh-TW"`` \| ``"hr"`` \| ``"cs"`` \| ``"da"`` \| ``"nl"`` \| ``"fi"`` \| ``"fr"`` \| ``"de"`` \| ``"el"`` \| ``"hi"`` \| ``"hu"`` \| ``"it"`` \| ``"ja"`` \| ``"ko"`` \| ``"lt"`` \| ``"no"`` \| ``"pl"`` \| ``"pt-BR"`` \| ``"ro"`` \| ``"ru"`` \| ``"es-ES"`` \| ``"sv-SE"`` \| ``"th"`` \| ``"tr"`` \| ``"uk"`` \| ``"vi"``, ``null`` \| `string`\>\>

Localization dictionary for the command's name.

Represents the localization dictionary for the command's name, which will
cause the application to use the localcized name dependent on the client's
selected language.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#localization

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[nameLocalizations](structs_commands_BaseCommand.BaseCommand.md#namelocalizations)

#### Defined in

[src/structs/commands/BaseCommand.ts:61](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L61)

___

### nsfw

• `Optional` `Readonly` **nsfw**: `boolean`

Indicates whether if the command should be age-restricted.

Commands that contains age-restricted content should be marked as such,
this will limit who can see and access the command.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[nsfw](structs_commands_BaseCommand.BaseCommand.md#nsfw)

#### Defined in

[src/structs/commands/BaseCommand.ts:108](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L108)

___

### options

• `Optional` `Readonly` **options**: `ApplicationCommandOptionData`[]

Any options for the command.

Commands may have options, which can be thought of as arguments to a
function, these provide a way for the user to provide additional
information the command may need.

When the command is called, the user will be prompted to provide these
options, in addition to any auto-completion that may be provided - such as
a list of channels.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure

#### Defined in

[src/structs/commands/SlashCommand.ts:58](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L58)

___

### permissions

• `Optional` `Readonly` **permissions**: (``"CreateInstantInvite"`` \| ``"KickMembers"`` \| ``"BanMembers"`` \| ``"Administrator"`` \| ``"ManageChannels"`` \| ``"ManageGuild"`` \| ``"AddReactions"`` \| ``"ViewAuditLog"`` \| ``"PrioritySpeaker"`` \| ``"Stream"`` \| ``"ViewChannel"`` \| ``"SendMessages"`` \| ``"SendTTSMessages"`` \| ``"ManageMessages"`` \| ``"EmbedLinks"`` \| ``"AttachFiles"`` \| ``"ReadMessageHistory"`` \| ``"MentionEveryone"`` \| ``"UseExternalEmojis"`` \| ``"ViewGuildInsights"`` \| ``"Connect"`` \| ``"Speak"`` \| ``"MuteMembers"`` \| ``"DeafenMembers"`` \| ``"MoveMembers"`` \| ``"UseVAD"`` \| ``"ChangeNickname"`` \| ``"ManageNicknames"`` \| ``"ManageRoles"`` \| ``"ManageWebhooks"`` \| ``"ManageEmojisAndStickers"`` \| ``"ManageGuildExpressions"`` \| ``"UseApplicationCommands"`` \| ``"RequestToSpeak"`` \| ``"ManageEvents"`` \| ``"ManageThreads"`` \| ``"CreatePublicThreads"`` \| ``"CreatePrivateThreads"`` \| ``"UseExternalStickers"`` \| ``"SendMessagesInThreads"`` \| ``"UseEmbeddedActivities"`` \| ``"ModerateMembers"`` \| ``"ViewCreatorMonetizationAnalytics"`` \| ``"UseSoundboard"`` \| ``"UseExternalSounds"`` \| ``"SendVoiceMessages"``)[]

Default permissions for the command.

Note that these permissions represent the ***default*** permissions for the
command when the command is first deployed to a guild or when the
application joins a new guild.

These permissions are only the default and can be altered by guild
administrators, allowing them to configure access however they see fit. Due
to this, **it is highly advised** to not implement commands that are
dev-only which use actions such as `eval`.

**`See`**

 - https://discord.com/developers/docs/interactions/slash-commands#permissions
 - https://discordjs.guide/slash-commands/permissions.html#member-permissions

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[permissions](structs_commands_BaseCommand.BaseCommand.md#permissions)

#### Defined in

[src/structs/commands/BaseCommand.ts:78](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L78)

___

### type

• `Readonly` **type**: `ChatInput` = `ApplicationCommandType.ChatInput`

The type of command.

This property informs Discord the of the command's type, allowng them to
provide the command to the user in the correct context. As this command
represents a slash command, the type is set to `CHAT_INPUT`.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types

#### Overrides

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[type](structs_commands_BaseCommand.BaseCommand.md#type)

#### Defined in

[src/structs/commands/SlashCommand.ts:43](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L43)

___

### util

• `Readonly` **util**: [`ModuleUtil`](structs_ModuleUtil.ModuleUtil.md)

A collection of helpful methods for the module.

This property references a collection of helpful methods that can be used
by the module.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[util](structs_commands_BaseCommand.BaseCommand.md#util)

#### Defined in

[src/structs/Module.ts:54](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L54)

## Methods

### exec

▸ `Abstract` **exec**(`interaction`): `Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

The command's execution method.

This method is called when a user calls the command in Discord, it is
responsible for executing the command's logic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `ChatInputCommandInteraction`<`CacheType`\> | The interaction that invoked the command. |

#### Returns

`Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

The response to send to the interaction.

#### Overrides

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[exec](structs_commands_BaseCommand.BaseCommand.md#exec)

#### Defined in

[src/structs/commands/SlashCommand.ts:69](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L69)

___

### initialize

▸ `Optional` **initialize**(): `void`

Further initialization logic for the module after it has been imported by
the handler.

Once the handler has imported and initialized all modules, this method is
called on each module. If desired, this method can be implemented to
further initialize the module once imported.

#### Returns

`void`

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[initialize](structs_commands_BaseCommand.BaseCommand.md#initialize)

#### Defined in

[src/structs/Module.ts:85](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/Module.ts#L85)

___

### isContextCommand

▸ **isContextCommand**(): this is ContextCommand<User\> \| ContextCommand<Message\>

Indicates whether if the command is a context command.

#### Returns

this is ContextCommand<User\> \| ContextCommand<Message\>

Whether if the command is a context command.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[isContextCommand](structs_commands_BaseCommand.BaseCommand.md#iscontextcommand)

#### Defined in

[src/structs/commands/BaseCommand.ts:192](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L192)

___

### isMessageContextCommand

▸ **isMessageContextCommand**(): this is ContextCommand<Message\>

Indicates whether if the command is a message context command.

#### Returns

this is ContextCommand<Message\>

Whether if the command is a message context command.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[isMessageContextCommand](structs_commands_BaseCommand.BaseCommand.md#ismessagecontextcommand)

#### Defined in

[src/structs/commands/BaseCommand.ts:210](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L210)

___

### isSlashCommand

▸ **isSlashCommand**(): this is SlashCommand

Indicates whether if the command is a slash command.

#### Returns

this is SlashCommand

Whether if the command is a slash command.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[isSlashCommand](structs_commands_BaseCommand.BaseCommand.md#isslashcommand)

#### Defined in

[src/structs/commands/BaseCommand.ts:183](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L183)

___

### isUserContextCommand

▸ **isUserContextCommand**(): this is ContextCommand<User\>

Indicates whether if the command is a user context command.

#### Returns

this is ContextCommand<User\>

Whether if the command is a user context command.

#### Inherited from

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[isUserContextCommand](structs_commands_BaseCommand.BaseCommand.md#isusercontextcommand)

#### Defined in

[src/structs/commands/BaseCommand.ts:201](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/BaseCommand.ts#L201)

___

### onError

▸ **onError**(`interaction`, `error`): `Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

Invoked if the command throws an error during execution.

During the execution of the command, if an error is thrown, this method is
then called. This method should be implemented to handle the error and
generate a response, which will be sent to the user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `ChatInputCommandInteraction`<`CacheType`\> | The interaction that invoked the command. |
| `error` | `Error` | The error that was thrown. |

#### Returns

`Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

The response to send to the interaction.

#### Overrides

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[onError](structs_commands_BaseCommand.BaseCommand.md#onerror)

#### Defined in

[src/structs/commands/SlashCommand.ts:82](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L82)

___

### toJSON

▸ **toJSON**(): [`Explicit`](../modules/types_ts_Explicit.md#explicit)<`ChatInputApplicationCommandData`\>

The command serialized into a JSON object.

When deploying a command to Discord, we'll need to send a JSON payload
describing the command, this method serializes the information of the
command into a JSON object.

#### Returns

[`Explicit`](../modules/types_ts_Explicit.md#explicit)<`ChatInputApplicationCommandData`\>

The base information regarding the command serialized into a JSON

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-structure

#### Overrides

[BaseCommand](structs_commands_BaseCommand.BaseCommand.md).[toJSON](structs_commands_BaseCommand.BaseCommand.md#tojson)

#### Defined in

[src/structs/commands/SlashCommand.ts:96](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/commands/SlashCommand.ts#L96)
