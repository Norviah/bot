[Bot](../README.md) / [Exports](../modules.md) / ClientError

# Module: ClientError

## Table of contents

### Enumerations

- [ErrorCodes](../enums/ClientError.ErrorCodes.md)

### Classes

- [ClientError](../classes/ClientError.ClientError.md)

### Variables

- [MessageGenerator](ClientError.md#messagegenerator)

## Variables

### MessageGenerator

• `Const` **MessageGenerator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DUPLICATE_MODULE` | (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` |
| `INVALID_DIRECTORY` | (`options`: { `path`: `string`  }) => `string` |
| `INVALID_HANDLER` | (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` |
| `INVALID_MODULE` | (`__namedParameters`: { `module`: `string` ; `path`: `string`  }) => `string` |
| `NON_TS_FILE` | (`__namedParameters`: { `name`: `string` ; `path`: `string`  }) => `string` |
| `UNKNOWN_EMITTER` | (`__namedParameters`: { `emitter`: `string` ; `listener`: `string`  }) => `string` |

#### Defined in

[src/structs/ClientError.ts:38](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/ClientError.ts#L38)
