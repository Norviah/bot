import { Message } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * MessageUpdate: Emitted when a user edits their message.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the messageUpdate event.
   */
  public constructor() {
    super({ event: 'messageUpdate', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  before  Represents the message before the update.
   * @param  after   Represents the message after the update.
   */
  public async exec(before: Message, after: Message): Promise<void> {
    if (!before.guild || before.author.bot) {
      return;
    }

    // Represents the text of the message before and after the update.
    const field: { [key: string]: string } = { Before: before.content, After: after.content };

    // Represents the user that edited the message along with a link to the
    // message.
    const description: string = `A message sent by ${before.author} was edited in ${before.channel}, [link to message](${before.url}).`;

    await this.client.log(before.guild, { event: 'messageUpdate', color: 'blue', entity: before.author, description, field, message: after });
  }
}
