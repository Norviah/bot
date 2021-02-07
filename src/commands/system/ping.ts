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
  description: 'Provides information about latency.',
};

// Provides information about latency.
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('ping', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<void> {
    // We'll send a dummy message to the channel and wait for it to send, we'll
    // use this message to compare latency with the original message.
    const dummy: Message = await message.util!.send('Ping?');

    // Once the dummy message is sent, we'll compare the timestamp of it and the
    // original message.
    await dummy.edit(`Pong! Latency is **${dummy.createdTimestamp - message.createdTimestamp}**ms, API Latency is **${this.client.ws.ping}**ms.`);
  }
}
