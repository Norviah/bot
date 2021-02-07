import { Message, Permissions, PermissionString } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

/**
 * A list of permissions.
 */
const permissions: PermissionString[] = Object.keys(Permissions.FLAGS) as PermissionString[];

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: `Changes the permissions that a member needs in order to execute the given command, to provide multiple permissions, separate each permission with a space. \
  If you would like anyone to execute the given command, provide 'none' as a value.\n\n\
  To change the permissions of a specific subcomamnd, use \`permissions [base command]-[subcommand]\`.\n\n\
  **Available permissions are**\n\`\`\`${permissions.join('\n')}\`\`\``,

  /**
   * Contains examples for this command.
   */
  examples: ['permissions set greeting manage_guild manage_members', 'permissions set greeting none', 'permissions set tag-create manage_guild'],

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [
    {
      id: 'command',
      type: 'commandAlias',
      prompt: { start: 'which command would you like to change permissions for?', retry: 'please provide a valid command' },
    },

    {
      id: 'permissions',
      type: ['none', ...permissions],
      match: 'separate',
      prompt: { start: 'what permissions do you want users to have?', retry: 'please provide a valid permission, or, `none`' },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to change the permissions of a command.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('permissions-set', options);
  }

  /**
   * Executes the command.
   * @param  message          The message that called this command.
   * @param  args             Given arguments.
   * @param  args.command     The command to change permissions for this guild.
   * @param  args.permissions The new permissions to set.
   */
  public async exec(message: Message, args: { command: Command; permissions: (PermissionString | 'none')[] }): Promise<any> {
    // As users can provide multiple permissions, it's possible that a
    // permission may be entered more than once, so we'll filter out the array
    // to only contain unique elements.
    args.permissions = args.permissions.filter((permission: PermissionString | 'none', i: number): boolean => args.permissions.indexOf(permission) === i);

    // We'll initialize an array to reference the permissions that the user
    // wants to use and overwrite the existing permissions for the given
    // command. If 'none' is given, we'll instead use an empty array.
    const permissions: PermissionString[] = args.permissions.includes('none') ? [] : (args.permissions as PermissionString[]);

    this.client.database.put(message.guild!, 'permissions', args.command.id, permissions);

    // Represents the new set of permissions as a string.
    const string: string = permissions.length ? this.client.join(permissions) : 'none';

    // Better represents who is available to execute the given command regarding
    // the new set of permissions given to consider.
    const who: string = `${permissions.length ? 'only users with the set permission(s)' : 'anyone'} can execute this command`;

    await this.client.confirm(message, `Successfully set the permissions for the command **${args.command.id}** to \`${string}\`, ${who}.`);
  }
}
