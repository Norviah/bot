[Bot](../README.md) / [structs/Logger](../modules/structs_Logger.md) / Logger

# Class: Logger

[structs/Logger](../modules/structs_Logger.md).Logger

## Hierarchy

- `Logger`

  ↳ **`Logger`**

## Table of contents

### Constructors

- [constructor](structs_Logger.Logger.md#constructor)

### Properties

- [options](structs_Logger.Logger.md#options)

### Methods

- [debug](structs_Logger.Logger.md#debug)
- [error](structs_Logger.Logger.md#error)
- [exit](structs_Logger.Logger.md#exit)
- [generate](structs_Logger.Logger.md#generate)
- [info](structs_Logger.Logger.md#info)
- [print](structs_Logger.Logger.md#print)
- [success](structs_Logger.Logger.md#success)
- [warn](structs_Logger.Logger.md#warn)
- [write](structs_Logger.Logger.md#write)
- [Colorize](structs_Logger.Logger.md#colorize)
- [Plain](structs_Logger.Logger.md#plain)

## Constructors

### constructor

• **new Logger**(`options?`)

Initializes a new `Logger` instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`<`Options`\> | Options for the logger. |

#### Overrides

BaseLogger.constructor

#### Defined in

[src/structs/Logger.ts:16](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Logger.ts#L16)

## Properties

### options

• **options**: `DeepRequired`<`Options`\>

Options to reference when logging.
Represents default options along with specific options overridden within
the constructor.

#### Inherited from

BaseLogger.options

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:34

## Methods

### debug

▸ **debug**(`content`, `options?`): `void`

Logs the provided content as debug information.

Debug information are information that isn't necessarily important, but
can be useful for debugging purposes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content to log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for the log. |

#### Returns

`void`

#### Defined in

[src/structs/Logger.ts:39](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Logger.ts#L39)

___

### error

▸ **error**(`content`, `options?`): `void`

A shortcut method for logging an `error` event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content to log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for the log. |

#### Returns

`void`

#### Overrides

BaseLogger.error

#### Defined in

[src/structs/Logger.ts:26](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Logger.ts#L26)

___

### exit

▸ **exit**(`content`, `options?`): `never`

A utility method for logging an `error` event and exiting the process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content to log. |
| `options?` | `Partial`<`LoggingOptions`\> & { `code?`: `number`  } | Options for the log. |

#### Returns

`never`

#### Defined in

[src/structs/Logger.ts:51](https://github.com/Norviah/bot/blob/2fe11d0/src/structs/Logger.ts#L51)

___

### generate

▸ **generate**(`content`, `options?`): `string`

A helper method for printing logs.

As logs are split into three separate functions, `generate` helps combine
them, ultimately generating a string representing all three sections. Each
section:
- the date,
- the title,
- and the contents

are all ran through its specific formatter. For example, for dates, a new
instance of `spacetime` is initialized. For titles, any instances of `%t`
within `Format.title` is replaced with the specified title, or an empty
string if no title is set.

After generating the three sections, `generate` combines them using the
general format within `Format` and returns the result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The contents of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`string`

A generated string adhering to the desired format of a log.

**`Example`**

```TypeScript
// With `generate`, it takes the desired `Format` instance, replaces the
// special characters with the date, title, and content, applies any colors
// and markdown syntax, and finally returns the result.

// As an example, let's say we have set the desired format into:
//   date: '[ MM-dd-yyyy h:mm a ]',
// {
//   title: '%t: ',
//   general: '%d %t%c',
// }

// If we were to call the `print` method as:
// print('world', { title: 'hello' }), it would call `generate` with the
// same parameters, and would go through each property within `format` and
// generate a string regarding that property.

// With the given options, `generate` would return:
// `[ 01-01-1970 12:00 AM ] hello: world`
```

#### Inherited from

BaseLogger.generate

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:109

___

### info

▸ **info**(`content`, `options?`): `void`

A helper method to print information.
The title is set to `info` with the color set to `blue`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`void`

**`Example`**

```TypeScript
import { Logger } from '@norviah/logger';

new Logger().info('sample text');
// => [ 01-01-1970 12:00 AM ] info: sample text
```

#### Inherited from

BaseLogger.info

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:251

___

### print

▸ **print**(`content`, `options?`): `void`

Prints the given content to the console.

The main function for `Logger`, `print` is the main entry point to
logging into the console. Outputted logs are formatted to adhere to the
format specified within `Format` in `Options` during initialization,
or the default format.

Through `options`, you're able to change certain output of the log,
for example, colors. As logs are separated within three sections, if
desired, you can specify the colors for each section within
`options.colors`.

Speaking of sections of a log, the sections of a log are:
- the date,
- the title,
- and the content

As the `date` is handled within `Options` during the constructor, we don't
have to worry about that. As for the `title`, that can be set within
`options`. Titles for logs are always optional and is ignored within the
output if a `title` isn't set.

Additionally, markdown syntax are supported.
Within `content` or `options.title`, you can specify one or more of the
following markdown syntax:
- **bold**: `**[string]**`,
- ~~strikethrough~~: `~~[string]~~`,
- *italics*: `*[string]*`,
- __underline__: `__[string]__`, and
- `!![string]!!`, which inverses the foreground and background color.

The desired syntax is applied to the wrapped strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`void`

#### Inherited from

BaseLogger.print

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:146

___

### success

▸ **success**(`content`, `options?`): `void`

A helper method to print a success.
The title is set to `ok` with the color set to `green`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`void`

**`Example`**

```TypeScript
import { Logger } from '@norviah/logger';

new Logger().success('sample text');
// => [ 01-01-1970 12:00 AM ] ok: sample text
```

#### Inherited from

BaseLogger.success

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:223

___

### warn

▸ **warn**(`content`, `options?`): `void`

A helper method to print a warning.
The title is set to `warning` with the color set to `yellow`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The content of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`void`

**`Example`**

```TypeScript
import { Logger } from '@norviah/logger';

new Logger().warn('sample text');
// => [ 01-01-1970 12:00 AM ] warning: sample text
```

#### Inherited from

BaseLogger.warn

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:237

___

### write

▸ **write**(`content`, `options?`): `void`

Writes the given contents into a file.

As `Logger` can optionally save logs into a file, determined by the `write`
property within `Options`, this method is called under the hood to save the
specified log into a file. Given the contents and options, the generated
log that would be printed, is rather saved into the specified file.

As always, this method exists if you would like to save a log into a file,
regardless if the `write` property is set to true within the constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` \| `string`[] | The contents of the log. |
| `options?` | `Partial`<`LoggingOptions`\> | Options for logging. |

#### Returns

`void`

**`Example`**

```TypeScript
import { Logger } from '@norviah/logger';

// For this example, we'll initialize a new instance of `Logger` without
// providing any options. By default, any printed logs won't be saved into
// a file.

const logger: Logger = new Logger();

logger.print('world', { title: 'hello' });
// This would simply print out:
// [ 01-01-1970 12:00 AM ] hello: world

// No logs are saved due to `write` being false.
// However, if `write` were to be set to `true`, it would save files by
// calling the `write` method under the hood.

// This method is always available to you, allowing you to save logs into
// files regardless of what `write` was set to during the constructor.
// `write` accepts the same parameters as the `print` method, calling the
// same generator method but instead saving the log into a file.

logger.write('world', { title: 'hello' });

// By default, logs are saved into the `logs` subdirectory within your
// projects root directory under the file `MM-DD-YYYY.txt`. If wanted, you
// can change the filename using the `name` property:

logger.write('hello world', { name: 'hello world' });

// This log would be saved under `logs/hello world.txt`.
// There's other options available regarding writing logs within the
// `LoggingOptions` interface, as it inherits `WriteOptions`.
```

#### Inherited from

BaseLogger.write

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:195

___

### Colorize

▸ `Static` **Colorize**(`color`, `string`): `string`

Applies the specified color to the string.

In addition, any markdown syntax specified is also applied to the provided
string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `Color` | The desired color to apply. |
| `string` | `string` | The string to apply the color to. |

#### Returns

`string`

The string with the desired color applied.

**`Example`**

```ts
import { Logger } from '@norviah/logger';

Logger.Colorize('red', 'hello world');
// => <red>hello world</red>
```

#### Inherited from

BaseLogger.Colorize

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:268

___

### Plain

▸ `Static` **Plain**(`string`): `string`

Removes all ANSI codes from the provided string.

`Logger` uses `chalk` to generate strings with custom colors and types,
which implements ANSI codes to achieve this. `Plain` can take in a string
generated from `Logger` and remove all ANSI codes from it, resulting in a
plain text version of the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to remove ANSI codes from. |

#### Returns

`string`

The string with all ANSI codes removed.

**`Example`**

```ts
let ansiText = "\x1B[34mThis text is blue\x1B[39m";
```
Here, `ansiText` is a string with the ANSI code for blue color and the
ANSI code for resetting the color. `Plain` can be used to remove these
ANSI codes, resulting in a plain text version of the string.
```ts
console.log(Plain(ansiText));
```
While the change isn't noticable here in markdown, the output of the
above code will be `This text is blue` without any ANSI codes.

#### Inherited from

BaseLogger.Plain

#### Defined in

node_modules/.pnpm/@norviah+logger@7.0.0/node_modules/@norviah/logger/lib/structs/Logger.d.ts:291
