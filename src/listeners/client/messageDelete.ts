import { Message, MessageAttachment } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * MessageDelete: Emitted when a message is deleted.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the messageDelete event.
   */
  public constructor() {
    super({ event: 'messageDelete', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  message The message that was deleted.
   */
  public async exec(message: Message): Promise<void> {
    if (!message.guild || message.author.bot) {
      return;
    }

    const content: string = message.content.length ? message.content : '[no content]';

    // We'll have the description represent the author of the message and the
    // contents of the message, we won't say that the author has deleted the
    // message as it's possible that it was deleted by another user.
    const description: string = `**A message sent from ${message.member} was deleed from ${message.channel}**\n${content}`;

    const attachments: MessageAttachment[] = message.attachments.array();

    // As messages may have attachments to them, we'll initialize an array
    // containing the name of each deleted attachment from the message.
    const names: string[] = attachments.map((attachment: MessageAttachment) => attachment.name ?? '[unknown name]');

    // If the message did have attachments, we'll present the name of each
    // attachment to the log. It would be ideal to attach the attachments
    // itself, but since the message is deleted, the attachments are as well.
    const field: { [key: string]: string } = {
      'the following attachment(s) was attached to the message': this.client.join(names),
    };

    await this.client.log(message.guild, { event: 'messageDelete', color: 'red', entity: message.author, field, description, message: message });
  }
}
