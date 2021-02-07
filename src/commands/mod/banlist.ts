import { Collection, Message, User } from 'discord.js';
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
  description: 'Provides a list containing every banned user along with the reason why.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['BAN_MEMBERS'],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',

  /**
   * Represents permissions the client needs in order to execute this command.
   */
  clientPermissions: ['BAN_MEMBERS'],
};

/**
 * Allows moderators to view banned users.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('banlist', options);
  }

  /**
   * Executes the command.
   * @param  message    The message that called this command.
   */
  public async exec(message: Message): Promise<any> {
    // Generate a list of every banned user from this server.
    const list: Collection<string, { user: User; reason?: string }> = await message.guild!.fetchBans();

    if (!list.size) {
      return this.client.inform(message, `**${message.guild!.name}** has no banned users.`, { entity: message.guild! });
    }

    const users: { [key: string]: any } = {};

    // We'll initialize an object containing the users who were banned along
    // with the reason of why they were banned, if a reason was set.
    for (const [id, info] of list) {
      users[`${info.user.tag} [${id}]`] = info.reason;
    }

    await this.client.inform(message, undefined, { field: users, entity: message.guild! });
  }
}
