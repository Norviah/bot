import { Constants } from 'discord-akairo';

/**
 * Represents the types of emitted events from Akairo.
 */
export type AkairoEvents = typeof Constants.CommandHandlerEvents[keyof typeof Constants.CommandHandlerEvents];
