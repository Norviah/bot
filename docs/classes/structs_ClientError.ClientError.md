[Bot](../README.md) / [structs/ClientError](../modules/structs_ClientError.md) / ClientError

# Class: ClientError<T\>

[structs/ClientError](../modules/structs_ClientError.md).ClientError

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof typeof [`ErrorCodes`](../enums/structs_ClientError.ErrorCodes.md) |

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Constructors

- [constructor](structs_ClientError.ClientError.md#constructor)

### Properties

- [args](structs_ClientError.ClientError.md#args)
- [code](structs_ClientError.ClientError.md#code)
- [message](structs_ClientError.ClientError.md#message)
- [name](structs_ClientError.ClientError.md#name)
- [stack](structs_ClientError.ClientError.md#stack)
- [prepareStackTrace](structs_ClientError.ClientError.md#preparestacktrace)
- [stackTraceLimit](structs_ClientError.ClientError.md#stacktracelimit)

### Methods

- [is](structs_ClientError.ClientError.md#is)
- [captureStackTrace](structs_ClientError.ClientError.md#capturestacktrace)

## Constructors

### constructor

• **new ClientError**<`T`\>(`code`, `...args`)

Initializes a new `ClientError` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"INVALID_DIRECTORY"`` \| ``"INVALID_MODULE"`` \| ``"INVALID_HANDLER"`` \| ``"DUPLICATE_MODULE"`` \| ``"NON_TS_FILE"`` \| ``"UNKNOWN_EMITTER"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `T` | The string representation of the error. |
| `...args` | `Parameters`<{ `DUPLICATE_MODULE`: (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` ; `INVALID_DIRECTORY`: (`options`: { `path`: `string`  }) => `string` ; `INVALID_HANDLER`: (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` ; `INVALID_MODULE`: (`__namedParameters`: { `module`: `string` ; `path`: `string`  }) => `string` ; `NON_TS_FILE`: (`__namedParameters`: { `name`: `string` ; `path`: `string`  }) => `string` ; `UNKNOWN_EMITTER`: (`__namedParameters`: { `emitter`: `string` ; `listener`: `string`  }) => `string`  }[`T`]\> | Any arguments used to construct the error message, if applicable. |

#### Overrides

Error.constructor

#### Defined in

[src/structs/ClientError.ts:121](https://github.com/Norviah/bot/blob/520ef34/src/structs/ClientError.ts#L121)

## Properties

### args

• **args**: `Parameters`<{ `DUPLICATE_MODULE`: (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` ; `INVALID_DIRECTORY`: (`options`: { `path`: `string`  }) => `string` ; `INVALID_HANDLER`: (`__namedParameters`: { `handler`: `string` ; `module`: `string`  }) => `string` ; `INVALID_MODULE`: (`__namedParameters`: { `module`: `string` ; `path`: `string`  }) => `string` ; `NON_TS_FILE`: (`__namedParameters`: { `name`: `string` ; `path`: `string`  }) => `string` ; `UNKNOWN_EMITTER`: (`__namedParameters`: { `emitter`: `string` ; `listener`: `string`  }) => `string`  }[`T`]\>

Arguments that contain additional information about the error, if
applicable.

`MessageGenerate` represents a list of functions used to construct a string
for a given error code. These functions may accept arguments which is used
within the constructed string, if specified, this property will reference
the arguments passed to the message generator.

#### Defined in

[src/structs/ClientError.ts:112](https://github.com/Norviah/bot/blob/520ef34/src/structs/ClientError.ts#L112)

___

### code

• **code**: `T`

The code representing the thrown error.

This property will represent the string representation of the thrown error,
which can be used to handle the error in a specific error if desired.

#### Defined in

[src/structs/ClientError.ts:101](https://github.com/Norviah/bot/blob/520ef34/src/structs/ClientError.ts#L101)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/globals.d.ts:13

## Methods

### is

▸ **is**<`T`\>(`code`): this is ClientError<T\>

Determines the specific type of error that occured.

When catching an instance of `ClientError`, by default, the inferred type
of the error is unknown. This method implements a type guard to determine
the type of error that occured, which can be used to handle the error in a
specific way.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ErrorCodes`](../enums/structs_ClientError.ErrorCodes.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `T` | The code to check against. |

#### Returns

this is ClientError<T\>

Whether if the `ClientError` is of the specified type.

**`Example`**

```ts
try {
  // ...
} catch (error) {
  if (error instanceof ClientError) {
    // Uknown `ClientError` error

    if (error.is(ErrorCodes.INVALID_DIRECTORY)) {
      // `INVALID_DIRECTORY` error
    }
  }

  // Unknown error
}
```

#### Defined in

[src/structs/ClientError.ts:157](https://github.com/Norviah/bot/blob/520ef34/src/structs/ClientError.ts#L157)

___

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/globals.d.ts:4
