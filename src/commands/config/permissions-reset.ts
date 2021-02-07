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
  description: 'Resets the permissions for the given command(s) to the default permissions.',

  /**
   * Contains examples for this command.
   */
  examples: ['permissions reset ping', 'permissions reset ping greeting'],

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [
    {
      id: 'commands',
      type: 'commandAlias',
      match: 'separate',
      prompt: { start: 'which command would you like to reset permissions for?', retry: 'please provide a valid command' },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to reset the permissions of a command to the default
 * permissions.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('permissions-reset', options);
  }

  /**
   * Executes the command.
   * @param  message       The message that called this command.
   * @param  args          Given arguments.
   * @param  args.commands The command(s) to reset permissions for.
   */
  public async exec(message: Message, args: { commands: Command[] }): Promise<any> {
    // As users can provide multiple commands, it's possible that a command
    // could be given twice. We'll filter this array to only consist of unique
    // commands.
    args.commands = args.commands.filter((command: Command, i: number): boolean => args.commands.indexOf(command) === i);

    // We'll also initialize an array containing the names of each command.
    const names: string[] = args.commands.map((command: Command): string => command.id);

    const question: string = `Are you sure you want to reset the permissions for **${this.client.join(names)}**?`;

    const confirmation: boolean = await this.client.prompt(message, question);

    if (!confirmation) {
      return await message.util!.reply('command cancelled.');
    }

    // If the author confirms the action, we'll delete the custom permission set
    // for each command within the guild's database. As the command's entry is
    // deleted, the client will now use the default permissions set for the
    // command.

    for (const command of args.commands) {
      this.client.database.deleteKey(message.guild!, 'permissions', command.id);
    }

    await this.client.confirm(message, `Successfully reset the permissions for the command(s) **${this.client.join(names)}**`);
  }
}
