[Bot](../README.md) / [Modules](../modules.md) / [structs/commands/BaseCommand](../modules/structs_commands_BaseCommand.md) / BaseCommand

# Class: BaseCommand<T\>

[structs/commands/BaseCommand](../modules/structs_commands_BaseCommand.md).BaseCommand

The base structure for commands.

Commands are an essential part of a Discord application, they allow users to
interact with the application in variety of ways. Through commands, the
application can receive input from users and execute actions based on that
input.

In a Discord application, there are three types of commands:

  1. Slash commands - commands that are invoked by typing a `/` in a channel
     or DM.
  2. User context menu commands - commands that are invoked by right-clicking
     on a user and selecting the command from the context menu.
  3. Message context menu commands - commands that are invoked by right-
     clicking on a message and selecting the command from the context menu.

`BaseCommand` represents the base structure for commands, providing the basic
functionality that is shared between all types of commands.

**`See`**

https://discord.com/developers/docs/interactions/application-commands

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `ApplicationCommandType` | The type of command. |

## Hierarchy

- [`Module`](structs_Module.Module.md)

  ↳ **`BaseCommand`**

  ↳↳ [`ContextCommand`](structs_commands_ContextCommand.ContextCommand.md)

  ↳↳ [`SlashCommand`](structs_commands_SlashCommand.SlashCommand.md)

## Table of contents

### Constructors

