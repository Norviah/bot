import { Message } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

import { events } from '../../config/events';
import { join } from '../../util/join';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Lists all possible events that can be logged into a specific channel.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

// As the contents of this class' main method isn't dynamic, we'll statically
// set it outside of the method and call the variables at each call.

// First, we'll need to get the list of supported events from the database.
// As this information doesn't revolve around a specific guild, we can get
// it from the default settings for guilds.

// Next, we'll simply initialize an array with the names of each event.
const names: string[] = Object.keys(events).map((name: string): string => `\`${name}\``);

const description: string = `Here are the list of supported events: ${join(names)}.\n\nTo get a description of what a certain event represents, use the \`events describe [name]\` subcommand.`;

/**
 * Allows moderators to view available events.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('events-list', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<void> {
    await this.client.inform(message, description);
  }
}
