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
  description: 'View a specific tag.',

  /**
   * Arguments for this command.
   */
  args: [{ id: 'name', match: 'restContent', prompt: { start: 'what tag would you like to view?' } }],

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
    super('tags-view', options);
  }

  /**
   * Executes the command.
   * @param  message   The message that called this command.
   * @param  args      Given arguments.
   * @param  args.name The name of the tag.
   */
  public async exec(message: Message, args: { name: string }): Promise<any> {
    // We'll get a list of every tag that the guild has.
    const { tags } = this.client.database.guild(message.guild!);

    // We'll also initialize an array containing the names.
    const names: string[] = Object.keys(tags);

    if (!names.length) {
      return this.client.inform(message, `**${message.guild!.name}** has no tags set.`);
    }

    // If they have provided a name, we'll make sure that it exists.
    else if (!names.includes(args.name)) {
      return this.client.error(message, `The tag **${args.name}** doesn't exist, use \`tags\` to view a list of tags.`);
    }

    await message.channel.send(tags[args.name]);
  }
}
