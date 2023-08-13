import { z } from 'zod';

/**
 * Represents a Discord snowflake.
 *
 * A snowflake is a unique identifier used by Discord to identify essentially
 * anything, such as users and guilds.
 *
 * @see https://discord.com/developers/docs/reference#snowflakes
 */
export const snowflake = z.string().refine((value) => {
  return /^[0-9]{18}$/.test(value);
});

export type Snowflake = z.infer<typeof snowflake>;
