import { Guild, Message, PermissionString } from 'discord.js';
import { Command as Base, Flag } from 'discord-akairo';

import { Client } from '../structs/client';
import { CommandOptions } from '../types/commandOptions';
import { ArgumentOptions } from '../types/argumentOptions';

import { ensure } from '../util/ensure';
import * as regex from '../util/regex';

export class Command extends Base {
  /**
   * Commands have access to the client instance that was initialized and being
   * used, but, the type of the client property is the base Akairo client. As we
   * have a custom client instance, we'll have to type cast it for TypeScript.
   */
  public readonly client: Client = this.client as Client;

  /**
   * Provides information about this command.
   */
  public readonly description!: string;

  /**
   * Represents an array of methods of how to properly use this command.
   */
  public readonly usage: string[];

  /**
   * Represents examples for this command.
   */
  public readonly examples?: string[];

  /**
   * Represents if this command has arguments.
   */
  public readonly arguments!: boolean;

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command, if this value is undefined or empty, that represents that
   * this command has no permissions and anyone can execute it.
   */
  public readonly permissions?: PermissionString[];

  /**
   * If this command is a parent, this tuple will reference the subcommands
   * along with the name of each subcommand.
   */
  public subcommands?: Array<[string, string]>;

  /**
   * Determines if this command is a subcommand.
   */
  public subcommand: boolean = false;

  /**
   * Represents the name of this command. If this command is a subcommand, this
   * property will reference the name of the subcommand, otherwise, it's the ID
   * of the command.
   */
  get name(): string {
    return this.id.replace(/(\w+-?)+-(\w+$)/, '$2');
  }

  /**
   * Initializes a new Command instance.
   * @param id      The command's ID.
   * @param options Options for the command.
   */
  public constructor(id: string, options: CommandOptions) {
    super(id, { ...options, aliases: [id, ...(options.aliases ?? [])] });

    Object.assign(this, { examples: options.examples, permissions: options.permissions, arguments: !!options.args });

    // In this constructor, we'll only generate a usage array to represent how
    // to properly use this command. Ideally, we would also want to work on
    // subcommands, but, the client property isn't set, so we'll do this in the
    // ready event for the client.

    // We'll check if the command has any arguments, if not, we'll simply set
    // the usage to an array consisting of only the command's ID.

    this.usage = [id];

    if (!options.args) {
      return;
    }

    // First, we'll generate an array representing the IDs of each argument,
    // wrapped in either [] or <> to determine if said argument is required.
    const args: string[] = options.args.filter((arg) => !arg.flag).map((arg) => (arg.prompt?.optional ? `[${arg.id}]` : `<${arg.id}>`));

    // By wrapping arguments in either [] or <>, we can determine if this
    // commandr requires an argument, to determine its usage.
    const required: boolean = args.some((arg: string) => regex.commands.required.test(arg));

    // Using this generated array, we can initialize a new array representing
    // how to properly use this command. If the command doesn't require command,
    // we'll have it's ID as an element, to represent that it can be used
    // without any required arguments.
    const usage = (this.usage = [...(required ? [] : [id]), `${id} ${args.join(' ')}`]);

    const flags: ArgumentOptions[] = options.args.filter((arg: ArgumentOptions) => arg.flag);

    for (const arg of flags) {
      // As flags may have more than one flag, we'll join them into a string.
      arg.flag = Array.isArray(arg.flag) ? arg.flag.join('/') : arg.flag;

      // Arguments may match 'option', which represents that the flag requires a
      // value, so we'll put a '<value>' to represent this.
      arg.flag = arg.match === 'option' ? `${arg.flag} <value>` : arg.flag;

      // Similar to arguments, flags can either be required or optional, so
      // we'll wrap each flag in either [] or <> to represent this.
      arg.flag = !!arg.prompt && !arg.prompt.optional ? `<${arg.flag}>` : `[${arg.flag}]`;
    }

    usage[usage.length - 1] = `${usage[usage.length - 1]}${flags.length ? ` ${flags.map((arg) => arg.flag).join(' ')}` : ''}`;
  }

