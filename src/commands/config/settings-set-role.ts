import { Message, Role } from 'discord.js';
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
  description: "Sets the main role for this guild, I'll give new members this role when joining.",

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [{ id: 'role', type: 'role', prompt: { start: 'what role would you like to set?', retry: 'please provide a valid role' } }],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to set the main role for their guild, when a new member
 * joins the guild, the client will assign this role to them.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-set-role', options);
  }

  /**
   * Executes the command.
   * @param  message   The message that called the command.
   * @param  args      Given arguments.
   * @param  args.role The role to set the guild's main role as.
   */
  public async exec(message: Message, args: { role: Role }): Promise<any> {
    // Set the role within the guild's database.
    this.client.database.settings(message.guild!, 'role', args.role.id);

    await this.client.confirm(message, `Successfully set the default role to ${args.role}.`);
  }
}
