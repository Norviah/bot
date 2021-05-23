import { Message, User } from 'discord.js';

import { Command } from '../../structs/command';
import { Listener } from '../../structs/listener';

/**
 * MissingPermissions: Emitted when the client or a user tries to execute a
 * command they don't have permissions for.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the missingPermissions event.
   */
  public constructor() {
    super({ event: 'missingPermissions', emitter: 'commandHandler' });
  }

  /**
   * Executes the listener.
   * @param  message The message that called the command.
   * @param  command The command that the user doesn't have permissions for.
   * @param  type    Represents who is missing permissions: 'client' or 'user'.
   * @param  missing Represents the missing permissions.
   */
  public async exec(message: Message, command: Command, type: string, missing: Permissions & { string: string }): Promise<void> {
    const user: User | null = type === 'client' ? this.client.user : message.author;

    // As this event is emitted whenever a user is missing permissions for a
    // specific command, we'll set the description to reflect this.
    const description: string = `${type === 'client' ? 'I' : 'You'} need the permission(s) ${missing.string} to execute the command: **${command.id}**.`;

    await this.client.error(message, description, { entity: user });

    // We also want to log that the user tried to execute a command while
    // missing permissions, but before continuing, we'll ensure that we don't
    // log when it's the client that is missing permissions.
    if (type !== 'user') {
      return;
    }

    const log: string = `${this.author(message)} tried to execute '${command.id}' in ${this.location(message)} while missing the permission(s): ${missing.string}`;

    this.logger.log(log, { title: 'MISSING PERMISSIONS', subDir: 'missing permissions' });
  }
}
