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
}
