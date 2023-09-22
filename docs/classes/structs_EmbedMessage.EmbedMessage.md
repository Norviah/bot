[Bot](../README.md) / [structs/EmbedMessage](../modules/structs_EmbedMessage.md) / EmbedMessage

# Class: EmbedMessage

[structs/EmbedMessage](../modules/structs_EmbedMessage.md).EmbedMessage

Represents an embed message.

In Discord, an embed messae is a special message that allows for rich
formatting, these messages can have a colored border, embedded images, and
other fancy properties. As of now, this function is restricted to
applications, normal users cannot send embed messages.

`EmbedMessage` is a wrapper around the built-in class for constructing embed
messages, which provides more useful properties. When initialized, an embed
message is constructed and can be used to reply to an interaction.

**`See`**

https://discordjs.guide/popular-topics/embeds.html#embed-preview

## Hierarchy

- `EmbedBuilder`

  ↳ **`EmbedMessage`**

## Table of contents

### Constructors

- [constructor](structs_EmbedMessage.EmbedMessage.md#constructor)

### Properties

- [data](structs_EmbedMessage.EmbedMessage.md#data)

### Accessors

- [length](structs_EmbedMessage.EmbedMessage.md#length)

### Methods

- [addFields](structs_EmbedMessage.EmbedMessage.md#addfields)
- [setAuthor](structs_EmbedMessage.EmbedMessage.md#setauthor)
- [setColor](structs_EmbedMessage.EmbedMessage.md#setcolor)
- [setDescription](structs_EmbedMessage.EmbedMessage.md#setdescription)
- [setFields](structs_EmbedMessage.EmbedMessage.md#setfields)
- [setFooter](structs_EmbedMessage.EmbedMessage.md#setfooter)
- [setImage](structs_EmbedMessage.EmbedMessage.md#setimage)
- [setThumbnail](structs_EmbedMessage.EmbedMessage.md#setthumbnail)
- [setTimestamp](structs_EmbedMessage.EmbedMessage.md#settimestamp)
- [setTitle](structs_EmbedMessage.EmbedMessage.md#settitle)
- [setURL](structs_EmbedMessage.EmbedMessage.md#seturl)
- [spliceFields](structs_EmbedMessage.EmbedMessage.md#splicefields)
- [toJSON](structs_EmbedMessage.EmbedMessage.md#tojson)
- [from](structs_EmbedMessage.EmbedMessage.md#from)

## Constructors

### constructor

• **new EmbedMessage**(`options`)

Initializes a new `EmbedMessage` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`EmbedMessageOptions`](../interfaces/types_discord_EmbedMessageOptions.EmbedMessageOptions.md) | The options specified for the embed message. |

#### Overrides

EmbedBuilder.constructor

#### Defined in

[src/structs/EmbedMessage.ts:26](https://github.com/Norviah/bot/blob/78f7ec8/src/structs/EmbedMessage.ts#L26)

## Properties

### data

• `Readonly` **data**: `APIEmbed`

The API data associated with this embed.

#### Inherited from

EmbedBuilder.data

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:163

## Accessors

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Inherited from

EmbedBuilder.length

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:865

## Methods

### addFields

▸ **addFields**(`...fields`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Appends fields to the embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...fields` | `RestOrArray`<`APIEmbedField`\> | The fields to add |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

**`Remarks`**

This method accepts either an array of fields or a variable number of field parameters.
The maximum amount of fields that can be added is 25.

**`Example`**

Using an array:
```ts
const fields: APIEmbedField[] = ...;
const embed = new EmbedBuilder()
	.addFields(fields);
```

**`Example`**

Using rest parameters (variadic):
```ts
const embed = new EmbedBuilder()
	.addFields(
		{ name: 'Field 1', value: 'Value 1' },
		{ name: 'Field 2', value: 'Value 2' },
	);
```

#### Inherited from

EmbedBuilder.addFields

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:194

___

### setAuthor

▸ **setAuthor**(`options`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the author of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | ``null`` \| `EmbedAuthorOptions` | The options to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setAuthor

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:241

___

### setColor

▸ **setColor**(`color`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | ``null`` \| `ColorResolvable` |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setColor

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:863

___

### setDescription

▸ **setDescription**(`description`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the description of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | ``null`` \| `string` | The description to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setDescription

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:253

___

### setFields

▸ **setFields**(`...fields`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the fields for this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...fields` | `RestOrArray`<`APIEmbedField`\> | The fields to set |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

**`Remarks`**

This method is an alias for [spliceFields](structs_EmbedMessage.EmbedMessage.md#splicefields). More specifically,
it splices the entire array of fields, replacing them with the provided fields.

You can set a maximum of 25 fields.

#### Inherited from

EmbedBuilder.setFields

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:235

___

### setFooter

▸ **setFooter**(`options`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the footer of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | ``null`` \| `EmbedFooterOptions` | The footer to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setFooter

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:259

___

### setImage

▸ **setImage**(`url`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the image of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | ``null`` \| `string` | The image URL to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setImage

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:265

___

### setThumbnail

▸ **setThumbnail**(`url`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the thumbnail of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | ``null`` \| `string` | The thumbnail URL to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setThumbnail

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:271

___

### setTimestamp

▸ **setTimestamp**(`timestamp?`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the timestamp of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp?` | ``null`` \| `number` \| `Date` | The timestamp or date to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setTimestamp

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:277

___

### setTitle

▸ **setTitle**(`title`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the title for this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | ``null`` \| `string` | The title to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setTitle

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:283

___

### setURL

▸ **setURL**(`url`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Sets the URL of this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | ``null`` \| `string` | The URL to use |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

#### Inherited from

EmbedBuilder.setURL

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:289

___

### spliceFields

▸ **spliceFields**(`index`, `deleteCount`, `...fields`): [`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

Removes, replaces, or inserts fields for this embed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to start at |
| `deleteCount` | `number` | The number of fields to remove |
| `...fields` | `APIEmbedField`[] | The replacing field objects |

#### Returns

[`EmbedMessage`](structs_EmbedMessage.EmbedMessage.md)

**`Remarks`**

This method behaves similarly
to [Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
The maximum amount of fields that can be added is 25.

It's useful for modifying and adjusting order of the already-existing fields of an embed.

**`Example`**

Remove the first field:
```ts
embed.spliceFields(0, 1);
```

**`Example`**

Remove the first n fields:
```ts
const n = 4;
embed.spliceFields(0, n);
```

**`Example`**

Remove the last field:
```ts
embed.spliceFields(-1, 1);
```

#### Inherited from

EmbedBuilder.spliceFields

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:224

___

### toJSON

▸ **toJSON**(): `APIEmbed`

Serializes this builder to API-compatible JSON data.

#### Returns

`APIEmbed`

**`Remarks`**

This method runs validations on the data before serializing it.
As such, it may throw an error if the data is invalid.

#### Inherited from

EmbedBuilder.toJSON

#### Defined in

node_modules/.pnpm/@discordjs+builders@1.6.4/node_modules/@discordjs/builders/dist/index.d.ts:297

___

### from

▸ `Static` **from**(`other`): `EmbedBuilder`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `APIEmbed` \| `JSONEncodable`<`APIEmbed`\> |

#### Returns

`EmbedBuilder`

#### Inherited from

EmbedBuilder.from

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:864
