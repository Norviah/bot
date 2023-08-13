import { z } from 'zod';
import { snowflake } from './snowflake';

export const config = z.object({
  /**
   * Represents the access token for your client.
   *
   * This token is used to authenticate your client with Discord's API, which
   * must not be shared with anyone.
   *
   * @see https://discord.com/developers/docs/topics/oauth2
   */
  token: z.string({ invalid_type_error: 'hi' }),

  /**
   * The guild ID for your development server.
   *
   * When working with a Discord bot, it is highly recommended to have a server
   * that is dedicated to development purposes. This server should be used to
   * test commands and features before deploying them globally.
   *
   * Deploying commands globally takes time, however, deploying to a specific
   * is nearly instant.
   */
  devServer: snowflake,

  /**
   * Determines if the client should run in debug mode.
   *
   * When in debug mode, the client will log additional information reagarding
   * things such as commands, events, and listeners.
   */
  debug: z.boolean(),
});

export type Config = z.infer<typeof config>;
