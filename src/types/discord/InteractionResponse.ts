import type { InteractionReplyOptions, MessagePayload } from 'discord.js';

/**
 * Valid types for responding to an interaction.
 */
export type InteractionResponse = string | MessagePayload | InteractionReplyOptions;
