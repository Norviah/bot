[Bot](../README.md) / [structs/Client](../modules/structs_Client.md) / Client

# Class: Client<Ready\>

[structs/Client](../modules/structs_Client.md).Client

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ready` | extends `boolean` = `boolean` |

## Hierarchy

- `Client`<`Ready`\>

  ↳ **`Client`**

## Table of contents

### Constructors

- [constructor](structs_Client.Client.md#constructor)

### Properties

- [application](structs_Client.Client.md#application)
- [channels](structs_Client.Client.md#channels)
- [config](structs_Client.Client.md#config)
- [guilds](structs_Client.Client.md#guilds)
- [handlers](structs_Client.Client.md#handlers)
- [options](structs_Client.Client.md#options)
- [readyTimestamp](structs_Client.Client.md#readytimestamp)
- [rest](structs_Client.Client.md#rest)
- [shard](structs_Client.Client.md#shard)
- [sweepers](structs_Client.Client.md#sweepers)
- [token](structs_Client.Client.md#token)
- [user](structs_Client.Client.md#user)
- [users](structs_Client.Client.md#users)
- [voice](structs_Client.Client.md#voice)
- [ws](structs_Client.Client.md#ws)
- [captureRejectionSymbol](structs_Client.Client.md#capturerejectionsymbol)
- [captureRejections](structs_Client.Client.md#capturerejections)
- [defaultMaxListeners](structs_Client.Client.md#defaultmaxlisteners)
- [errorMonitor](structs_Client.Client.md#errormonitor)

### Accessors

- [\_censoredToken](structs_Client.Client.md#_censoredtoken)
- [emojis](structs_Client.Client.md#emojis)
- [readyAt](structs_Client.Client.md#readyat)
- [uptime](structs_Client.Client.md#uptime)

### Methods

- [addListener](structs_Client.Client.md#addlistener)
- [destroy](structs_Client.Client.md#destroy)
- [emit](structs_Client.Client.md#emit)
- [eventNames](structs_Client.Client.md#eventnames)
- [fetchGuildPreview](structs_Client.Client.md#fetchguildpreview)
- [fetchGuildTemplate](structs_Client.Client.md#fetchguildtemplate)
- [fetchGuildWidget](structs_Client.Client.md#fetchguildwidget)
- [fetchInvite](structs_Client.Client.md#fetchinvite)
- [fetchPremiumStickerPacks](structs_Client.Client.md#fetchpremiumstickerpacks)
- [fetchSticker](structs_Client.Client.md#fetchsticker)
- [fetchVoiceRegions](structs_Client.Client.md#fetchvoiceregions)
- [fetchWebhook](structs_Client.Client.md#fetchwebhook)
- [generateInvite](structs_Client.Client.md#generateinvite)
- [getMaxListeners](structs_Client.Client.md#getmaxlisteners)
- [isReady](structs_Client.Client.md#isready)
- [listenerCount](structs_Client.Client.md#listenercount)
- [listeners](structs_Client.Client.md#listeners)
- [login](structs_Client.Client.md#login)
- [off](structs_Client.Client.md#off)
- [on](structs_Client.Client.md#on)
- [once](structs_Client.Client.md#once)
- [prependListener](structs_Client.Client.md#prependlistener)
- [prependOnceListener](structs_Client.Client.md#prependoncelistener)
- [rawListeners](structs_Client.Client.md#rawlisteners)
- [removeAllListeners](structs_Client.Client.md#removealllisteners)
- [removeListener](structs_Client.Client.md#removelistener)
- [setMaxListeners](structs_Client.Client.md#setmaxlisteners)
- [start](structs_Client.Client.md#start)
- [toJSON](structs_Client.Client.md#tojson)
- [getEventListeners](structs_Client.Client.md#geteventlisteners)
- [getMaxListeners](structs_Client.Client.md#getmaxlisteners-1)
- [listenerCount](structs_Client.Client.md#listenercount-1)
- [on](structs_Client.Client.md#on-1)
- [once](structs_Client.Client.md#once-1)
- [setMaxListeners](structs_Client.Client.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Client**<`Ready`\>(`options`)

Initializes a new `Client` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ready` | extends `boolean` = `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `ClientOptions` | Options for the client. |

#### Overrides

BaseClient&lt;Ready\&gt;.constructor

#### Defined in

[src/structs/Client.ts:41](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Client.ts#L41)

## Properties

### application

• **application**: `If`<`Ready`, `ClientApplication`, ``null``\>

#### Inherited from

BaseClient.application

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:954

___

### channels

• **channels**: `ChannelManager`

#### Inherited from

BaseClient.channels

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:955

___

### config

• `Private` `Readonly` **config**: `ReadonlyObjectDeep`<{ `debug`: `boolean` ; `devServer`: `string` = snowflake; `token`: `string`  }\> = `config`

The client's configuration object.

This object references important information regarding the client, most
notably the token that is used to log in to Discord.

#### Defined in

[src/structs/Client.ts:19](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Client.ts#L19)

___

### guilds

• **guilds**: `GuildManager`

#### Inherited from

BaseClient.guilds

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:957

___

### handlers

• `Readonly` **handlers**: `Readonly`<{ `commands`: [`CommandHandler`](structs_handlers_CommandHandler.CommandHandler.md) ; `listeners`: [`ListenerHandler`](structs_handlers_ListenerHandler.ListenerHandler.md)  }\>

The various handlers for the client.

This property holds a reference to the various handlers that are used by
the client for various purposes.

#### Defined in

[src/structs/Client.ts:27](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Client.ts#L27)

___

### options

• **options**: `Omit`<`ClientOptions`, ``"intents"``\> & { `intents`: `IntentsBitField`  }

#### Inherited from

BaseClient.options

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:958

___

### readyTimestamp

• **readyTimestamp**: `If`<`Ready`, `number`, ``null``\>

#### Inherited from

BaseClient.readyTimestamp

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:960

___

### rest

• **rest**: `REST`

#### Inherited from

BaseClient.rest

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:512

___

### shard

• **shard**: ``null`` \| `ShardClientUtil`

#### Inherited from

BaseClient.shard

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:962

___

### sweepers

• **sweepers**: `Sweepers`

#### Inherited from

BaseClient.sweepers

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:961

___

### token

• **token**: `If`<`Ready`, `string`, ``null`` \| `string`\>

#### Inherited from

BaseClient.token

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:963

___

### user

• **user**: `If`<`Ready`, `ClientUser`, ``null``\>

#### Inherited from

BaseClient.user

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:965

___

### users

• **users**: `UserManager`

#### Inherited from

BaseClient.users

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:966

___

### voice

• **voice**: `ClientVoiceManager`

#### Inherited from

BaseClient.voice

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:967

___

### ws

• **ws**: `WebSocketManager`

#### Inherited from

BaseClient.ws

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:968

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](structs_Client.Client.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

BaseClient.captureRejectionSymbol

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:355

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

BaseClient.captureRejections

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:362

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners`property can be used. If this value is not a positive number, a `RangeError`is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_`EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()`methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**`Since`**

