import { Message, GuildChannel } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Sets the logging channel, this is where certain events will be logged to.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [{ id: 'channel', type: 'textChannel', prompt: { retry: 'please provide a valid text channel' } }],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to set the logging channel for their guild, this is where
 * certain events will be logged to.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-set-logchannel', options);
  }

  /**
   * Executes the command.
   * @param  message      The message that called this command.
   * @param  args         Given arguments.
   * @param  args.message The message to set the guild's main channel to.
   */
  public async exec(message: Message, args: { channel: GuildChannel }): Promise<any> {
    // Set the logging channel within the database.
    this.client.database.settings(message.guild!, 'logChannel', args.channel.id);

    await this.client.confirm(message, `The logging channel has been set to ${args.channel}, this will be where events are logged to.`);
  }
}
