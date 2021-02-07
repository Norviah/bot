import { Message } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';
import { LoggedEvents } from '../../types/typescript/events';

import { events } from '../../config/events';
import { join } from '../../util/join';

/**
 * Represents the supported list of events.
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
  description: 'As certain events can be logged into a specific channel, use this command to disable undesired events.',

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
      id: 'events',
      type: [...keys, 'all'],
      match: 'separate',
      prompt: { start: 'which event(s) would you like to disable?', retry: `please provide a valid event, one of \`${join(keys, ' ')}\` or \`all\`.` },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to disable specific events for the client to log.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('events-disable', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Arguments for the command.
   * @param  args.events The events to disable for this guild.
   */
  public async exec(message: Message, args: { events: (LoggedEvents | 'all')[] }): Promise<any> {
    // If the user has given "all", that represents that they want to disable
    // all events, and so we'll set the array to all possible logged events.
    if (args.events.includes('all')) {
      args.events = [...keys];
    }

    // For every given event, we'll disable that event from the guild's
    // database. We'll check if the element is "all" even though it can't as we
    // reset the array's value, but we'll do so due to TypeScript.
    for (const event of args.events) {
      if (event !== 'all') {
        this.client.database.put(message.guild!, 'events', event, false);
      }
    }

    await this.client.confirm(message, `Disabled the events: ${this.client.join(args.events.map((event: string) => `**${event}**`))}.`);
  }
}
