[Bot](../README.md) / [structs/Util](../modules/structs_Util.md) / ModuleUtil

# Class: ModuleUtil

[structs/Util](../modules/structs_Util.md).ModuleUtil

## Table of contents

### Constructors

- [constructor](structs_Util.ModuleUtil.md#constructor)

### Methods

- [where](structs_Util.ModuleUtil.md#where)

## Constructors

### constructor

• **new ModuleUtil**()

## Methods

### where

▸ **where**(`interaction`): `string`

Determines where the provided interaction was sent from.

Command interactions can happen either within a guild or the client's DMs,
this helper method generates a string to represent where the provided
interaction was sent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | `Interaction` | The interaction to look at. |

#### Returns

`string`

A string representing where the interaction was sent from.

#### Defined in

src/structs/Util.ts:14
