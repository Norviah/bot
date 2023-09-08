[Bot](../README.md) / [Exports](../modules.md) / [handlers/CommandHandler](../modules/handlers_CommandHandler.md) / CommandHandler

# Class: CommandHandler

[handlers/CommandHandler](../modules/handlers_CommandHandler.md).CommandHandler

The base structure for handlers.

Handlers are used to manage modules, which are abstract classes that must be
extended to define a certain functionality. Handlers are responsible for
importing modules from files and storing them within a collection for future
reference.

## Hierarchy

- [`Handler`](handlers_Handler.Handler.md)<[`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>\>

  ↳ **`CommandHandler`**

## Table of contents

### Constructors

- [constructor](handlers_CommandHandler.CommandHandler.md#constructor)

### Properties

- [client](handlers_CommandHandler.CommandHandler.md#client)
- [directory](handlers_CommandHandler.CommandHandler.md#directory)
- [modules](handlers_CommandHandler.CommandHandler.md#modules)
- [reference](handlers_CommandHandler.CommandHandler.md#reference)

### Methods

- [import](handlers_CommandHandler.CommandHandler.md#import)
- [inherits](handlers_CommandHandler.CommandHandler.md#inherits)
- [register](handlers_CommandHandler.CommandHandler.md#register)
- [registerAll](handlers_CommandHandler.CommandHandler.md#registerall)

## Constructors

### constructor

• **new CommandHandler**(`client`)

Initializes a new `Handler` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](Client.Client.md)<`boolean`\> | The instantiated Discord client. |

#### Overrides

[Handler](handlers_Handler.Handler.md).[constructor](handlers_Handler.Handler.md#constructor)

#### Defined in

[src/structs/handlers/CommandHandler.ts:36](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/CommandHandler.ts#L36)

## Properties

### client

• `Readonly` **client**: [`Client`](Client.Client.md)<`boolean`\>

The Discord client.

A reference to the instantiated Discord client.

#### Inherited from

[Handler](handlers_Handler.Handler.md).[client](handlers_Handler.Handler.md#client)

#### Defined in

[src/structs/handlers/Handler.ts:45](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/Handler.ts#L45)

___

### directory

• `Readonly` **directory**: `string` = `paths.COMMANDS`

The base directory that contains the desired modules.

When importing commands, the handler will look in this directory for
commands to import, recursively looking in subdirectories.

#### Overrides

[Handler](handlers_Handler.Handler.md).[directory](handlers_Handler.Handler.md#directory)

#### Defined in

[src/structs/handlers/CommandHandler.ts:19](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/CommandHandler.ts#L19)

___

### modules

• **modules**: `Map`<`string`, [`SlashCommand`](commands_SlashCommand.SlashCommand.md) \| [`ContextCommand`](commands_ContextCommand.ContextCommand.md)<`User` \| `Message`\>\>

All initialized commands.

#### Overrides

[Handler](handlers_Handler.Handler.md).[modules](handlers_Handler.Handler.md#modules)

#### Defined in

[src/structs/handlers/CommandHandler.ts:29](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/CommandHandler.ts#L29)

___

### reference

• `Readonly` **reference**: `AbstractClass`<[`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>, `any`[]\> = `BaseCommand`

The reference to the abstract class that the handler manages.

#### Overrides

[Handler](handlers_Handler.Handler.md).[reference](handlers_Handler.Handler.md#reference)

#### Defined in

[src/structs/handlers/CommandHandler.ts:24](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/CommandHandler.ts#L24)

## Methods

### import

▸ **import**(`path`): [`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>

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

[`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>

The initialized module.

#### Inherited from

[Handler](handlers_Handler.Handler.md).[import](handlers_Handler.Handler.md#import)

#### Defined in

[src/structs/handlers/Handler.ts:77](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/Handler.ts#L77)

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

#### Inherited from

[Handler](handlers_Handler.Handler.md).[inherits](handlers_Handler.Handler.md#inherits)

#### Defined in

[src/structs/handlers/Handler.ts:163](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/Handler.ts#L163)

___

### register

▸ **register**(`path`): [`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>

Registers a module within the handler.

This method will register a module from the specified path, initializing it
and storing it within the handler's collection of modules.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to register the module at. |

#### Returns

[`BaseCommand`](commands_BaseCommand.BaseCommand.md)<`ApplicationCommandType`\>

The registered module.

#### Inherited from

[Handler](handlers_Handler.Handler.md).[register](handlers_Handler.Handler.md#register)

#### Defined in

[src/structs/handlers/Handler.ts:131](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/Handler.ts#L131)

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

#### Inherited from

[Handler](handlers_Handler.Handler.md).[registerAll](handlers_Handler.Handler.md#registerall)

#### Defined in

[src/structs/handlers/Handler.ts:101](https://github.com/Norviah/bot/blob/d0af849/src/structs/handlers/Handler.ts#L101)
