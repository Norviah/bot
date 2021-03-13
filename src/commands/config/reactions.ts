import { Message, Snowflake } from 'discord.js';
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
  description:
    "We all know what reactions are, with the available subcommands, you can set emojis, or change/remove, to be certain roles. If a reaction channel is set via the `settings set reactionchannel` command,\
    when users react in this channel, they'll be assigned to the role the emoji represents. Note: I must have the `MANAGE_GUILD` permission.",

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

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
    super('reactions', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<any> {
    // In order to know what emotes the guild has set to what roles, we'll need
    // to get their entry within the database.
    const reactions: { [key: string]: Snowflake } = this.client.database.guild(message.guild!).reactions;

    // Instead of using an object, we'll create an array to reference the list
    // of emojis and the role they represent. If the guild hasn't set any emojis
    // to a role yet, we'll set a message.
    let list: string = Object.keys(reactions).length > 0 ? '' : '**[no emojis set]**';

    for (const emojiID in reactions) {
      list += `${message.guild!.emojis.cache.get(emojiID)?.toString() ?? emojiID}: ${message.guild!.roles.cache.get(reactions[emojiID]) ?? '[role not found]'}\n`;
    }

    const description: string =
      "Here's a list of emojis along with the roles they represent, note that in order for users to get role via reaction, a reaction channel must be set via the `settings set reactionchannel` command and they must react within that channel.\
      If wanted, you can use the `reactions setup` command, if a channel is set, I'll send an embed message into that channel referencing the list of emojis and roles.";

    await this.client.inform(message, `${description}\n\n${list}`, { title: 'Reaction List', entity: null });
  }
}