v0.11.2

#### Inherited from

BaseClient.defaultMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:399

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](structs_Client.Client.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`events. Listeners installed using this symbol are called before the regular`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an`'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**`Since`**

v13.6.0, v12.17.0

#### Inherited from

BaseClient.errorMonitor

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:348

## Accessors

### \_censoredToken

• `Private` `get` **_censoredToken**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Inherited from

BaseClient.\_censoredToken

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:952

___

### emojis

• `get` **emojis**(): `BaseGuildEmojiManager`

#### Returns

`BaseGuildEmojiManager`

#### Inherited from

BaseClient.emojis

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:956

___

### readyAt

• `get` **readyAt**(): `If`<`Ready`, `Date`, ``null``\>

#### Returns

`If`<`Ready`, `Date`, ``null``\>

#### Inherited from

BaseClient.readyAt

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:959

___

### uptime

• `get` **uptime**(): `If`<`Ready`, `number`, ``null``\>

#### Returns

`If`<`Ready`, `number`, ``null``\>

#### Inherited from

BaseClient.uptime

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:964

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

Alias for `emitter.on(eventName, listener)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

**`Since`**

v0.1.26

#### Inherited from

BaseClient.addListener

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:419

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

BaseClient.destroy

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:969

___

### emit

▸ **emit**<`K`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `...args` | `ClientEvents`[`K`] |

#### Returns

`boolean`

#### Inherited from

BaseClient.emit

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:995

▸ **emit**<`S`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `...args` | `unknown`[] |

#### Returns

`boolean`

#### Inherited from

BaseClient.emit

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:996

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

**`Since`**

v6.0.0

#### Inherited from

BaseClient.eventNames

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:744

___

### fetchGuildPreview

▸ **fetchGuildPreview**(`guild`): `Promise`<`GuildPreview`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `guild` | `GuildResolvable` |

#### Returns

`Promise`<`GuildPreview`\>

#### Inherited from

BaseClient.fetchGuildPreview

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:970

___

### fetchGuildTemplate

▸ **fetchGuildTemplate**(`template`): `Promise`<`GuildTemplate`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `string` |

#### Returns

`Promise`<`GuildTemplate`\>

#### Inherited from

BaseClient.fetchGuildTemplate

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:972

___

### fetchGuildWidget

▸ **fetchGuildWidget**(`guild`): `Promise`<`Widget`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `guild` | `GuildResolvable` |

#### Returns

`Promise`<`Widget`\>

#### Inherited from

BaseClient.fetchGuildWidget

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:977

___

### fetchInvite

▸ **fetchInvite**(`invite`, `options?`): `Promise`<`Invite`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `invite` | `string` |
| `options?` | `ClientFetchInviteOptions` |

#### Returns

`Promise`<`Invite`\>

#### Inherited from

BaseClient.fetchInvite

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:971

___

### fetchPremiumStickerPacks

▸ **fetchPremiumStickerPacks**(): `Promise`<`Collection`<`string`, `StickerPack`\>\>

#### Returns

`Promise`<`Collection`<`string`, `StickerPack`\>\>

#### Inherited from

BaseClient.fetchPremiumStickerPacks

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:975

___

### fetchSticker

▸ **fetchSticker**(`id`): `Promise`<`Sticker`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`Sticker`\>

#### Inherited from

BaseClient.fetchSticker

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:974

___

### fetchVoiceRegions

▸ **fetchVoiceRegions**(): `Promise`<`Collection`<`string`, `VoiceRegion`\>\>

#### Returns

`Promise`<`Collection`<`string`, `VoiceRegion`\>\>

#### Inherited from

BaseClient.fetchVoiceRegions

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:973

___

### fetchWebhook

▸ **fetchWebhook**(`id`, `token?`): `Promise`<`Webhook`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `token?` | `string` |

#### Returns

`Promise`<`Webhook`\>

#### Inherited from

BaseClient.fetchWebhook

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:976

___

### generateInvite

▸ **generateInvite**(`options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `InviteGenerationOptions` |

#### Returns

`string`

#### Inherited from

BaseClient.generateInvite

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:978

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](structs_Client.Client.md#defaultmaxlisteners).

#### Returns

`number`

**`Since`**

v1.0.0

#### Inherited from

BaseClient.getMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:596

___

### isReady

▸ **isReady**(): this is Client<true\>

#### Returns

this is Client<true\>

#### Inherited from

BaseClient.isReady

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:980

___

### listenerCount

▸ **listenerCount**(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

**`Since`**

v3.2.0

#### Inherited from

BaseClient.listenerCount

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:690

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v0.1.26

#### Inherited from

BaseClient.listeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:609

___

### login

▸ **login**(`token?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

BaseClient.login

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:979

___

### off

▸ **off**<`K`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.off

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:998

▸ **off**<`S`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.off

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:999

___

### on

▸ **on**<`K`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.on

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:983

▸ **on**<`S`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.on

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:984

___

### once

▸ **once**<`K`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.once

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:989

▸ **once**<`S`\>(`event`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.once

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:990

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

**`Since`**

v6.0.0

#### Inherited from

BaseClient.prependListener

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:708

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

**`Since`**

v6.0.0

#### Inherited from

BaseClient.prependOnceListener

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:724

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v9.4.0

#### Inherited from

BaseClient.rawListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:640

___

### removeAllListeners

▸ **removeAllListeners**<`K`\>(`event?`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `K` |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.removeAllListeners

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:1004

▸ **removeAllListeners**<`S`\>(`event?`): [`Client`](structs_Client.Client.md)<`Ready`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `Exclude`<`S`, keyof `ClientEvents`\> |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

#### Inherited from

BaseClient.removeAllListeners

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:1005

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Client`](structs_Client.Client.md)<`Ready`\>

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

**`Since`**

v0.1.26

#### Inherited from

BaseClient.removeListener

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:564

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Client`](structs_Client.Client.md)<`Ready`\>

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Client`](structs_Client.Client.md)<`Ready`\>

**`Since`**

v0.3.5

#### Inherited from

BaseClient.setMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:590

___

### start

▸ **start**(): `Promise`<`void`\>

Starts the client.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/structs/Client.ts:48](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Client.ts#L48)

___

### toJSON

▸ **toJSON**(): `unknown`

#### Returns

`unknown`

#### Inherited from

BaseClient.toJSON

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:981

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v15.2.0, v14.17.0

#### Inherited from

BaseClient.getEventListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:296

___

### getMaxListeners

▸ `Static` **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |

#### Returns

`number`

**`Since`**

v19.9.0

#### Inherited from

BaseClient.getMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:325

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

BaseClient.listenerCount

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:268

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

**`Since`**

v13.6.0, v12.16.0

#### Inherited from

BaseClient.on

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:250

▸ `Static` **on**<`E`, `K`\>(`eventEmitter`, `eventName`): `AsyncIterableIterator`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `__module` |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventEmitter` | `E` |
| `eventName` | `E` extends `Client`<`boolean`\> ? `K` : `string` |

#### Returns

`AsyncIterableIterator`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`\>

#### Inherited from

BaseClient.on

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:239

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

**`Since`**

v11.13.0, v10.16.0

#### Inherited from

BaseClient.once

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:189

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

BaseClient.once

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:190

▸ `Static` **once**<`E`, `K`\>(`eventEmitter`, `eventName`): `Promise`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `__module` |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventEmitter` | `E` |
| `eventName` | `E` extends `Client`<`boolean`\> ? `K` : `string` |

#### Returns

`Promise`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`[]\>

#### Inherited from

BaseClient.once

#### Defined in

node_modules/.pnpm/discord.js@14.12.1/node_modules/discord.js/typings/index.d.ts:235

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

**`Since`**

v15.4.0

#### Inherited from

BaseClient.setMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@20.4.8/node_modules/@types/node/events.d.ts:340
