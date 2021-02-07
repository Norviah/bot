import { Guild, MessageEmbedOptions as Base, User } from 'discord.js';
import { colors } from '../util/colors';

/**
 * Options for embed messages.
 */
export interface MessageEmbedOptions extends Base {
  /**
   * The title of the embed message.
   */
  title?: string;

  /**
   * Determines if the title should be underline, defaults to true.
   */
  underline?: boolean;

  /**
   * The embed's description.
   */
  description?: string;

  /**
   * Represents either a user or guild to set as the author of the embed
   * message. Being an author of an embed message allows the name and image of
   * the author to be presented at the top of the embed message.
   */
  entity?: Guild | User | null;

  /**
   * This obejct determines the fields for the embed message, each key/value
   * pair will be converted into a field and will be added to the embed message.
   */
  field?: { [key: string]: any };

  /**
   * Determines if fields should be inline.
   */
  inline?: boolean;

  /**
   * Represents the color for the embed message.
   */
  color?: keyof typeof colors;

  /**
   * Represents a shortcut to set the text for the footer of the embed message.
   */
  note?: string | string[];

  /**
   * We won't allow a value to be set manually for an embed's footer, as this
   * will be handled via the 'note' property.
   */
  footer?: undefined;

  /**
   * If multiple footnotes are provided, each footnote will be separated with
   * this value.
   */
  separator?: string;

  /**
   * Represents the date for the embed message.
   */
  timestamp?: Date | number;
}
