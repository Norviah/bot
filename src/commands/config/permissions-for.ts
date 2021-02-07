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
  description: 'View required permissions for a specific command.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Arguments for this command.
   */
  args: [
    {
      id: 'command',
      type: 'commandAlias',
      prompt: { start: 'what command do you want to view permissions for?', retry: 'please provide a valid command' },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to see the permissions needed in order to execute a
 * specific command.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('permissions-for', options);
  }

  /**
   * Executes the command.
   * @param  message      The message that called this command.
   * @param  args         Given arguments.
   * @param  args.command The command to print permissions for.
   */
  public async exec(message: Message, args: { command: Command }): Promise<void> {
    // Using the desired command, we'll get either an array, or undefined, to
    // represent what permissions a user needs in order to execute the desired
    // command, with undefined representing a permission isn't needed.
    let permissions: string[] | undefined = args.command.getPermissions(message.guild!);

    // If permissions do exist for this command, we'll bold each permission.
    permissions = permissions ? permissions.map((permission: string): string => `**${permission}**`) : undefined;

    const description: string = `Here are the permissions you'll need in order to execute that command:\n${permissions ? this.client.join(permissions) : '**[nothing]**'}.`;

    await this.client.inform(message, description);
  }
}
