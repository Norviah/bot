import { LoggedEvents } from '../types/typescript/events';

export const events: { [key in LoggedEvents]: boolean } = {
  /**
   * Emitted when a message is deleted.
   */
  messageDelete: true,

  /**
   * Emitted when a builk of messages are deleted.
   */
  messageDeleteBulk: true,

  /**
   * Emitted when a user updates their message.
   */
  messageUpdate: true,

  /**
   * Emitted when a user updates their voice status, for example, moving to a
   * new channel, deafening themself, muting themself, etc.
   */
  voiceStateUpdate: true,

  /**
   * Emitted when a member has joined a guild.
   */
  guildMemberAdd: true,

  /**
   * Emitted when a member has left a guild.
   */
  guildMemberRemove: true,

  /**
   * Emitted when one or more member is banned from a guild.
   */
  guildBanAdd: true,

  /**
   * Emitted when one or more member is unbanned from a guild.
   */
  guildBanRemove: true,
};
