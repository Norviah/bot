import { LoggedEvents } from '../types/typescript/events';
import { GuildSettings } from '../types/guildSettings';

/**
 *
 */
export const events: { [key in LoggedEvents]: string } = {
  /**
   * Called whenever a message is deleted.
   */
  messageDelete: 'This event is called whenever a message is deleted.',

  /**
   * Called whenever messages are deleted in build, essentially represents when
   */
  messageDeleteBulk: 'This event is called whenever messages are deleted in bulk, essentially representing when the `.purge` command is used.',

  /**
   *
   */
  messageUpdate: 'This event is called when a user updates their message.',

  /**
   *
   */
  voiceStateUpdate: 'This event is called when a user leaves or joins a voice channel.',

  /**
   *
   */
  guildMemberAdd: 'This event is called when a new member has joined this server.',

  /**
   *
   */
  guildMemberRemove: 'This event is called whenever a member leaves this server.',

  /**
   *
   */
  guildBanAdd: 'This event is called whenever a user is banned from this server, either manually or via the `ban` command.',

  /**
   *
   */
  guildBanRemove: 'This event is called whenever a user is un-banned from this server, either manually or via the `unban` command.',
};

/**
 *
 */
export const keys: { [key in keyof GuildSettings]: string } = {
  /**
   * The client's prefix.
   */
  prefix: `This key represents my prefix, which will determine how my commands will be accessed. For example, if my prefix is \`!\`, you would use my commands like \`!help\`.`,

  /**
   * The main role for a guild, if assigned, the client will assign this role to
   * new members who join that guild.
   */
  role: "This key represents the main role for this server, if this key is set and a new member joins this server, I'll assign them to this role.",

  /**
   * The logging channel, if assigned, the client will log specific events into
   * this channel.
   */
  logChannel: "The key represents the logging channel, whenever an event happens, specified by the `events list` subcommand, I'll log them into this channel.",

  /**
   * Represents the main text channel for a guild.
   */
  channel: "This key represents the server's main text channel, this is where I'll send a greeting for new members.",

  /**
   * The client's welcome message, if this value is assigned and a guild has
   * also assigned a main text channel, the client will send this message into
   * that channel when a new member has joined that guild.
   */
  greeting: "This key represents my greeting, if set, I'll send whatever this value represents to the server's main channel when a new member joins this server.",

  /**
   * Represents the ID for the reaction channel.
   */
  reactionChannel: 'This key represents the channel of where you would like users to react with a specific emote for a role.',
};
