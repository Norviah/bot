[Bot](../README.md) / structs/ClientError

# Module: structs/ClientError

## Table of contents

### Enumerations

- [ErrorCodes](../enums/structs_ClientError.ErrorCodes.md)

### Classes

- [ClientError](../classes/structs_ClientError.ClientError.md)

### Variables

- [MessageGenerator](structs_ClientError.md#messagegenerator)

## Variables

### MessageGenerator

• `Const` **MessageGenerator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DUPLICATE_MODULE` | (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` |
| `INVALID_DIRECTORY` | (`options`: { `path`: `string`  }) => `string` |
| `INVALID_HANDLER` | (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` |
| `INVALID_JSON` | (`path`: `string`) => `string` |
| `INVALID_MODULE` | (`__namedParameters`: { `module`: `string` ; `path`: `string`  }) => `string` |
| `MISSING_JSON_FILE` | (`path`: `string`) => `string` |
| `NON_JSON_FILE` | (`path`: `string`) => `string` |
| `NON_TS_FILE` | (`__namedParameters`: { `name`: `string` ; `path`: `string`  }) => `string` |
| `UNKNOWN_EMITTER` | (`__namedParameters`: { `emitter`: `string` ; `listener`: `string`  }) => `string` |

#### Defined in

[src/structs/ClientError.ts:53](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/ClientError.ts#L53)
