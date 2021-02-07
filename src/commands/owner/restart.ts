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
  description: 'Restarts the client.',

  /**
   * Determines if this command can only be executed by the client owners.
   */
  ownerOnly: true,
};

// Restarts the client. This command must be used along with a process manager,
// such as PM2. When exiting the main process with an exit code, atleast for
// PM2, the program will be restarted.

// If you were to exit the process, the main program will simply stop.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('restart', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called the command.
   */
  public async exec(message: Message): Promise<void> {
    await message.react(this.client.emotes.thumbsUp).then(() => process.exit(0));
  }
}
