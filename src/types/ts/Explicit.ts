/**
 * Make all properties in `T` explicitly need a value.
 *
 * Given an interface `T`, `Explicit` constructs a new type where all properties
 * within the original interface are explicitly required to have a value. This
 * differs from `Required` in that it will not make any optional properties
 * required, it will simply ensure that all properties will be given a value.
 *
 * @template T The provided interface.
 * @example
 *
 * Here we have an interface that describes a person, with the `name` required
 * and the `job` optional.
 *
 * ```ts
 * interface Person {
 *   name: string;
 *   job?: string;
 * }
 * ```
 *
 * If we try to create an instance of `Required<Person>`, we will get an error
 * if we do not provide a value for `job`.
 *
 * ```ts
 * const person: Required<Person> = {
 *   name: "John Doe",
 *   job: undefined, // => Error, as `job` is required.
 * }
 * ```
 *
 * Instead, if we use `Explicit<Person>`, we will not get an error.
 *
 * ```ts
 * const person: Explicit<Person> = {
 *   name: "John Doe",
 *   job: undefined, // => No error, as `job` is optional.
 * }
 * ```
 */
export type Explicit<T extends Record<string, any>> = {
  [K in keyof Required<T>]: T[K];
};
