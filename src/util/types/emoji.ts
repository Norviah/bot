import { Message } from 'discord.js';
import * as regex from '../regex';

/**
 * As Akairo doesn't have an argument type for default emojis, we'll have to
 * manually create a type for this.
 * @param  message The message that called the command.
 * @param  phrase  The phrase to check.
 * @return         The phrase itself if it's a default emoji.
 */
export function isDefaultEmoji(message: Message, phrase?: string): string | null {
  // The way this function, or any other function for a custom argument type,
  // works is by checking if the given phrase matches the desired type, if it
  // does, the type it represents is returned to represent the type the given
  // phrase represents. If the phrase doesn't match a type, we return null.

  // If there is no phrase, we'll stop here as there isn't anything to check.

  if (!phrase) {
    return null;
  }

  // If a phrase is given, we'll check to see if the phrase only consists of the
  // emoji, in order to do this, we'll have to initialize a new array due to
  // how emojis work. If the phrase only consists of a single element and that
  // element is an emoji, we'll return the phrase.
  else return [...phrase].length === 1 && regex.emoji.test(phrase) ? phrase : null;
}
