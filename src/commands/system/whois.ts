import { Message, GuildMember, Role } from 'discord.js';
import { basename } from 'path';
import spacetime from 'spacetime';

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
  description: 'Provides information about a user.',

  /**
   * Arguments for this command. As this command wants a guild member as an
   * argument, if no arguments are provided, the member who called the command
   * will be used as the default argument.
   */
  args: [
    {
      id: 'member',
      type: 'member',
      default: (message: Message): GuildMember => message.member!,
      prompt: { retry: 'please provide a valid member', optional: true },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

// Provides information about a given member within the guild, or, the member
// who called the command if another member isn't provided as an argument.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('whois', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called the command.
   * @param  args        Given arguments.
   * @param  args.member The member to provide information of.
   */
  public async exec(message: Message, args: { member: GuildMember }): Promise<void> {
    // When providing information of the given member, we'll also want to
    // provide a list of roles that the member currently has. Discord.js' lists
    // @everyone as a role, so we have to filter it out first.
    const roles: Role[] = args.member.roles.cache.filter((role: Role) => role.id !== message.guild!.roles.everyone.id).array();

    // Here, we'll generate values that we'll use regarding the member.

    const Joined: string = args.member.joinedAt ? spacetime(args.member.joinedAt).unixFmt('MMM d, Y h:mm a') : '**?**';
    const Registered: string = spacetime(args.member.user.createdAt).unixFmt('MMM d, Y h:mm a');
    const Roles: string = roles.length ? this.client.join(roles) : '[none]';

    const field: { [key: string]: string } = { Joined, Registered, Roles };

    // When using embed messages, we can set a user or a guild to be the author
    // of the message, which sets the user's or guild's name and image to the
    // message. If a user is set, it doesn't allow other users to be able to
    // click the name/image and be presented with the user's profile, similar to
    // clicking a mention of a user.

    // So we'll set the description to a mention of the user so other users are
    // able to view that user's profile.
    const description: string = `${args.member}`;

    this.client.inform(message, undefined, { entity: args.member.user, description, field, note: `ID: ${args.member.id}` });
  }
}
