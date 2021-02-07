import { GuildConfig } from '../types/guildConfig';
import { GuildSettings } from '../types/guildSettings';
import { events } from './events';

export const defaultGuildSettings: GuildSettings = {
  /**
   * The client's prefix for a specific guild.
   */
  prefix: '.',

  /**
   * The main role for a guild, if assigned, the client will assign this role to
   * new members who join that guild.
   */
  role: null,

  /**
   * The logging channel, if assigned, the client will log specific events into
   * this channel.
   */
  logChannel: null,

  /**
   * Represents the main text channel for a guild.
   */
  channel: null,

  /**
   * The client's welcome message, if this value is assigned and a guild has
   * also assigned a main text channel, the client will send this message into
   * that channel when a new member has joined that guild.
   * @user will be replaced with the member's tag, and
   * @server will be replaced with the guild's name.
   */
  greeting: null,

  /**
   * Represents the channel where users can react for roles.
   */
  reactChannel: null,
};

/**
 * Represents the default config for guilds.
 */
export const defaultGuildConfig: GuildConfig = {
  /**
   * Allows a guild to override a permission for a specific command to allow, or
   * restrict, users from executing a specific command.
   */
  permissions: {},

  /**
   * A list of custom tags for a guild.
   */
  tags: {},

  /**
   * Settings for a guild that an authorized user can modify.
   */
  settings: defaultGuildSettings,

  /**
   * Represents the types of events that be logged into a guild and if a guild
   * wants a specific event to be logged or not.
   */
  events: events,

  /**
   * Represents a list of reactions for a server with values representing the ID
   * of the role to assign for an emote.
   */
  reactions: {},
};
