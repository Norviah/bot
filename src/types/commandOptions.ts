import { PermissionString } from 'discord.js';
import { CommandOptions as Base } from 'discord-akairo';

import { ArgumentOptions } from './argumentOptions';

/**
 * Represents options to use for commands.
 */
export interface CommandOptions extends Base {
  /**
   * Represents a list of aliases for this command, these elements represents
   * other names for a command.
   */
  aliases?: string[];

  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in, rather than being hard coded.
   */
  category: string;

  /**
   * Provides a description of this command.
   */
  description: string;

  /**
   * Contains examples for this command.
   */
  examples?: string[];

  /**
   * Represents arguments for this command.
   */
  args?: ArgumentOptions[];

  /**
   * This property is special as it represents the permissions that a user needs
   * in order to execute a command, we'll enforce this value to only be set to
   * undefined as we will use the 'userPermissions' method on a command instead.
   * The reason why we enforce this is because Akairo will use this property to
   * determine the permissions for a command over the 'userPermissions' method.
   */
  userPermissions?: undefined;

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command, the reason why we create a custom property to represent this
   * is because we want to use the 'userPermissions' method in tandem with this
   * property, while using the 'userPermissions' property won't allow this.
   */
  permissions?: PermissionString[];

  /**
   * Represents permissions the client needs in order to execute a command.
   */
  clientPermissions?: PermissionString[];
}
