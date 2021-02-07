import { Message, GuildMember } from 'discord.js';
import { Argument } from 'discord-akairo';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

import { punctuate } from '../../util/punctuate';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: `Bans the mentioned user(s) indefinitely. If wanted, messages sent from the mentioned user(s) within the past 7 days can be deleted \
    as well using the \`--days\` flag. In addition, a reason can be provided with the \`--reason\` flag.`,

  /**
   * Contains examples for this command.
   */
  examples: ['ban @user --reason "[reason]"', 'ban @user --days 7', 'ban @user @user --reason "[reason]" --days 7'],

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
      id: 'members',
      type: 'member',
      match: 'separate',
      prompt: { start: 'please mention the user(s) you want to ban.', retry: 'please mention a user that exists' },
    },

    {
      id: 'days',
      match: 'option',
      type: Argument.range('number', 1, 7, true),
      flag: '--days',
      prompt: { optional: true, retry: 'please provide a number 1-7' },
    },

    {
      id: 'reason',
      type: 'string',
      match: 'option',
      flag: '--reason',
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
 * Allows moderators to ban multiple users.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('ban', options);
  }

  /**
   * Executes the command.
   * @param  message      The message that called this command.
   * @param  args         Given arguments.
   * @param  args.members A list of given members to ban.
   * @param  args.days    Numbers of days of messages to delete.
   * @param  args.reason  The reason for banning.
   */
  public async exec(message: Message, args: { members: GuildMember[]; days: number | null; reason: string | undefined }): Promise<any> {
    // The way that Akairo handles types for members is that users can either
    // mention the member, or, they can enter the member's name and Akairo will
    // try to find a member with the given name.

    // The problem being, is that if a member has spaces in their name, Akairo
    // will handle each name as it's own argument and and resolve each name into
    // a member. For example, if a user's name is "random person", and this
    // command is used as "!ban random user", Akairo will resolve each argument,
    // random and user, into a member and we'll get two objects of the same
    // member into the array, so we filter out duplicate members from the array.
    args.members = args.members.filter((member: GuildMember, position: number) => args.members.indexOf(member) === position);

    const confirmation: boolean = await this.client.prompt(message, `Are you suere you want to ban ${this.client.join(args.members)}?`);

    if (!confirmation) {
      return await message.reply('command cancelled.');
    }

    // Before trying to ban the given members, we'll ensure that the client is
    // able to ban every mentioned member.
    const bannable: GuildMember[] = args.members.filter((member: GuildMember): boolean => member.bannable);

    if (bannable.length !== args.members.length) {
      // If the client can't ban any of the given members, we'll stop here.
      if (bannable.length === 0) {
        return this.client.error(message, "I can't ban any of the mentioned members.");
      }

      const alert: string = `I can only ban the user(s) ${this.client.join(bannable)}, do you still want to continue?`;

      if (!(await this.client.prompt(message, alert))) {
        return await message.reply('command cancelled.');
      }
    }

    // Ensure that a reason is provided within the logs.
    const reason: string = punctuate(args.reason ?? 'not provided.');

    for (const member of bannable) {
      await member.ban({ reason: `banned by ${message.author.tag} [${message.author.id}] for the reason: ${reason}` });
    }

    // Once the members are banned, we'll inform the author.
    await this.client.confirm(message, `Banned ${this.client.join(bannable)} for the reason: ${reason}`);
  }
}
