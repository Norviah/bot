/**
 * Determines if the value is valid, essentially checks if the value isn't
 * null/undefined or isn't empty if it can contain elements.
 * @param  value The value to check.
 * @return       A boolean determining if the given value is valid.
 */
export function valid(value: any): boolean {
  return !(value === null || value === undefined || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0));
}
