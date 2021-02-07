import { Message, Permissions, PermissionString } from 'discord.js';

/**
 * Represents a list of valid permissions.
 */
export const permissions = Object.keys(Permissions.FLAGS) as PermissionString[];

/**
 * Implements a new type for Akairo's command argument system for role
 * permissions, essentially determines if the given phrase is a valid
 * role permission.
 * @param  message The message that called the command.
 * @param  phrase  The phrase to check.
 * @return         The permission that the phrase represents, otherwise, null.
 */
export function isPermission(message: Message, phrase?: string): PermissionString | null {
  // The way this function, or any other function for a custom argument type,
  // works is by checking if the given phrase matches the desired type, if it
  // does, the type it represents is returned to represent the type the given
  // phrase represents. If the phrase doesn't match a type, we return null.

  // If there is no phrase, we'll stop here as there isn't anything to check.

  if (!phrase) {
    return null;
  }

  // If a phrase is given, we'll check to see if the phrase exists within the
  // permissions array, if so, we'll return it capitalized, if not, we'll return
  // null to represent that the phrase doesn't represent a permission.
  else return permissions.includes(phrase.toUpperCase() as PermissionString) ? (phrase.toUpperCase() as PermissionString) : null;
}
