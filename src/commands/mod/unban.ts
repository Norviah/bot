import { Collection, Message, Snowflake, User } from 'discord.js';
import { Argument } from 'discord-akairo';
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
  description: 'Unbans the given user(s) from this server, you must provide the ID of each user you wish to unban.',

  /**
   * Contains examples for this command.
   */
  examples: ['unban 123456789123456789', 'unban 123456789123456789 123456789123456789', 'unban all'],

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['BAN_MEMBERS'],

  /**
   * Arguments for this command.
   */
  args: [
    {
      id: 'users',
      match: 'separate',
      type: Argument.union(['all'], 'snowflake'),
      prompt: { start: 'please provide the IDs of the users to unban.', retry: 'please provide a valid ID' },
    },
  ],

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
 * Allows moderators to unban users from a server.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('unban', options);
  }

  /**
   * Executes the command.
   * @param  message    The message that called this command.
   * @param  args       Given arguments.
   * @param  args.users The list of users to unban.
   */
  public async exec(message: Message, args: { users: (Snowflake | 'all')[] }): Promise<any> {
    // We'll get a list of every user that was banned from this server, to
    // ensure the author is providing a valid ID to unban, valid meaning the ID
    // belongs to a banned user.
    const list: Collection<string, { user: User; reason?: string }> = await message.guild!.fetchBans();

    const all: boolean = args.users.includes('all');

    if (!list.size) {
      return await this.client.error(message, `**${message.guild!.name}** has no banned users.`);
    }

    args.users = args.users.filter((user: string, i: number): boolean => args.users.indexOf(user) === i);

    // Next, we'll iterate through each given ID and ensure the ID belongs to a
    // user that is currently banned.
    for (const id of args.users) {
      if (id !== 'all' && !list.has(id)) {
        return await this.client.error(message, `A banned user with the ID of \`${id}\` couldn't be found.`);
      }
    }

    // Now that we know valid IDs is provided, an array is initialized
    // containing every user who the author would like to ban.
    const users: typeof list = all ? list : list.filter(({ user }) => args.users.includes(user.id));

    const names: string[] = users.map(({ user }) => `**${user.tag}**`);

    const question: string = `Are you sure you want to unban ${all ? 'every banned user' : this.client.join(names)}?`;

    const confirmation: boolean = await this.client.prompt(message, question);

    if (!confirmation) {
      return await message.reply('command cancelled.');
    }

    for (const { user } of users.array()) await message.guild!.members.unban(user);

    await this.client.confirm(message, `Successfully unbanned ${all ? 'all banned users' : this.client.join(names)}.`);
  }
}
