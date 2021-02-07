import { Message } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';
import { LoggedEvents } from '../../types/typescript/events';

import { events } from '../../config/events';
import { join } from '../../util/join';

/**
 * Represents the valid keys that can be reset in a guild's entry within the
 * database.
 */
const keys: LoggedEvents[] = Object.keys(events) as LoggedEvents[];

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Provides information of what a certain key means what it represents.',

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
      id: 'event',
      type: keys,
      prompt: { start: 'which event do you want a description of?', retry: `please provide a valid event, one of \`${join(keys, 'or')}\`` },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to get a description of a certain event.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('events-describe', options);
  }

  /**
   * Executes the command.
   * @param  message    The message that called this command.
   * @param  args       Arguments for this command.
   * @param  args.event The event to describe for the user.
   */
  public async exec(message: Message, args: { event: LoggedEvents }): Promise<void> {
    await message.util!.send(this.client.embed({ description: this.client.descriptions.events[args.event], title: args.event }));
  }
}
