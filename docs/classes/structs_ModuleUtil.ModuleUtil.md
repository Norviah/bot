[Bot](../README.md) / [structs/ModuleUtil](../modules/structs_ModuleUtil.md) / ModuleUtil

# Class: ModuleUtil

[structs/ModuleUtil](../modules/structs_ModuleUtil.md).ModuleUtil

## Table of contents

### Constructors

- [constructor](structs_ModuleUtil.ModuleUtil.md#constructor)

### Properties

- [module](structs_ModuleUtil.ModuleUtil.md#module)

### Methods

- [where](structs_ModuleUtil.ModuleUtil.md#where)

## Constructors

### constructor

• **new ModuleUtil**(`module`)

Initializes a new `ModuleUtil` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | [`Module`](structs_Module.Module.md) | The module that owns this util. |

#### Defined in

[src/structs/ModuleUtil.ts:17](https://github.com/Norviah/bot/blob/a024a5d/src/structs/ModuleUtil.ts#L17)

## Properties

### module

• `Readonly` **module**: [`Module`](structs_Module.Module.md)

A reference to the module that owns this util.

#### Defined in

[src/structs/ModuleUtil.ts:10](https://github.com/Norviah/bot/blob/a024a5d/src/structs/ModuleUtil.ts#L10)

## Methods

### where

▸ **where**(`interaction`): `string`

Generates a string representing where the provided interaction was sent.

Command interactions can occur either within a guild or the client's DMs,
this method generates a string to represent where the provided interaction
was sent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `Interaction` | The interaction to look at. |

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

[src/structs/ModuleUtil.ts:39](https://github.com/Norviah/bot/blob/a024a5d/src/structs/ModuleUtil.ts#L39)