- [constructor](structs_commands_BaseCommand.BaseCommand.md#constructor)

### Properties

- [category](structs_commands_BaseCommand.BaseCommand.md#category)
- [clientPermissions](structs_commands_BaseCommand.BaseCommand.md#clientpermissions)
- [description](structs_commands_BaseCommand.BaseCommand.md#description)
- [dm](structs_commands_BaseCommand.BaseCommand.md#dm)
- [guilds](structs_commands_BaseCommand.BaseCommand.md#guilds)
- [handler](structs_commands_BaseCommand.BaseCommand.md#handler)
- [logger](structs_commands_BaseCommand.BaseCommand.md#logger)
- [name](structs_commands_BaseCommand.BaseCommand.md#name)
- [nameLocalizations](structs_commands_BaseCommand.BaseCommand.md#namelocalizations)
- [nsfw](structs_commands_BaseCommand.BaseCommand.md#nsfw)
- [permissions](structs_commands_BaseCommand.BaseCommand.md#permissions)
- [type](structs_commands_BaseCommand.BaseCommand.md#type)

### Methods

- [exec](structs_commands_BaseCommand.BaseCommand.md#exec)
- [initialize](structs_commands_BaseCommand.BaseCommand.md#initialize)
- [onError](structs_commands_BaseCommand.BaseCommand.md#onerror)
- [toJSON](structs_commands_BaseCommand.BaseCommand.md#tojson)

## Constructors

### constructor

• **new BaseCommand**<`T`\>(`handler`)

Initializes a new `Module` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ApplicationCommandType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`Handler`](structs_handlers_Handler.Handler.md)<[`Module`](structs_Module.Module.md)\> | The handler that manages the module. |

#### Inherited from

[Module](structs_Module.Module.md).[constructor](structs_Module.Module.md#constructor)

#### Defined in

[src/structs/Module.ts:59](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L59)

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

[Module](structs_Module.Module.md).[category](structs_Module.Module.md#category)

#### Defined in

[src/structs/Module.ts:34](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L34)

___

### clientPermissions

• `Optional` `Readonly` **clientPermissions**: (``"CreateInstantInvite"`` \| ``"KickMembers"`` \| ``"BanMembers"`` \| ``"Administrator"`` \| ``"ManageChannels"`` \| ``"ManageGuild"`` \| ``"AddReactions"`` \| ``"ViewAuditLog"`` \| ``"PrioritySpeaker"`` \| ``"Stream"`` \| ``"ViewChannel"`` \| ``"SendMessages"`` \| ``"SendTTSMessages"`` \| ``"ManageMessages"`` \| ``"EmbedLinks"`` \| ``"AttachFiles"`` \| ``"ReadMessageHistory"`` \| ``"MentionEveryone"`` \| ``"UseExternalEmojis"`` \| ``"ViewGuildInsights"`` \| ``"Connect"`` \| ``"Speak"`` \| ``"MuteMembers"`` \| ``"DeafenMembers"`` \| ``"MoveMembers"`` \| ``"UseVAD"`` \| ``"ChangeNickname"`` \| ``"ManageNicknames"`` \| ``"ManageRoles"`` \| ``"ManageWebhooks"`` \| ``"ManageEmojisAndStickers"`` \| ``"ManageGuildExpressions"`` \| ``"UseApplicationCommands"`` \| ``"RequestToSpeak"`` \| ``"ManageEvents"`` \| ``"ManageThreads"`` \| ``"CreatePublicThreads"`` \| ``"CreatePrivateThreads"`` \| ``"UseExternalStickers"`` \| ``"SendMessagesInThreads"`` \| ``"UseEmbeddedActivities"`` \| ``"ModerateMembers"`` \| ``"ViewCreatorMonetizationAnalytics"`` \| ``"UseSoundboard"`` \| ``"UseExternalSounds"`` \| ``"SendVoiceMessages"``)[]

Permissions the client needs in order to execute the command.

This property differs from the `permissions` property as it is in regards
to the client itself. If specified, the client will check that it has all
provided permissions before executing the command.

If the client is missing any of the provided permissions, the command will
not be executed.

#### Defined in

[src/structs/commands/BaseCommand.ts:89](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L89)

___

### description

• `Readonly` `Abstract` **description**: `string`

The command's description.

An in-depth description of the command, this property should present a
thorough description of the command and its functionality.

#### Defined in

[src/structs/commands/BaseCommand.ts:39](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L39)

___

### dm

• `Optional` `Readonly` **dm**: `boolean`

Indicates whether if the command is available within the client's DMs.

This flag is only applicable for globally-scoped commands, it is ignored
for guild-specific commands.

#### Defined in

[src/structs/commands/BaseCommand.ts:97](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L97)

___

### guilds

• `Optional` `Readonly` **guilds**: `string`[]

The guilds to restrict the command to.

If specified, the command will be deployed *only* the specified guilds,
meaning the command will not be available globally.

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#registering-a-command

#### Defined in

[src/structs/commands/BaseCommand.ts:117](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L117)

___

### handler

• `Readonly` **handler**: [`Handler`](structs_handlers_Handler.Handler.md)<[`BaseCommand`](structs_commands_BaseCommand.BaseCommand.md)<`T`\>\>

A reference to the handler that manages this module.

This property references the handler that manages the module, allowing the
module to access the Discord client and other modules within the handler.

#### Inherited from

[Module](structs_Module.Module.md).[handler](structs_Module.Module.md#handler)

#### Defined in

[src/structs/Module.ts:52](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L52)

___

### logger

• `Readonly` **logger**: `Logger` = `logger`

The logging system.

A useful logging system that prints messages in a structured format, all
logs are additionally stored in a file for future reference.

**`See`**

https://github.com/norviah/logger

#### Inherited from

[Module](structs_Module.Module.md).[logger](structs_Module.Module.md#logger)

#### Defined in

[src/structs/Module.ts:44](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L44)

___

### name

• `Readonly` `Abstract` **name**: `string`

The module's name.

This will represent how the module is referenced within the handler and
possible error messages.

#### Inherited from

[Module](structs_Module.Module.md).[name](structs_Module.Module.md#name)

#### Defined in

[src/structs/Module.ts:21](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L21)

___

### nameLocalizations

• `Optional` `Readonly` **nameLocalizations**: `Partial`<`Record`<``"id"`` \| ``"en-US"`` \| ``"en-GB"`` \| ``"bg"`` \| ``"zh-CN"`` \| ``"zh-TW"`` \| ``"hr"`` \| ``"cs"`` \| ``"da"`` \| ``"nl"`` \| ``"fi"`` \| ``"fr"`` \| ``"de"`` \| ``"el"`` \| ``"hi"`` \| ``"hu"`` \| ``"it"`` \| ``"ja"`` \| ``"ko"`` \| ``"lt"`` \| ``"no"`` \| ``"pl"`` \| ``"pt-BR"`` \| ``"ro"`` \| ``"ru"`` \| ``"es-ES"`` \| ``"sv-SE"`` \| ``"th"`` \| ``"tr"`` \| ``"uk"`` \| ``"vi"``, ``null`` \| `string`\>\>

Localization dictionary for the command's name.

Represents the localization dictionary for the command's name, which will
cause the application to use the localcized name dependent on the client's
selected language.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#localization

#### Defined in

[src/structs/commands/BaseCommand.ts:60](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L60)

___

### nsfw

• `Optional` `Readonly` **nsfw**: `boolean`

Indicates whether if the command should be age-restricted.

Commands that contains age-restricted content should be marked as such,
this will limit who can see and access the command.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands

#### Defined in

[src/structs/commands/BaseCommand.ts:107](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L107)

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

#### Defined in

[src/structs/commands/BaseCommand.ts:77](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L77)

___

### type

• `Readonly` `Abstract` **type**: `T`

The command's type.

Represents the command's type, which is used to determine how the command
is invoked.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types

#### Defined in

[src/structs/commands/BaseCommand.ts:49](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L49)

## Methods

### exec

▸ `Abstract` **exec**(`interaction`): `Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

The command's execution method.

This method represents the logic that is executed once the command is
invoked. During the command's execution, the returned value will be sent
to the interaction as a response, this is to ensure that commands do
respond to the user.

Responding to the interaction is required, as this confirms to Discord that
the command has successfully received the interaction and responded to the
user. Failing to respond will cause Discord to send a follow-up message
indicating that the command has failed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | [`CommandInteraction`](../modules/types_discord_CommandInteraction.md#commandinteraction) | The interaction that invoked the command. |

#### Returns

`Promise`<[`InteractionResponse`](../modules/types_discord_InteractionResponse.md#interactionresponse)\>

The response to the interaction.

**`See`**

 - https://discord.com/developers/docs/interactions/receiving-and-responding
 - https://discordjs.guide/slash-commands/response-methods.html

#### Defined in

[src/structs/commands/BaseCommand.ts:138](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L138)

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

[Module](structs_Module.Module.md).[initialize](structs_Module.Module.md#initialize)

#### Defined in

[src/structs/Module.ts:75](https://github.com/Norviah/bot/blob/fefba0e/src/structs/Module.ts#L75)

___

### onError

▸ **onError**(`interaction`, `error`): `Promise`<`void`\>

Invoked if the command throws an error during execution.

During the execution of the command, if an error is thrown, this method is
invoked. This method is responsible for handling the error and responding
to the interaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | [`CommandInteraction`](../modules/types_discord_CommandInteraction.md#commandinteraction) | The interaction that invoked the command. |
| `error` | `Error` | The error that was thrown. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/structs/commands/BaseCommand.ts:150](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L150)

___

### toJSON

▸ **toJSON**(): [`Explicit`](../modules/types_ts_Explicit.md#explicit)<`BaseApplicationCommandData`\>

The command serialized into a JSON object.

When deploying a command to Discord, we'll need to send a JSON payload
describing the command, this method serializes the information of the
command into a JSON object.

#### Returns

[`Explicit`](../modules/types_ts_Explicit.md#explicit)<`BaseApplicationCommandData`\>

The base information regarding the command serialized into a JSON

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-structure

#### Defined in

[src/structs/commands/BaseCommand.ts:170](https://github.com/Norviah/bot/blob/fefba0e/src/structs/commands/BaseCommand.ts#L170)
