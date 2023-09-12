import { ChannelType } from 'discord.js';

import type { Interaction } from 'discord.js';
import type { Module } from '@/structs/Module';

export class ModuleUtil {
  /**
   * A reference to the module that owns this util.
   */
  public readonly module: Module;

  /**
   * Initializes a new `ModuleUtil` instance.
   *
   * @param module The module that owns this util.
   */
  public constructor(module: Module) {
    this.module = module;
  }

  /**
   * Generates a string representing where the provided interaction was sent.
   *
   * Command interactions can occur either within a guild or the client's DMs,
   * this method generates a string to represent where the provided interaction
   * was sent.
   *
   * @param interaction The interaction to look at.
   * @returns A string representing where the interaction was sent from.
   * @example
   * ```ts
   * util.where(interaction);
   * // => DMs
   *
   * util.where(interaction);
   * // => My Server#general [1234567890]
   * ```
   */
  public where(interaction: Interaction): string {
    if (!interaction.guild || interaction.channel?.type === ChannelType.DM) {
      return `DMs`;
    }

    return `${interaction.guild.name}${interaction.channel ? `#${interaction.channel.name}` : ''} [${interaction.guild.id}]`;
  }

  /**
   * Converts the provided array into a string, with the last item separated by
   * the specified word.
   *
   * If we want to convert an array to a string, we use the `join` method,
   * however, this will join all items in the array with the specified
   * separator. It isn't possible to separate the last item with a different
   * separator using the built-in `join` method.
   *
   * This method will convert the array to a string, with the last item
   * separated by the specified word to simplify the process of converting an
   * array to a string.
   *
   * @param array The array to convert to a string.
   * @param word The word to separate the last item with.
   * @example
   * ```ts
   * util.join(['a', 'b', 'c'], 'and');
   * // => a, b and c
   *
   * util.join(['a'], 'or');
   * // => a
   * ```
   */
  public join(array: unknown[], word: string): string {
    return array.join(', ').replace(/, ?(?:[^,]*)$/, ` ${word} $1`);
  }
}
