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
  description: 'View a list of all created tags.',

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
    super('tags', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   * @param  args    Given arguments.
   */
  public async exec(message: Message): Promise<any> {
    // We'll get the list of every tag the guild has set.
    const { tags } = this.client.database.guild(message.guild!);

    const names: string[] = Object.keys(tags);

    if (!names.length) {
      return await this.client.inform(message, `**${message.guild!.name}** has no tags set.`);
    }

    // For the footer, we'll inform the user how to view a specific tag.
    const note: string = "Use 'tag view <name>' to view a tag";

    // We'll map each tag name to bold text and join them for the description.
    const description: string = this.client.join(names.map((name: string) => `**${name}**`));

    // Await message.channel.send(embed);
    await this.client.inform(message, this.client.join(names), { title: 'Tags', note, entity: null });
  }
}
