[Bot](../README.md) / types/ts/Explicit

# Module: types/ts/Explicit

## Table of contents

### Type Aliases

- [Explicit](types_ts_Explicit.md#explicit)

## Type Aliases

### Explicit

Ƭ **Explicit**<`T`\>: { [K in keyof Required<T\>]: T[K] }

Make all properties in `T` explicitly need a value.

Given an interface `T`, `Explicit` constructs a new type where all properties
within the original interface are explicitly required to have a value. This
differs from `Required` in that it will not make any optional properties
required, it will simply ensure that all properties will be given a value.

**`Example`**

Here we have an interface that describes a person, with the `name` required
and the `job` optional.

```ts
interface Person {
  name: string;
  job?: string;
}
```

If we try to create an instance of `Required<Person>`, we will get an error
if we do not provide a value for `job`.

```ts
const person: Required<Person> = {
  name: "John Doe",
  job: undefined, // => Error, as `job` is required.
}
```

Instead, if we use `Explicit<Person>`, we will not get an error.

```ts
const person: Explicit<Person> = {
  name: "John Doe",
  job: undefined, // => No error, as `job` is optional.
}
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The provided interface. |

#### Defined in

[src/types/ts/Explicit.ts:41](https://github.com/Norviah/bot/blob/20927fc/src/types/ts/Explicit.ts#L41)
