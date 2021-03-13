import { Message, GuildChannel, Role } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';
import { GuildConfig } from '../../types/guildConfig';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Presents the custom config settings for this server.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows authorized members of a guild to determine the custom settings they
 * have set within the database.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<void> {
    // As we'll be presenting the custom config values the guild has set within
    // the database, we'll need to have a reference to the guild's settings.
    const config: GuildConfig = this.client.database.guild(message.guild!);

    // As all channels/roles within the database are saved via IDs, we'll try to
    // evalute each ID into its respected object.

    const role: Role | null = config.settings.role ? message.guild!.roles.resolve(config.settings.role) : null;
    const channel: GuildChannel | null = config.settings.channel ? message.guild!.channels.resolve(config.settings.channel) : null;
    const logChannel: GuildChannel | null = config.settings.logChannel ? message.guild!.channels.resolve(config.settings.logChannel) : null;
    const reactionChannel: GuildChannel | null = config.settings.reactionChannel ? message.guild!.channels.resolve(config.settings.reactionChannel) : null;

    const field: { [key: string]: any } = {
      /**
       * Represents the prefix the guild has set for the client.
       */
      Prefix: `\`${config.settings.prefix}\``,

      /**
       * Represents the main text channel for this guild, which represents where
       * the client sends the greeting when a new member has joined the guild.
       */
      'Main Channel': channel ?? '[not set]',

      /**
       * Represents the main role for this guild, which represents the role that
       * the client will give a member when joining this guild.
       */
      'Main Role': role ?? '[not set]',

      /**
       * Represents the channel where the client will log events to.
       */
      'Logging Channel': logChannel ?? '[not set]',

      /**
       * Represents the channel where users can react to gain certain roles.
       */
      'Reaction Channel': reactionChannel ?? '[not set]',

      /**
       * Represents how many tags the guild has set.
       */
      Tags: `${Object.keys(config.tags).length} tag(s) set.`,

      /**
       * Represents the custom greeting the guild has set, which represents what
       * the client will say when a new member has joined this guild.
       */
      'Custom Greeting': config.settings.greeting ? `\`\`\`${config.settings.greeting}\`\`\`` : '[not set]',
    };

    await message.util!.send(this.client.embed({ title: message.guild!.name, timestamp: undefined, field }));
  }
}
