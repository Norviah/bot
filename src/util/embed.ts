import { EmbedField, Guild, MessageEmbed, MessageEmbedFooter, User } from 'discord.js';
import { MessageEmbedOptions } from '../types/messageEmbedOptions';

import { colors } from './colors';
import { validate } from './validate';

/**
 * A helper function for creating embed messages.
 * @param  options Options for the embed message.
 * @return         An embed message initialized with the given options.
 */
export function embed(options: MessageEmbedOptions): MessageEmbed {
  // When an embed message has an author, either it be a guild, user, or another
  // entity, the author's name and image, if one is available, will be presented
  // at the top of the embed message.

  // We'll initialize a variable to represent the author of the message, but, we
  // will set to undefined as a default value.
  let author: { name: string; iconURL?: string } | undefined = undefined;

  // If an entity was given to be represented as the embed message's author,
  // we'll set the author object to represent the guild's name and image.
  if (options.entity instanceof Guild) {
    author = { name: options.entity.name, iconURL: options.entity.iconURL({ dynamic: true }) ?? undefined };
  }

  // If a user was given instead, we'll do the same thing as well.
  else if (options.entity instanceof User) {
    author = { name: options.entity.username, iconURL: options.entity.avatarURL({ dynamic: true }) ?? undefined };
  }

  let { note } = options;

  // As multiple footnotes can be given, we'll check for this possibility and
  // join them via the given, or default, separator.
  note = note && Array.isArray(note) ? note.join(` ${options.separator ?? '•'} `) : note;

  const footer: Partial<MessageEmbedFooter> = { text: note };

  // Represents the color for the embed message.
  const color: string = colors[options.color ?? 'blue'];

  // If a title is given, we'll underline it if wanted.
  const title: string | undefined = options.title ? (options.underline !== false ? `__${options.title}__` : options.title) : undefined;

  const fields: EmbedField[] = [];

  // If a field object is given, we'll initialize each key/value pair as a field
  // for the embed message, after ensuring no invalid values exist.
  if (options.field) {
    // Make sure that the object only has valid values before continuing,
    // essentially, null/undefined/and empty values are deleted.
    const validated: { [key: string]: any } = validate(options.field);

    for (const key in validated) {
      fields.push({ name: key, value: validated[key], inline: !!options.inline });
    }
  }

  return new MessageEmbed({ timestamp: new Date(), author, ...options, fields, color, title, footer });
}
