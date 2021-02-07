import { valid } from './valid';

/**
 * Validates every value within the object, deleting the value if a value
 * happens to be invalid. Once validated, the object is returned.
 * @param  object The object to validate.
 * @return        The object with invalid values removed.
 */
export function validate(object: { [key: string]: string }): { [key: string]: string } {
  for (const key in object) {
    if (!valid(object[key])) delete object[key];
  }

  return object;
}
