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
  description: 'Deletes the given tag.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Arguments for this command.
   */
  args: [{ id: 'name', prompt: { start: 'what tag would you like to delete?' } }],

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
    super('tags-delete', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Given arguments.
   * @param  args.name   The name of the tag to delete.
   */
  public async exec(message: Message, args: { name: string }): Promise<any> {
    // First, we'll check to see if the guild has a tag with the given name.
    if (!this.client.database.hasKey(message.guild!, 'tags', args.name)) {
      return this.client.error(message, `The tag **${args.name}** doesn't exist, use \`tags\` to a view a list of tags.`);
    }

    const confirmation: boolean = await this.client.prompt(message, `Are you sure you want to delete the tag **${args.name}**?`);

    if (!confirmation) {
      return await message.reply('command cancelled.');
    }

    // If they confirmed, we'll delete the tag from the guild's entry.
    this.client.database.deleteKey(message.guild!, 'tags', args.name);

    return await this.client.confirm(message, `Deleted the tag **${args.name}**.`);
  }
}