  /**
   * A generator function used to handle subcommands for commands.
   * @return A pointer for another command, or, undefined.
   */
  public *args(): Generator<Partial<ArgumentOptions>, Flag | undefined, string | null> {
    // If a command has 'options.args' set during initialization, that will be
    // used to determine the arguments for the command, if it doesn't have the
    // array set, meanining that it doesn't take arguments, we'll exit here, as
    // this function is used only to handle subcommands for commands.
    if (!this.subcommands) {
      return;
    }

    // As the point of this function to handle subcommands for commands, we'll
    // initialize an array consisting of the names of supported subcommands.
    // this.subcommands consists of an array of tuples, with the first element
    // as the IDs of the subcommands, and the second element representing the
    // name of the subcommand.

    // So, using this array, we'll generate an array consisting of the names of
    // supported subcommands.

    const names: string[] = this.subcommands.map((subcommand: [string, string]) => subcommand[1]);

    // Essentially, subcommands are handled as arguments. The parent command
    // will have an argument type of sub-arrays consisting of the subcommand's
    // ID and the name of the subcommand, which is represented with
    // this.subcommads. Using this array, we'll get the ID of the subcommand,
    // and we'll use a Flag to tell Akairo to execute the given ID.

    const options: Partial<ArgumentOptions> = {
      type: this.subcommands,
      prompt: { retry: `please provide a valid subcommand, one of \`${this.client.join(names, 'or')}\``, optional: true },
    };

    // Here's the powerful aspect of using a generator function for arguments,
    // we can yield the ArgumentOptions and Akairo will take the object, parse
    // arguments according to the object, and return it into a variable.
    const subcommand: string | null = yield options;

    // If a subcommand is found, we'll use a Flag instance to tell Akairo to
    // execute the command with the given ID. If a command with the given ID
    // couldn't be found, the command's execution will be executed.
    if (subcommand) {
      return Flag.continue(subcommand);
    }

    // If a subcommand isn't given, we'll simply return, which will execute this
    // command's execution method without any arguments.
    else return;
  }

  /**
   * Returns an object containing an array representing the usage for this
   * command in addition to each subcommand and an array representing the
   * permissions that a user needs to execute it within the given guild.
   * @param  guild The guild to use when determining permissions.
   * @return       An object representing information for this command.
   */
  public information(guild: Guild | null): { usage: string[]; permissions: string[] } {
    // To get the usage array of this command, we'll have to initialize a copy
    // of the array, as if we don't, the changes we make will be permanent. As
    // commands may have subcommands, we'll replace every hyphen with a space,
    // however, we take into account to not remove hypens for flags.
    const usage: string[] = [...this.usage].map((usage: string) => usage.replace(/(?<![\[-])-/g, ' '));

    // We'll also check to see if this command has any subcommands.
    // Subcommands are set in tuples, with the first element representing the
    // subcommand's full ID and the second element representing the name of the
    // subcommand.

    // So if this command has subcommands, we'll initialize a new array
    // consisting of the IDs of each subcommand.
    const subcommands: string[] | undefined = this.subcommands?.map((subcommand: [string, string]) => subcommand[0]);

    // Now that we have the IDs of each subcommand, we'll intiialize a new array
    // containing the actual command object for each subcommand.
    const commands: Command[] = (subcommands?.map((id: string) => this.handler.modules.get(id)).filter(ensure) as Command[]) ?? [];

    for (const command of commands) {
      for (const string of command.usage) usage.push(string.replace(/(?<![\[-])-/g, ' '));
    }

    // Represents the permissions needed for the base command.
    const base: PermissionString[] | undefined = this.getPermissions(guild);

    // Now that we have an array representing the usage for each command, we'll
    // then initialize an object to represent the permissions for the base
    // command in addition to each subcommand.
    const permissions: string[] = [`${this.id.replace(/-/g, ' ')}: \`${base?.length ? base : ['[none]']}\``];

    for (const command of commands) {
      permissions.push(`${command.id.replace(/-/g, ' ')}: \`${this.client.join(command.getPermissions(guild) ?? ['[none]'])}\``);
    }

    return { usage, permissions };
  }

  /**
   * Returns the permissions that a user needs to execute this command, if the
   * given guild has overridden the permissions, those are returned, otherwise,
   * the default permissions for this command are returned.
   * @param  guild The guild to get permissions for.
   * @return       The permissions for this command for the given guild.
   */
  public getPermissions(guild: Guild | null): PermissionString[] | undefined {
    return this.client.database.getKey(guild, 'permissions', this.id) ?? this.permissions;
  }

  /**
   * Determines if the given user has permission to execute this command.
   * @param  message The message that called this command.
   * @return         Represents permissions that the user is missing.
   */
  public userPermissions = (message: Message): PermissionString[] | null => {
    if (!message.guild) {
      return null;
    }

    // Get the permissions for this command for this specific guild.
    const permissions: PermissionString[] | undefined = this.getPermissions(message.guild);

    // If this command needs a user to have permissions, whether it's the
    // default permissions or custom permissions overriden by the guild, we'll
    // ensure that the given member has these permissions before continuing.
    if (permissions && !message.member!.hasPermission(permissions)) {
      return permissions;
    }

    return null;
  };
}
