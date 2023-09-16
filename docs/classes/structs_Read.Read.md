[Bot](../README.md) / [structs/Read](../modules/structs_Read.md) / Read

# Class: Read

[structs/Read](../modules/structs_Read.md).Read

A utility class for reading files.

This class provides helper methods for reading various file types from the
file system, additionally implementing error handling and validation.

## Table of contents

### Constructors

- [constructor](structs_Read.Read.md#constructor)

### Methods

- [JSON](structs_Read.Read.md#json)

## Constructors

### constructor

• **new Read**()

## Methods

### JSON

▸ `Static` **JSON**(`path`): `JsonObject`

Imports the contents of the specified JSON file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the JSON file. |

#### Returns

`JsonObject`

The contents of the JSON file.

#### Defined in

[src/structs/Read.ts:21](https://github.com/Norviah/bot/blob/61c54cf/src/structs/Read.ts#L21)
