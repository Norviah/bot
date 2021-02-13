import { Message } from 'discord.js';
import { basename } from 'path';
import prettyMilliseconds from 'pretty-ms';

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
  description: 'Provides statistics about the client.',

  /**
   * Determines if this command can only be executed by the client owners.
   */
  ownerOnly: true,
};

export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('stats', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called the command.
   */
  public async exec(message: Message): Promise<void> {
    const field: { [key: string]: any } = {
      /**
       * Represents how long the client has been up.
       */
      Uptime: this.client.uptime ? prettyMilliseconds(this.client.uptime, { verbose: true }) : '[unknown]',

      /**
       * Represents the amount of usage that the process has used,
       * (in megabytes).
       */
      'Memory Usage': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,

      /**
       * Represents how many servers the client is in.
       */
      Servers: this.client.guilds.cache.size,

      /**
       * Represents how many users the client has cached.
       */
      Users: this.client.users.cache.size,

      /**
       * Represents the Node.js' version.
       */
      Node: process.version,
    };

    await this.client.inform(message, undefined, { field, entity: null });
  }
}
