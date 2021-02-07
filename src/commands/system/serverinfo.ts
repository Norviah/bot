import { Message } from 'discord.js';
import { basename } from 'path';
import spacetime from 'spacetime';

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
  description: 'Provides information about this server.',

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

// Provides information about the guild that the command has been called in.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('serverinfo', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called the command.
   */
  public async exec(message: Message): Promise<void> {
    const field: { [key: string]: any } = {
      /**
       * Represents when the guild was created.
       */
      'Created At': spacetime(message.guild!.createdAt).format('MMM d, Y h:mm a'),

      /**
       * Represents the guld's region.
       */
      Region: message.guild!.region,

      /**
       * Represents how many members the guild has.
       */
      Members: message.guild!.members.cache.size,

      /**
       * Represents how many roles the guild has.
       */
      Roles: message.guild!.roles.cache.size,

      /**
       * Represents a list of every role from this guild.
       */
      'Role List': this.client.join(message.guild!.roles.cache.array()),
    };

    await message.util!.send(this.client.embed({ field, note: `ID: ${message.guild!.id}`, entity: message.guild! }));
  }
}
