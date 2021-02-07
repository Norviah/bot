/**
 * Ensures that the given parameter is the given type.
 * @return A boolean determining if the parameter is the given type.
 */
export function ensure<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
