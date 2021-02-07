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
  description: 'Provides information about commands.',

  /**
   * Arguments for this command.
   */
  args: [
    {
      id: 'command',
      type: 'commandAlias',
      prompt: { start: 'what command do you need help with?', retry: 'please provide a valid command', optional: true },
    },
  ],
};

// Provides users a list of all available commands, or, information for a
// specfic command if one is given.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('help', options);
  }

  /**
   * When this command is used and a command isn't given, this method will be
   * used instead, which will reply with a list of every command to the author.
   * @param  message The message that called this command.
   */
  public async list(message: Message): Promise<void> {
    // Commands are categorized under categories, which will be a simple way to
    // send a list of all commands. We'll initialize an object to hold
    // references to categories along with an array of commands.
    const categories: { [key: string]: string } = {};

    for (const category of this.handler.categories.values()) {
      // Commands may be a subcommand, so we'll filter out every command from
      // category then join the resulting array with the IDs of each command.
      const commands: string[] = category.filter((command) => !(command as Command).subcommand).map((command) => command.id);

      categories[category.id] = commands.join(', ');
    }

    const description: string =
      'For help on a specific command, use `help <command>`, for help on subcommands, use `help [command]-[subcommand]`, for example, `help tag-create`.\n\n\
      Some commands may accept arguments, arguments wrapped in **[]** represents that that argument is optional, while **<>** represents that that argument\
      is required. For example, `help` is represented as `help [command]`, so you can use `help` as `help <command>` or just `help`.';

    await message.util!.send(this.client.embed({ description, title: 'Available Commands', field: categories, timestamp: undefined }));
  }

  /**
   * Executes the command.
   * @param  message      The message that called this command.
   * @param  args         Given arguments.
   * @param  args.command The command to print documentation for.
   */
  public async exec(message: Message, args: { command: Command | null }): Promise<void> {
    if (!args.command) {
      return await this.list(message);
    }

    const { command } = args;
    const { id, category, clientPermissions, description, examples } = command;

    // Subcommands for commands are set in tuple, with the first element
    // representing the command's full ID and the second representing the name
    // of the subcommand. So we'll initialize an array with only the names.
    const subcommands: string[] | undefined = command.subcommands?.map((subcommand: [string, string]) => subcommand[1]);

    // As the subcommands array is initialized as an array, we'll initialize a
    // string containing the elements of this array.
    const names = subcommands ? subcommands.join(', ') : undefined;

    // Here we initialize a string containing every alias for the command, as
    // the command's ID is an element of this array, we'll remove it first.
    const aliases: string = this.client.join(command.aliases.filter((alias: string) => alias != command.id));

    const { usage, permissions } = command.information(message.guild);

    const field: { [key: string]: any } = {
      aliases,
      subcommands: names,
      usage,
      examples,
      permissions,
      clientPermissions,
    };

    await message.util!.send(this.client.embed({ description, title: `${category}: ${id}`, field, timestamp: undefined }));
  }
}
