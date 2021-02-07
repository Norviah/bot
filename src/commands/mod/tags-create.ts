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
  description: 'Creates a tag with the given name.',

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
      id: 'name',
      prompt: { start: 'what tag would you like to create?' },
    },
    {
      id: 'phrase',
      match: 'restContent',
      prompt: { start: 'what would you like to save under the tag?' },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows mods to create a tag for the server.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('tags-create', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Given arguments.
   * @param  args.name   The name of the tag to create.
   * @param  args.phrase The contents of the tag.
   */
  public async exec(message: Message, args: { name: string; phrase: string }): Promise<any> {
    // Before creating a tag, we must import the current list of tags for the
    // current guild to ensure that they don't try to save over an existing tag.
    const { tags } = this.client.database.guild(message.guild!);

    if (tags.hasOwnProperty(args.name)) {
      // If the author has provided a tag that already exists, we'll ask if they
      // want to continue and overwrite the tag.
      const confirmation: boolean = await this.client.prompt(message, `**${args.name}** already exists, do you want to overwrite it?`);

      if (!confirmation) {
        return await message.reply('command cancelled.');
      }
    }

    // Save the tag within the guild's database.
    this.client.database.put(message.guild!, 'tags', args.name, args.phrase);

    this.client.confirm(message, `Saved the tag **${args.name}**.`, { note: "Use 'tags view <name>' to view a tag" });
  }
}
