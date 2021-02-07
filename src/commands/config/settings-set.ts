import { Message } from 'discord.js';
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
  description: 'Allows authorized users to change settings for this guild.',

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

export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-set', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<any> {
    // Subcommands are set in tuples, with the first element representing the
    // subcommand's fill ID and the second element representing the name of the
    // subcommand.

    // As we know that this command has subcommands, we'll initialize a new
    // array consisting of the names of each subcommand.
    const subcommands: string[] = this.subcommands!.map((names: [string, string]) => `**${names[1]}**`);

    const description: string = `This base command doesn't do anything, please use a subcommand, one of: ${this.client.join(subcommands)}.`;

    return await this.client.inform(message, description);
  }
}
