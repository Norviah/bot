import { Snowflake, PermissionString } from 'discord.js';

import { GuildSettings } from './guildSettings';
import { LoggedEvents } from '../types/typescript/events';

export interface GuildConfig {
  /**
   * Allows a guild to override a permission for a specific command to allow, or
   * restrict, users from executing a specific command.
   */
  permissions: { [key: string]: PermissionString[] };

  /**
   * A list of custom tags for a guild.
   */
  tags: { [key: string]: string };

  /**
   * Settings for a guild that an authorized user can modify.
   */
  settings: GuildSettings;

  /**
   * Represents the types of events that be logged into a guild and if a guild
   * wants a specific event to be logged or not.
   */
  events: { [key in LoggedEvents]: boolean };

  /**
   * Represents a list of reactions for a server with values representing the ID
   * of the role to assign for an emote.
   */
  reactions: { [key in string]: Snowflake };
}
