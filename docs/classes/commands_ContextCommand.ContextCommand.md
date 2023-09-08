[Bot](../README.md) / [Exports](../modules.md) / [commands/ContextCommand](../modules/commands_ContextCommand.md) / ContextCommand

# Class: ContextCommand<T\>

[commands/ContextCommand](../modules/commands_ContextCommand.md).ContextCommand

The base structure for context commands.

In a Discord application, context commands are commands that appear within
the context menu when right clicking a user or a message, within the `Apps`
submenu.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `ApplicationCommandType.Message` \| `ApplicationCommandType.User` | The type of context command the structure represents. |

## Hierarchy

- [`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`T`\>

  ↳ **`ContextCommand`**

## Table of contents

### Constructors

- [constructor](commands_ContextCommand.ContextCommand.md#constructor)

### Properties

- [category](commands_ContextCommand.ContextCommand.md#category)
- [clientPermissions](commands_ContextCommand.ContextCommand.md#clientpermissions)
- [description](commands_ContextCommand.ContextCommand.md#description)
- [dm](commands_ContextCommand.ContextCommand.md#dm)
- [guilds](commands_ContextCommand.ContextCommand.md#guilds)
- [handler](commands_ContextCommand.ContextCommand.md#handler)
- [logger](commands_ContextCommand.ContextCommand.md#logger)
- [name](commands_ContextCommand.ContextCommand.md#name)
- [nameLocalizations](commands_ContextCommand.ContextCommand.md#namelocalizations)
- [nsfw](commands_ContextCommand.ContextCommand.md#nsfw)
- [permissions](commands_ContextCommand.ContextCommand.md#permissions)
- [type](commands_ContextCommand.ContextCommand.md#type)

### Methods

- [exec](commands_ContextCommand.ContextCommand.md#exec)
- [initialize](commands_ContextCommand.ContextCommand.md#initialize)
- [onError](commands_ContextCommand.ContextCommand.md#onerror)
- [toJSON](commands_ContextCommand.ContextCommand.md#tojson)

## Constructors

### constructor

• **new ContextCommand**<`T`\>(`handler`)

Initializes a new `Module` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `User` \| `Message` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`Handler`](handlers_Handler.Handler.md)<[`Module`](Module.Module.md)\> | The handler that manages the module. |

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[constructor](commands_BaseCommand.BaseCommand.md#constructor)

#### Defined in

[src/structs/Module.ts:59](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L59)

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

[BaseCommand](commands_BaseCommand.BaseCommand.md).[category](commands_BaseCommand.BaseCommand.md#category)

#### Defined in

[src/structs/Module.ts:34](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L34)

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

[BaseCommand](commands_BaseCommand.BaseCommand.md).[clientPermissions](commands_BaseCommand.BaseCommand.md#clientpermissions)

#### Defined in

[src/structs/commands/BaseCommand.ts:92](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L92)

___

### description

• `Readonly` `Abstract` **description**: `string`

The command's description.

An in-depth description of the command, this property should present a
thorough description of the command and its functionality.

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[description](commands_BaseCommand.BaseCommand.md#description)

#### Defined in

[src/structs/commands/BaseCommand.ts:42](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L42)

___

### dm

• `Optional` `Readonly` **dm**: `boolean`

Indicates whether if the command is available within the client's DMs.

This flag is only applicable for globally-scoped commands, it is ignored
for guild-specific commands.

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[dm](commands_BaseCommand.BaseCommand.md#dm)

#### Defined in

[src/structs/commands/BaseCommand.ts:100](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L100)

___

### guilds

• `Optional` `Readonly` **guilds**: `string`[]

The guilds to restrict the command to.

If specified, the command will be deployed *only* the specified guilds,
meaning the command will not be available globally.

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#registering-a-command

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[guilds](commands_BaseCommand.BaseCommand.md#guilds)

#### Defined in

[src/structs/commands/BaseCommand.ts:120](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L120)

___

### handler

• `Readonly` **handler**: [`Handler`](handlers_Handler.Handler.md)<[`ContextCommand`](commands_ContextCommand.ContextCommand.md)<`T`\>\>

A reference to the handler that manages this module.

This property references the handler that manages the module, allowing the
module to access the Discord client and other modules within the handler.

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[handler](commands_BaseCommand.BaseCommand.md#handler)

#### Defined in

[src/structs/Module.ts:52](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L52)

___

### logger

• `Readonly` **logger**: `Logger` = `logger`

The logging system.

A useful logging system that prints messages in a structured format, all
logs are additionally stored in a file for future reference.

**`See`**

https://github.com/norviah/logger

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[logger](commands_BaseCommand.BaseCommand.md#logger)

#### Defined in

[src/structs/Module.ts:44](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L44)

___

### name

• `Readonly` `Abstract` **name**: `string`

The module's name.

This will represent how the module is referenced within the handler and
possible error messages.

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[name](commands_BaseCommand.BaseCommand.md#name)

#### Defined in

[src/structs/Module.ts:21](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L21)

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

[BaseCommand](commands_BaseCommand.BaseCommand.md).[nameLocalizations](commands_BaseCommand.BaseCommand.md#namelocalizations)

#### Defined in

[src/structs/commands/BaseCommand.ts:63](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L63)

___

### nsfw

• `Optional` `Readonly` **nsfw**: `boolean`

Indicates whether if the command should be age-restricted.

Commands that contains age-restricted content should be marked as such,
this will limit who can see and access the command.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands

#### Inherited from

[BaseCommand](commands_BaseCommand.BaseCommand.md).[nsfw](commands_BaseCommand.BaseCommand.md#nsfw)

#### Defined in

[src/structs/commands/BaseCommand.ts:110](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L110)

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

[BaseCommand](commands_BaseCommand.BaseCommand.md).[permissions](commands_BaseCommand.BaseCommand.md#permissions)

#### Defined in

[src/structs/commands/BaseCommand.ts:80](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/BaseCommand.ts#L80)

___

### type

• `Readonly` `Abstract` **type**: `T`

The type of context the command represents.

This property informs Discord the of the command's type, allowng them to
provide the command to the user in the correct context. As this command
represents a context command, it's value is constricted to `T`.

**`See`**

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types

#### Overrides

[BaseCommand](commands_BaseCommand.BaseCommand.md).[type](commands_BaseCommand.BaseCommand.md#type)

#### Defined in

[src/structs/commands/ContextCommand.ts:28](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/ContextCommand.ts#L28)

## Methods

### exec

▸ `Abstract` **exec**(`interaction`): `Promise`<`InteractionResponse`\>

The command's execution method.

This method is called when the command is invoked by a user through the
respective context menu, it is responsible for executing the command's
logic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `T` extends `Message` ? `MessageContextMenuCommandInteraction`<`CacheType`\> : `UserContextMenuCommandInteraction`<`CacheType`\> | The interaction that invoked the command. |

#### Returns

`Promise`<`InteractionResponse`\>

The response to send to the interaction.

#### Overrides

[BaseCommand](commands_BaseCommand.BaseCommand.md).[exec](commands_BaseCommand.BaseCommand.md#exec)

#### Defined in

[src/structs/commands/ContextCommand.ts:40](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/ContextCommand.ts#L40)

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

[BaseCommand](commands_BaseCommand.BaseCommand.md).[initialize](commands_BaseCommand.BaseCommand.md#initialize)

#### Defined in

[src/structs/Module.ts:75](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L75)

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
| `interaction` | `T` extends `Message` ? `MessageContextMenuCommandInteraction`<`CacheType`\> : `UserContextMenuCommandInteraction`<`CacheType`\> | The interaction that invoked the command. |
| `error` | `Error` | The error that was thrown. |

#### Returns

`Promise`<`void`\>

#### Overrides

[BaseCommand](commands_BaseCommand.BaseCommand.md).[onError](commands_BaseCommand.BaseCommand.md#onerror)

#### Defined in

[src/structs/commands/ContextCommand.ts:52](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/ContextCommand.ts#L52)

___

### toJSON

▸ **toJSON**(): `T` extends `Message` ? `Explicit`<`MessageApplicationCommandData`\> : `Explicit`<`UserApplicationCommandData`\>

The command serialized into a JSON object.

When deploying a command to Discord, we'll need to send a JSON payload
describing the command, this method serializes the information of the
command into a JSON object.

#### Returns

`T` extends `Message` ? `Explicit`<`MessageApplicationCommandData`\> : `Explicit`<`UserApplicationCommandData`\>

The base information regarding the command serialized into a JSON

**`See`**

https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-structure

#### Overrides

[BaseCommand](commands_BaseCommand.BaseCommand.md).[toJSON](commands_BaseCommand.BaseCommand.md#tojson)

#### Defined in

[src/structs/commands/ContextCommand.ts:66](https://github.com/Norviah/bot/blob/d0af849/src/structs/commands/ContextCommand.ts#L66)