import { Collection, Guild, Message, Snowflake } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * MessageDeleteBulk: Emitted when messages are deleted in bulk.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the messageDeleteBulk event.
   */
  public constructor() {
    super({ event: 'messageDeleteBulk', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  messages A collection containing the deleted messages.
   */
  public async exec(messages: Collection<Snowflake, Message>): Promise<void> {
    // We'll get the first message from the collection, so that we have a
    // variable to use to reference properties that we'll need.
    const message: Message | undefined = messages.first();

    const guild: Guild | null | undefined = message?.guild;

    // Ensure that a message has been found and that a guild property exists.
    if (!message || !guild) {
      return;
    }

    await this.client.log(guild, { description: `Bulk delete in ${message.channel}`, event: 'messageDeleteBulk', color: 'red', entity: guild });
  }
}
