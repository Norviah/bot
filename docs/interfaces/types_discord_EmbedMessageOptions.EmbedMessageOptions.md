[Bot](../README.md) / [types/discord/EmbedMessageOptions](../modules/types_discord_EmbedMessageOptions.md) / EmbedMessageOptions

# Interface: EmbedMessageOptions

[types/discord/EmbedMessageOptions](../modules/types_discord_EmbedMessageOptions.md).EmbedMessageOptions

Represents options for an embed message.

This interface extends the base options for an embed message, implementing
additional helpful and useful properties for embed messages.

## Hierarchy

- `APIEmbed`

  ↳ **`EmbedMessageOptions`**

## Table of contents

### Properties

- [author](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#author)
- [color](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#color)
- [description](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#description)
- [entity](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#entity)
- [fields](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#fields)
- [footer](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#footer)
- [image](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#image)
- [provider](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#provider)
- [thumbnail](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#thumbnail)
- [timestamp](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#timestamp)
- [title](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#title)
- [type](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#type)
- [url](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#url)
- [video](types_discord_EmbedMessageOptions.EmbedMessageOptions.md#video)

## Properties

### author

• `Optional` **author**: `APIEmbedAuthor`

Author information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure

#### Inherited from

APIEmbed.author

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:1010

___

### color

• `Optional` **color**: [`Color`](../enums/structs_Color.Color.md)

The color of the embed message.

#### Overrides

APIEmbed.color

#### Defined in

[src/types/discord/EmbedMessageOptions.ts:19](https://github.com/Norviah/bot/blob/78f7ec8/src/types/discord/EmbedMessageOptions.ts#L19)

___

### description

• **description**: `string`

The description of the embed message.

#### Overrides

APIEmbed.description

#### Defined in

[src/types/discord/EmbedMessageOptions.ts:14](https://github.com/Norviah/bot/blob/78f7ec8/src/types/discord/EmbedMessageOptions.ts#L14)

___

### entity

• `Optional` **entity**: ``null`` \| `User` \| `Guild`

The author of the embed message.

When an embed message has an author, the name and image of the respective
entity will be specified within the embed message.

#### Defined in

[src/types/discord/EmbedMessageOptions.ts:27](https://github.com/Norviah/bot/blob/78f7ec8/src/types/discord/EmbedMessageOptions.ts#L27)

___

### fields

• `Optional` **fields**: `APIEmbedField`[]

Fields information

Length limit: 25 field objects

See https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure

#### Inherited from

APIEmbed.fields

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:1018

___

### footer

• `Optional` **footer**: `APIEmbedFooter`

Footer information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure

#### Inherited from

APIEmbed.footer

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:980

___

### image

• `Optional` **image**: `APIEmbedImage`

Image information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure

#### Inherited from

APIEmbed.image

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:986

___

### provider

• `Optional` **provider**: `APIEmbedProvider`

Provider information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure

#### Inherited from

APIEmbed.provider

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:1004

___

### thumbnail

• `Optional` **thumbnail**: `APIEmbedThumbnail`

Thumbnail information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure

#### Inherited from

APIEmbed.thumbnail

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:992

___

### timestamp

• `Optional` **timestamp**: `string`

Timestamp of embed content

#### Inherited from

APIEmbed.timestamp

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:970

___

### title

• `Optional` **title**: `string`

Title of embed

Length limit: 256 characters

#### Inherited from

APIEmbed.title

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:948

___

### type

• `Optional` **type**: `EmbedType`

Type of embed (always "rich" for webhook embeds)

**`Deprecated`**

*Embed types should be considered deprecated and might be removed in a future API version*

See https://discord.com/developers/docs/resources/channel#embed-object-embed-types

#### Inherited from

APIEmbed.type

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:956

___

### url

• `Optional` **url**: `string`

URL of embed

#### Inherited from

APIEmbed.url

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:966

___

### video

• `Optional` **video**: `APIEmbedVideo`

Video information

See https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure

#### Inherited from

APIEmbed.video

#### Defined in

node_modules/.pnpm/discord-api-types@0.37.51/node_modules/discord-api-types/payloads/v10/channel.d.ts:998
