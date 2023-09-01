[Bot](../README.md) / [Exports](../modules.md) / [Listener](../modules/Listener.md) / Listener

# Class: Listener

[Listener](../modules/Listener.md).Listener

The base structure for listeners.

In node.js, listeners are pieces of code that are registered to be called
when a particular event occurs. When an event is emitted from an event
emitter, the bound piece of logic will be executed.

For example, in discord.js, everything is essentially an event emitter. When
a message is sent, when someone joins a voice channel, etc. This structure
can be used to listen to specific events that are emitted from a specified
source.

**`See`**

https://nodejs.org/api/events.html#events_class_eventemitter

## Hierarchy

- [`Module`](Module.Module.md)

  ↳ **`Listener`**

## Table of contents

### Constructors

- [constructor](Listener.Listener.md#constructor)

### Properties

- [category](Listener.Listener.md#category)
- [emitter](Listener.Listener.md#emitter)
- [event](Listener.Listener.md#event)
- [handler](Listener.Listener.md#handler)
- [logger](Listener.Listener.md#logger)
- [prisma](Listener.Listener.md#prisma)
- [type](Listener.Listener.md#type)

### Accessors

- [name](Listener.Listener.md#name)

### Methods

- [exec](Listener.Listener.md#exec)
- [initialize](Listener.Listener.md#initialize)

## Constructors

### constructor

• **new Listener**(`handler`)

Initializes a new `Module` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`Handler`](handlers_Handler.Handler.md)<[`Module`](Module.Module.md)\> | The handler that manages the module. |

#### Inherited from

[Module](Module.Module.md).[constructor](Module.Module.md#constructor)

#### Defined in

[src/structs/Module.ts:69](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L69)

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

#### Inherited from

[Module](Module.Module.md).[category](Module.Module.md#category)

#### Defined in

[src/structs/Module.ts:37](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L37)

___

### emitter

• `Readonly` `Abstract` **emitter**: `string`

The name of the emitter that will emit the desired event.

The value specified here must be the same string as the event emitter's
key when initializing a `ListenerHandler` instance.

**`Example`**

Here, we'll initialize a new `ListenerHandler` instance within the client.
When initializing a new instance, we must pass in an object that contains
a list of event emitters to bind listeners to.

```ts
class Client {
  public listener = new ListenerHandler(
    this,
    {
      client: this,
    }
  );
}
```

In this example, we provide the `client` as an event emitter to register
within the listener handler. Then, when initializing a `Listener` instance,
we must assign `emitter` to the `"client"`, as this is the key that the
client is assigned to within the object.

#### Defined in

[src/structs/Listener.ts:45](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Listener.ts#L45)

___

### event

• `Readonly` `Abstract` **event**: `string`

The name of the event to listen to.

This property defines the desired event that the listener will listen to,
and will be used to bind the listener to the event emitter.

#### Defined in

[src/structs/Listener.ts:53](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Listener.ts#L53)

___

### handler

• `Readonly` **handler**: [`Handler`](handlers_Handler.Handler.md)<[`Listener`](Listener.Listener.md)\>

A reference to the handler that manages this module.

This property references the handler that manages the module, allowing the
module to access the Discord client and other modules within the handler.

#### Inherited from

[Module](Module.Module.md).[handler](Module.Module.md#handler)

#### Defined in

[src/structs/Module.ts:62](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L62)

___

### logger

• `Readonly` **logger**: `Logger` = `logger`

The logging system.

A useful logging system that prints messages in a structured format, all
logs are additionally stored in a file for future reference.

**`See`**

https://github.com/norviah/logger

#### Inherited from

[Module](Module.Module.md).[logger](Module.Module.md#logger)

#### Defined in

[src/structs/Module.ts:54](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L54)

___

### prisma

• `Readonly` **prisma**: `PrismaClient`<`PrismaClientOptions`, `never`, `DefaultArgs`\> = `prisma`

The database client.

**`See`**

https://www.prisma.io/docs

#### Inherited from

[Module](Module.Module.md).[prisma](Module.Module.md#prisma)

#### Defined in

[src/structs/Module.ts:44](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L44)

___

### type

• `Readonly` **type**: ``"on"`` \| ``"once"`` = `'on'`

The type of listener.

This property defines the relationship between the listener and the event,
representing whether the listener will be permanently bound to the event or
if it will be bound to only the next emitted event.

If `on`, the listeenr is invoked *every* time the event is emitted. If
`once`, once the event is emitted, the listener is unbound from the
event and then invoked.

**`See`**

https://nodejs.org/api/events.html#handling-events-only-once

#### Defined in

[src/structs/Listener.ts:82](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Listener.ts#L82)

## Accessors

### name

• `get` **name**(): `string`

The listener's name.

A module's name is used to identify it within its handler, meaning that it
must be a unique string, however, multiple listeners can listen to an event
with the same name, but from different event emitters.

To ensure that the name is unique, we'll use the combination of the
emitter and the event.

#### Returns

`string`

#### Overrides

Module.name

#### Defined in

[src/structs/Listener.ts:65](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Listener.ts#L65)

## Methods

### exec

▸ `Abstract` **exec**(`...args`): `Promise`<`void`\>

The listener's execution method.

Once the desired event is emitted, this method will be called with any
parameters that the event also passes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `unknown`[] | Arguments that were emitted with the event. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/structs/Listener.ts:92](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Listener.ts#L92)

___

### initialize

▸ `Optional` **initialize**(): `void`

Further initialization logic for the module after it has been imported by
the handler.

Once the handler has imported and initialized all modules, this method is
called on each module. If desired, this method can be implemented to
further initialize the module once imported.

#### Returns

`void`

#### Inherited from

[Module](Module.Module.md).[initialize](Module.Module.md#initialize)

#### Defined in

[src/structs/Module.ts:85](https://github.com/Norviah/bot/blob/8a8cf3b/src/structs/Module.ts#L85)
