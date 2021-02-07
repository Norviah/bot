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
  description: 'Sets my prefix to the given phrase, if you would like to know my current prefix, mention me with me message, e.g. "@name"',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [{ id: 'phrase', match: 'content', prompt: { start: 'what would you like the new prefix to be?' } }],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to change the client's prefix for their guild.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-set-prefix', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Given arguments.
   * @param  args.phrase The new phrase to set for the guild's custom greeting.
   */
  public async exec(message: Message, args: { phrase: string }): Promise<any> {
    // Using the type safe method from the database, we'll set the prefix for
    // this guild to the given phrase. Although using a non-null assertion isn't
    // ideal, we know that the guild property exists as this command can only be
    // ran in guilds due to the 'channel' property in the options object.
    this.client.database.settings(message.guild!, 'prefix', args.phrase);

    await this.client.confirm(message, `Successfully set my prefix to \`${args.phrase}\`.`);
  }
}
