import { Message, Permissions, PermissionString, Role } from 'discord.js';
import { Argument } from 'discord-akairo';
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
      type: Argument.union('role', ['none', ...permissions]),
      match: 'separate',
      prompt: { start: 'what permission(s) or role(s) do you want to restrict this command behind?', retry: 'please provide a valid permission, role, or, `none`' },
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
  public async exec(message: Message, args: { command: Command; permissions: (Role | PermissionString | 'none')[] }): Promise<any> {
    // As users can provide multiple permissions, it's possible that a
    // permission may be entered more than once, so we'll filter out the array
    // to only contain unique elements.
    args.permissions = args.permissions.filter((permission: Role | PermissionString | 'none', i: number): boolean => args.permissions.indexOf(permission) === i);

    // As a command can be restricted behind either roles and/or permissions,
    // we'll initialize two arrays to represent both options.
    const roles: Role[] = args.permissions.filter((permission: Role | PermissionString | 'none') => permission instanceof Role) as Role[];

    // Next, we'll create an array to represent the given permissions.
    const perms: PermissionString[] = args.permissions.filter((permission: Role | PermissionString | 'none') => permissions.includes(permission as any)) as PermissionString[];

    // Determines if the author wants to allow anyone to execute the cocommand.
    const none: boolean = args.permissions.includes('none');

    // Represents the required permissions for this command. If the author
    // allows everyone to execute the command, we'll set the 'none' property to
    // represent this, otherwise, we'll set the other properties.

    // Additionally, how permission works is that a user must have either the
    // given permission, or, the role to execute the command. Due to this
    // either/or system, if no permission/role is given, we won't assign it.
    const required = none ? { permissions: null, roles: null, none } : { permissions: perms.length ? perms : null, roles: roles.length ? roles.map((role: Role) => role.id) : null, none };

    this.client.database.put(message.guild!, 'permissions', args.command.id, required);

    // Now we can call that command to get the custom permissions for the guild,
    // we'll use this to get the string representing of the set permissions.
    const { string } = args.command.getPermissions(message.guild!)!;

    // Better represents who is available to execute the given command regarding
    // the new set of permissions given to consider.
    const who: string = `${none ? 'Anyone' : 'Only users with the set role(s) and/or permission(s)'} can execute this command`;

    await this.client.confirm(message, `Successfully set the permissions for the command **${args.command.id}** to ${string}. ${who} can execute this command.`);
  }
}
