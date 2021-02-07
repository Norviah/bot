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
  description: 'Get a link to invite me to your server.',
};

// Sends the invite link for the client, which is set in the client's config
// object, to a user. Leave the invite link as undefined if you don't want users
// to be able to get the invite link.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('invite', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<void> {
    const { invite: link } = this.client.config;

    // As the client owner may not have set the client's invite link in the
    // config, we'll set the description to reflect this.
    const description: string = link ? `[Click here](${link}) to invite me to your server!` : 'Sorry, my invite link is currently private.';

    await message.util!.send(this.client.embed({ entity: message.author, color: link ? 'blue' : 'red', description }));
  }
}
