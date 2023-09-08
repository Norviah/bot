[Bot](../README.md) / [structs/handlers/ListenerHandler](../modules/structs_handlers_ListenerHandler.md) / ListenerHandler

# Class: ListenerHandler

[structs/handlers/ListenerHandler](../modules/structs_handlers_ListenerHandler.md).ListenerHandler

The base structure for handlers.

Handlers are used to manage modules, which are abstract classes that must be
extended to define a certain functionality. Handlers are responsible for
importing modules from files and storing them within a collection for future
reference.

## Hierarchy

- [`Handler`](structs_handlers_Handler.Handler.md)<[`Listener`](structs_Listener.Listener.md)\>

  ↳ **`ListenerHandler`**

## Table of contents

### Constructors

- [constructor](structs_handlers_ListenerHandler.ListenerHandler.md#constructor)

### Properties

- [client](structs_handlers_ListenerHandler.ListenerHandler.md#client)
- [directory](structs_handlers_ListenerHandler.ListenerHandler.md#directory)
- [emitters](structs_handlers_ListenerHandler.ListenerHandler.md#emitters)
- [modules](structs_handlers_ListenerHandler.ListenerHandler.md#modules)
- [reference](structs_handlers_ListenerHandler.ListenerHandler.md#reference)

### Methods

- [import](structs_handlers_ListenerHandler.ListenerHandler.md#import)
- [inherits](structs_handlers_ListenerHandler.ListenerHandler.md#inherits)
- [register](structs_handlers_ListenerHandler.ListenerHandler.md#register)
- [registerAll](structs_handlers_ListenerHandler.ListenerHandler.md#registerall)

## Constructors

### constructor

• **new ListenerHandler**(`client`, `emitters`)

Initializes a new `ListenerHandler` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](structs_Client.Client.md)<`boolean`\> | The client object. |
| `emitters` | `Record`<`string`, `__module`\> | The collection of event emitters to bind listeners to. |

#### Overrides

[Handler](structs_handlers_Handler.Handler.md).[constructor](structs_handlers_Handler.Handler.md#constructor)

#### Defined in

[src/structs/handlers/ListenerHandler.ts:41](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/ListenerHandler.ts#L41)

## Properties

### client

• `Readonly` **client**: [`Client`](structs_Client.Client.md)<`boolean`\>

The Discord client.

A reference to the instantiated Discord client.

#### Inherited from

[Handler](structs_handlers_Handler.Handler.md).[client](structs_handlers_Handler.Handler.md#client)

#### Defined in

[src/structs/handlers/Handler.ts:45](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/Handler.ts#L45)

___

### directory

• `Readonly` **directory**: `string` = `paths.LISTENERS`

The base directory that contains the desired modules.

When importing listeners, the handler will look in this directory for
listeners to import, recursively looking in subdirectories.

#### Overrides

[Handler](structs_handlers_Handler.Handler.md).[directory](structs_handlers_Handler.Handler.md#directory)

#### Defined in

[src/structs/handlers/ListenerHandler.ts:19](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/ListenerHandler.ts#L19)

___

### emitters

• `Readonly` **emitters**: `Map`<`string`, `__module`\>

The collection of event emitters to bind listeners to.

When importing listeners, the handler will also bind the listener's to its
respective event emitter. This property represents the collection of event
emitters to look for.

#### Defined in

[src/structs/handlers/ListenerHandler.ts:33](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/ListenerHandler.ts#L33)

___

### modules

• `Readonly` **modules**: `Map`<`string`, [`Listener`](structs_Listener.Listener.md)\>

The collection of modules that the handler manages.

References all modules that have been initialized by the handler, stored
within a collection for future reference.

#### Inherited from

[Handler](structs_handlers_Handler.Handler.md).[modules](structs_handlers_Handler.Handler.md#modules)

#### Defined in

[src/structs/handlers/Handler.ts:53](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/Handler.ts#L53)

___

### reference

• `Readonly` **reference**: `AbstractClass`<[`Listener`](structs_Listener.Listener.md), `any`[]\> = `Listener`

The reference to the abstract class that the handler manages.

#### Overrides

[Handler](structs_handlers_Handler.Handler.md).[reference](structs_handlers_Handler.Handler.md#reference)

#### Defined in

[src/structs/handlers/ListenerHandler.ts:24](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/ListenerHandler.ts#L24)

## Methods

### import

▸ **import**(`path`): [`Listener`](structs_Listener.Listener.md)

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

[`Listener`](structs_Listener.Listener.md)

The initialized module.

#### Inherited from

[Handler](structs_handlers_Handler.Handler.md).[import](structs_handlers_Handler.Handler.md#import)

#### Defined in

[src/structs/handlers/Handler.ts:77](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/Handler.ts#L77)

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

[Handler](structs_handlers_Handler.Handler.md).[inherits](structs_handlers_Handler.Handler.md#inherits)

#### Defined in

[src/structs/handlers/Handler.ts:163](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/Handler.ts#L163)

___

### register

▸ **register**(`path`): [`Listener`](structs_Listener.Listener.md)

Registers a listener from the specified path.

This method extends the base handler's method by binding the listener to
its respective event emitter once the listener has been initialized.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to register the listener from. |

#### Returns

[`Listener`](structs_Listener.Listener.md)

The registered listener.

#### Overrides

[Handler](structs_handlers_Handler.Handler.md).[register](structs_handlers_Handler.Handler.md#register)

#### Defined in

[src/structs/handlers/ListenerHandler.ts:60](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/ListenerHandler.ts#L60)

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

[Handler](structs_handlers_Handler.Handler.md).[registerAll](structs_handlers_Handler.Handler.md#registerall)

#### Defined in

[src/structs/handlers/Handler.ts:101](https://github.com/Norviah/bot/blob/520ef34/src/structs/handlers/Handler.ts#L101)
