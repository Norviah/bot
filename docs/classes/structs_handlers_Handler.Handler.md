[Bot](../README.md) / [structs/handlers/Handler](../modules/structs_handlers_Handler.md) / Handler

# Class: Handler<T\>

[structs/handlers/Handler](../modules/structs_handlers_Handler.md).Handler

The base structure for handlers.

Handlers are used to manage modules, which are abstract classes that must be
extended to define a certain functionality. Handlers are responsible for
importing modules from files and storing them within a collection for future
reference.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`Module`](structs_Module.Module.md) | The type of module that the handler manages. |

## Hierarchy

- **`Handler`**

  ↳ [`CommandHandler`](structs_handlers_CommandHandler.CommandHandler.md)

  ↳ [`ListenerHandler`](structs_handlers_ListenerHandler.ListenerHandler.md)

## Table of contents

### Constructors

- [constructor](structs_handlers_Handler.Handler.md#constructor)

### Properties

- [client](structs_handlers_Handler.Handler.md#client)
- [directory](structs_handlers_Handler.Handler.md#directory)
- [modules](structs_handlers_Handler.Handler.md#modules)
- [reference](structs_handlers_Handler.Handler.md#reference)

### Methods

- [import](structs_handlers_Handler.Handler.md#import)
- [inherits](structs_handlers_Handler.Handler.md#inherits)
- [register](structs_handlers_Handler.Handler.md#register)
- [registerAll](structs_handlers_Handler.Handler.md#registerall)

## Constructors

### constructor

• **new Handler**<`T`\>(`client`)

Initializes a new `Handler` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Module`](structs_Module.Module.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](structs_Client.Client.md)<`boolean`\> | The instantiated Discord client. |

#### Defined in

[src/structs/handlers/Handler.ts:60](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L60)

## Properties

### client

• `Readonly` **client**: [`Client`](structs_Client.Client.md)<`boolean`\>

The Discord client.

A reference to the instantiated Discord client.

#### Defined in

[src/structs/handlers/Handler.ts:45](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L45)

___

### directory

• `Readonly` `Abstract` **directory**: `string`

The root directory to look for modules in.

When importing modules, the handler will use the specified directory to
look in, importing all scripts within this directory and all
subdirectories.

#### Defined in

[src/structs/handlers/Handler.ts:38](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L38)

___

### modules

• `Readonly` **modules**: `Map`<`string`, `T`\>

The collection of modules that the handler manages.

References all modules that have been initialized by the handler, stored
within a collection for future reference.

#### Defined in

[src/structs/handlers/Handler.ts:53](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L53)

___

### reference

• `Readonly` `Abstract` **reference**: `AbstractClass`<`T`, `any`[]\>

A reference to the abstract class that the handler manages.

This property references the abstract class for the desired module,
allowing the handler to determine whether if a file correctly exports an
instance of the expected class.

#### Defined in

[src/structs/handlers/Handler.ts:29](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L29)

## Methods

### import

▸ **import**(`path`): `T`

Imports and initializes a module from a file.

This method implements the logic used for initializing a module from a
file, given a path, the method attempts to import and initialize a module
from the file.

Note that when importing a module, this method only looks at the script's
default export.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to import the module from. |

#### Returns

`T`

The initialized module.

#### Defined in

[src/structs/handlers/Handler.ts:77](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L77)

___

### inherits

▸ **inherits**(`object`): object is Function

Determines whether if the provided object is a valid module.

A helper method that determines whether if the provided object is an
instantiable class that extends the abstract class that the handler
manages.

This method is used to determine whether if a file correctly exports an
instance of the expected class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `unknown` | The object to check. |

#### Returns

object is Function

Whether if the object is a valid module.

#### Defined in

[src/structs/handlers/Handler.ts:163](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L163)

___

### register

▸ **register**(`path`): `T`

Registers a module within the handler.

This method will register a module from the specified path, initializing it
and storing it within the handler's collection of modules.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to register the module at. |

#### Returns

`T`

The registered module.

#### Defined in

[src/structs/handlers/Handler.ts:131](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L131)

___

### registerAll

▸ **registerAll**(`directory?`): `void`

Registers all modules from the provided directory.

This method will recursively import all modules from the specified
directory, initializing them and storing them within the handler's
collection of modules.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directory` | `string` | The directory to register modules from. |

#### Returns

`void`

#### Defined in

[src/structs/handlers/Handler.ts:101](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/handlers/Handler.ts#L101)
