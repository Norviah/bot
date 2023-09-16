[Bot](../README.md) / [structs/ModuleUtil](../modules/structs_ModuleUtil.md) / ModuleUtil

# Class: ModuleUtil

[structs/ModuleUtil](../modules/structs_ModuleUtil.md).ModuleUtil

## Table of contents

### Constructors

- [constructor](structs_ModuleUtil.ModuleUtil.md#constructor)

### Properties

- [module](structs_ModuleUtil.ModuleUtil.md#module)

### Methods

- [join](structs_ModuleUtil.ModuleUtil.md#join)
- [where](structs_ModuleUtil.ModuleUtil.md#where)
- [who](structs_ModuleUtil.ModuleUtil.md#who)

## Constructors

### constructor

• **new ModuleUtil**(`module`)

Initializes a new `ModuleUtil` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | [`Module`](structs_Module.Module.md) | The module that owns this util. |

#### Defined in

[src/structs/ModuleUtil.ts:17](https://github.com/Norviah/bot/blob/61c54cf/src/structs/ModuleUtil.ts#L17)

## Properties

### module

• `Readonly` **module**: [`Module`](structs_Module.Module.md)

A reference to the module that owns this util.

#### Defined in

[src/structs/ModuleUtil.ts:10](https://github.com/Norviah/bot/blob/61c54cf/src/structs/ModuleUtil.ts#L10)

## Methods

### join

▸ **join**(`array`, `word`): `string`

Converts the provided array into a string, with the last item separated by
the specified word.

If we want to convert an array to a string, we use the `join` method,
however, this will join all items in the array with the specified
separator. It isn't possible to separate the last item with a different
separator using the built-in `join` method.

This method will convert the array to a string, with the last item
separated by the specified word to simplify the process of converting an
array to a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `unknown`[] | The array to convert to a string. |
| `word` | `string` | The word to separate the last item with. |

#### Returns

`string`

**`Example`**

```ts
util.join(['a', 'b', 'c'], 'and');
// => a, b and c

util.join(['a'], 'or');
// => a
```

#### Defined in

[src/structs/ModuleUtil.ts:81](https://github.com/Norviah/bot/blob/61c54cf/src/structs/ModuleUtil.ts#L81)

___

### where

▸ **where**(`interaction`): `string`

Generates a string representing where the provided interaction was sent.

Command interactions can occur either within a guild or the client's DMs,
this method generates a string to represent where the provided interaction
was sent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `BaseInteraction`<`CacheType`\> | The interaction to look at. |

#### Returns

`string`

A string representing where the interaction was sent from.

**`Example`**

```ts
util.where(interaction);
// => DMs

util.where(interaction);
// => My Server#general [1234567890]
```

#### Defined in

[src/structs/ModuleUtil.ts:49](https://github.com/Norviah/bot/blob/61c54cf/src/structs/ModuleUtil.ts#L49)

___

### who

▸ **who**(`interaction`): `string`

Generates a string representing who sent the provided interaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `BaseInteraction`<`CacheType`\> | The interaction to look at. |

#### Returns

`string`

A string representing who sent the interaction.

#### Defined in

[src/structs/ModuleUtil.ts:27](https://github.com/Norviah/bot/blob/61c54cf/src/structs/ModuleUtil.ts#L27)
