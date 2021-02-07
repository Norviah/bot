import { Message } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * Message: Emitted when a message is sent in any text channel, either in a
 * guild or the client's DMs.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the message event.
   */
  public constructor() {
    super({ event: 'message', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  message The message that was sent.
   */
  public async exec(message: Message): Promise<void> {
    // If the message pinged the client with no message, e.g. "@client", we'll
    // respond with the client's prefix for the guild the message is in.
    if (message.content.match(`^<@!?${this.client.user?.id}>( |)$`)) {
      await message.reply(`my prefix is \`${this.client.database.guild(message.guild).settings.prefix}\`.`);
    }
  }
}
