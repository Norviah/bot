/**
 * Returns a new object containing the values of the given object minus the
 * properties represented from the array.
 * @param  object The object to omit properties from.
 * @param  remove The properties to omit.
 * @return        A copy of the given object with the properties omitted.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(object: T, remove: K[]): Pick<T, Exclude<keyof T, K>> {
  const result = {} as { [key in keyof typeof object]: typeof object[key] };

  // Initialize a new array referencing the keys of the given object, with the
  // given properties removed, to only reference the values to copy.
  const keys: (keyof T)[] = Object.keys(object).filter((key: keyof T) => !remove.includes(key as K));

  for (const key of keys) {
    result[key] = object[key];
  }

  return result;
}
