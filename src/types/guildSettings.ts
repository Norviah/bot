import { Snowflake } from 'discord.js';

export interface GuildSettings {
  /**
   * The client's prefix for a specific guild.
   */
  prefix: string;

  /**
   * The main role for a guild, if assigned, the client will assign this role to
   * new members who join that guild.
   */
  role: Snowflake | null;

  /**
   * The logging channel, if assigned, the client will log specific events into
   * this channel.
   */
  logChannel: Snowflake | null;

  /**
   * Represents the main text channel for a guild.
   */
  channel: Snowflake | null;

  /**
   * Represents the channel where users can react for roles.
   */
  reactChannel: Snowflake | null;

  /**
   * The client's welcome message, if this value is assigned and a guild has
   * also assigned a main text channel, the client will send this message into
   * that channel when a new member has joined that guild.
   * @user will be replaced with the member's tag, and
   * @server will be replaced with the guild's name.
   */
  greeting: string | null;
}
