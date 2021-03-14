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
  description: 'View all commands that has custom permissions set.',

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
 * Provides a list of commands with overriden permissions.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('permissions', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   */
  public async exec(message: Message): Promise<any> {
    // First, we'll access the database to get the list of commands that has
    // permissions overriden by the guild.
    const { permissions } = this.client.database.guild(message.guild!);

    if (!Object.keys(permissions).length) {
      return await this.client.inform(message, `**${message.guild!.name}** doesn't have any permission overrides for commands.`);
    }

    const field: { [key: string]: any } = {};

    // For each command, we'll push a string consisting of every permission that
    // one needs in order to execute within this guild.
    for (const command in permissions) {
      field[command] = (this.client.commandHandler.modules.get(command) as Command).getPermissions(message.guild)?.string ?? '[none]';
    }

    await this.client.inform(message, undefined, { field, description: `Here are the list of commands with overridden permissions.` });
  }
}
