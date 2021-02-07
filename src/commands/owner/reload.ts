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
  description: 'Reloads all modules.',

  /**
   * Determines if this command can only be executed by the client owners.
   */
  ownerOnly: true,
};

// When programming a Discord bot, it's a given that you will make changes to
// aspects of the bot, such as commands. Whenever a change is made, you'll have
// to restart the bot to see the changes in effect. With Akairo, aspects of the
// bot are modules, so instead of restarting the bot, we could restart the
// specific module for commands or another aspect.

// This command reloads the modules for commands, listeners, and inhibitors.
// Note that changes from an aspect that isn't a module, for example to the
// client class, will need to have a restart to see changes.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('reload', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<void> {
    // Reloads all commands,
    this.handler.reloadAll();

    // Every listener,
    this.client.listenerHandler.reloadAll();

    // And every inhibitor.
    this.client.inhibitorHandler.reloadAll();

    // After commands are reloaded, we'll need to reinitialize the array of
    // subcommands.
    this.client.handleSubcommands();

    await message.react(this.client.emotes.thumbsUp);
  }
}
