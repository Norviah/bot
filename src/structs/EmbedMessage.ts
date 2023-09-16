import { Color } from '@/structs/Color';
import { EmbedBuilder, Guild, User } from 'discord.js';

import type { EmbedMessageOptions } from '@/types/discord/EmbedMessageOptions';

/**
 * Represents an embed message.
 *
 * In Discord, an embed messae is a special message that allows for rich
 * formatting, these messages can have a colored border, embedded images, and
 * other fancy properties. As of now, this function is restricted to
 * applications, normal users cannot send embed messages.
 *
 * `EmbedMessage` is a wrapper around the built-in class for constructing embed
 * messages, which provides more useful properties. When initialized, an embed
 * message is constructed and can be used to reply to an interaction.
 *
 * @see https://discordjs.guide/popular-topics/embeds.html#embed-preview
 */
export class EmbedMessage extends EmbedBuilder {
  /**
   * Initializes a new `EmbedMessage` instance.
   *
   * @param options The options specified for the embed message.
   */
  public constructor(options: EmbedMessageOptions) {
    super({ ...options, color: options.color ?? Color.Blue, timestamp: new Date().toISOString() });

    if (options.entity instanceof Guild) {
      this.setAuthor({ name: options.entity.name, iconURL: options.entity.iconURL({ forceStatic: false }) ?? undefined });
    } else if (options.entity instanceof User) {
      this.setAuthor({ name: options.entity.username, iconURL: options.entity.avatarURL({ forceStatic: false }) ?? undefined });
    }
  }
}
