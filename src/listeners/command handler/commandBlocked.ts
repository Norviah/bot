import { Message } from 'discord.js';

import { Command } from '../../structs/command';
import { Listener } from '../../structs/listener';

/**
 * CommandBlocked: Emitted when the command handler blocks a user from executing
 * a command.
 */
export default class extends Listener {
  /**
   * A list of reasons of why a user may be blocked from using a command.
   */
  public reasons = { owner: 'a bot owner', guild: 'in a server', dm: 'in my DMs' };

  /**
   * Initializes a new listener instance for the commandBlocked event.
   */
  public constructor() {
    super({ event: 'commandBlocked', emitter: 'commandHandler' });
  }

  /**
   * Executes the listener.
   * @param  message The message that was blocked from using the command.
   * @param  command The command that the author was blocked from using.
   * @param  reason  The reason why the author was blocked.
   */
  public async exec(message: Message, command: Command, reason: 'owner' | 'guild' | 'dm'): Promise<void> {
    if (!this.reasons[reason]) {
      return;
    }

    await this.client.error(message, `This command can only be executed if you are ${this.reasons[reason]}.`);

    // We'll have the log represent: the user of the message, where the message
    // was sent and the command that the user was blocked from using.
    const log: string = `${this.author(message)} was blocked from using the command '${command.id}' in ${this.location(message)} for the reason: ${reason}`;

    this.logger.log(log, { title: 'BLOCKED', subDir: 'blocks' });
  }
}
