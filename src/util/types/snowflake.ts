import { Message, Snowflake } from 'discord.js';
import * as regex from '../regex';

/**
 * Implements a new type for Akairo's command argument system for Snowflakes,
 * all entities on Discord has an ID, which is called a Snowflake. This function
 * is used to determine if the given phrase is a valid ID, or, Snowflake.
 * @param  message The message that called the command.
 * @param  phrase  The phrase to check.
 * @return         The phrase if it's a valid Snowflake, otherwise null.
 */
export function isSnowflake(message: Message, phrase?: string): Snowflake | null {
  return phrase ? (regex.snowflake.test(phrase) ? phrase : null) : null;
}
