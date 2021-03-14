import { Message, Role, Snowflake } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { Permissions } from '../../types/permissions';
import { CommandOptions } from '../../types/commandOptions';
import { ensure } from '../../util/ensure';

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
    // Using the desired command, we'll get an object referencing the needed
    // permissions a user needs in order to execute the command.
    const permissions: (Permissions & { string?: string }) | undefined = args.command.getPermissions(message.guild!);

    let description: string;

    // If the command doesn't have any permissions, we'll inform the author
    // that.
    if (!permissions || permissions.none || !permissions.string) {
      description = `That command doesn't have any required permissions, anyone can execute it.`;
    }

    // If the command does have permissions, we'll present the permissions
    // and/or roles needed to execute the command.
    else {
      description = `Here are the permission(s) and/or role(s) for **${args.command.id}**: ${permissions.string}. Anyone with the set permission(s) and/or role(s) can execute this command.`;
    }

    await this.client.inform(message, description);
  }
}
