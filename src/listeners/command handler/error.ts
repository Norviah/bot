import { Message } from 'discord.js';

import { Command } from '../../structs/command';
import { Listener } from '../../structs/listener';

/**
 * Error: Emitted when a command or inhibitor encounters an error.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the error event.
   */
  public constructor() {
    super({ event: 'error', emitter: 'commandHandler', id: 'akairoError' });
  }

  /**
   * Executes the listener.
   * @param  error   The error that was thrown.
   * @param  message The message that called the command/inhibitor.
   * @param  command Represents the command if the error occurred in one.
   */
  public async exec(error: Error, message: Message, command?: Command): Promise<void> {
    // The 'eval' command allows the client owner(s) to execute code simply by
    // message, as a result, errors from that command are command, so we'll
    // ignore any error that occurs from that command.
    if (command && command.id === 'eval') {
      return;
    }

    // If an error was thrown during execution of a command, we'll set the
    // description to reflect the command's ID.
    const description: string = `An error occurred${command ? ` while executing the command **${command.id}**` : ''}:\n\`${error.message}\`.`;

    await this.client.error(message, description, { command });

    // In the log, we'll have it represent: the command's ID, if the error
    // occurred during an execution of a command, the user's ID, where the
    // message was sent, and the stack of the error.
    const log: string = `[${command ? command.id : '?'}] ${error.message} | ${this.author(message)} in ${this.location(message)}\n${error.stack}`;

    this.logger.error(log, { subDir: 'errors/akairo' });
  }
}
