import type { APIEmbed, Guild, User } from 'discord.js';
import type { Color } from '@/structs/Color';

/**
 * Represents options for an embed message.
 *
 * This interface extends the base options for an embed message, implementing
 * additional helpful and useful properties for embed messages.
 */
export interface EmbedMessageOptions extends APIEmbed {
  /**
   * The description of the embed message.
   */
  description: string;

  /**
   * The color of the embed message.
   */
  color?: Color;

  /**
   * The author of the embed message.
   *
   * When an embed message has an author, the name and image of the respective
   * entity will be specified within the embed message.
   */
  entity?: Guild | User | null;
}
