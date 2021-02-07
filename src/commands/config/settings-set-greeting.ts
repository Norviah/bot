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
  description: `Sets what I'll say when a new member has joined this guild.\n\nNote: \`@user\` will be replaced with the member's mention and \`@server\` will be replaced with the server's name.`,

  /**
   * Contains examples for this command.
   */
  examples: ['settings set greeting "Hi @user!, welcome to @server :)"'],

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [{ id: 'phrase', match: 'phrase', prompt: { start: 'what phrase would you like me to say?' } }],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to set the custom greeting for their guild. Once this value
 * and the main text channel is set, the client will send the greeting to the
 * channel when new members join the guild.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-set-greeting', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Given arguments.
   * @param  args.phrase The new phrase to set for the guild's custom greeting.
   */
  public async exec(message: Message, args: { phrase: string }): Promise<any> {
    // Set the guild's greeting to that phrase within the database.
    this.client.database.settings(message.guild!, 'greeting', args.phrase);

    await this.client.confirm(message, `Successfully set my greeting to \`${args.phrase}\`.`);
  }
}
