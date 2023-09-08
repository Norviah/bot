[Bot](../README.md) / [Exports](../modules.md) / [Module](../modules/Module.md) / Module

# Class: Module

[Module](../modules/Module.md).Module

The base structure for modules.

Modules are used to group pieces of functionality for any purpose you wish.
All types of modules must have their own, and unique, handler which is
responsible for importing and initializing modules from files.

## Hierarchy

- **`Module`**

  ↳ [`Listener`](Listener.Listener.md)

  ↳ [`BaseCommand`](commands_BaseCommand.BaseCommand.md)

## Table of contents

### Constructors

- [constructor](Module.Module.md#constructor)

### Properties

- [category](Module.Module.md#category)
- [handler](Module.Module.md#handler)
- [logger](Module.Module.md#logger)
- [name](Module.Module.md#name)

### Methods

- [initialize](Module.Module.md#initialize)

## Constructors

### constructor

• **new Module**(`handler`)

Initializes a new `Module` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`Handler`](handlers_Handler.Handler.md)<[`Module`](Module.Module.md)\> | The handler that manages the module. |

#### Defined in

[src/structs/Module.ts:59](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L59)

## Properties

### category

• `Readonly` **category**: `string` = `'default'`

The category that the module belongs to.

Modules are pieces of functionality that are grouped together, however,
modules can further be grouped together. This property can be used to
group modules together within the handler.

For example, commands are pieces of modules that can be represented through
the `Module` class. In addition, modules can be grouped together by their
purpose, such as administration commands or music commands.

#### Defined in

[src/structs/Module.ts:34](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L34)

___

### handler

• `Readonly` **handler**: [`Handler`](handlers_Handler.Handler.md)<[`Module`](Module.Module.md)\>

A reference to the handler that manages this module.

This property references the handler that manages the module, allowing the
module to access the Discord client and other modules within the handler.

#### Defined in

[src/structs/Module.ts:52](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L52)

___

### logger

• `Readonly` **logger**: `Logger` = `logger`

The logging system.

A useful logging system that prints messages in a structured format, all
logs are additionally stored in a file for future reference.

**`See`**

https://github.com/norviah/logger

#### Defined in

[src/structs/Module.ts:44](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L44)

___

### name

• `Readonly` `Abstract` **name**: `string`

The module's name.

This will represent how the module is referenced within the handler and
possible error messages.

#### Defined in

[src/structs/Module.ts:21](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L21)

## Methods

### initialize

▸ `Optional` **initialize**(): `void`

Further initialization logic for the module after it has been imported by
the handler.

Once the handler has imported and initialized all modules, this method is
called on each module. If desired, this method can be implemented to
further initialize the module once imported.

#### Returns

`void`

#### Defined in

[src/structs/Module.ts:75](https://github.com/Norviah/bot/blob/d0af849/src/structs/Module.ts#L75)
