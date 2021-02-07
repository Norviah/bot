import { Constants } from 'discord.js';

/**
 * Represents the types of emitted events from Discord.js.
 */
export type DiscordEvents = typeof Constants.Events[keyof typeof Constants.Events];
