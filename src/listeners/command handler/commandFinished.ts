import { Message } from 'discord.js';

import { Command } from '../../structs/command';
import { Listener } from '../../structs/listener';

/**
 * CommandFinished: Emitted when a user executes a command.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the commandFinished event.
   */
  public constructor() {
    super({ event: 'commandFinished', emitter: 'commandHandler' });
  }

  /**
   * Executes the listener.
   * @param  message The message that called the command.
   * @param  command The command that was called.
   * @return         [description]
   */
  public async exec(message: Message, command: Command): Promise<void> {
    this.logger.log(`${this.author(message)} executed __${command.id}__ in: ${this.location(message)}`, { subDir: 'executions' });
  }
}
