import { DMChannel, Message, MessageReaction, TextChannel } from 'discord.js';
import { Listener } from '../../structs/listener';

// When anything happens, Discord's API sends a packet referencing information
// about that event, generally, you shouldn't use this event as Discord.js
// processes these packets for you in the form of events.

// The reason why this event is manually processed is because of the
// messageReactionAdd and messageReactionRemove event, these events execute when
// a user adds/removes a reaction for a message, the problem being, this event
// executes only for cached messages, not uncached messages.

// Although, the raw event is emitted when a user adds/removes a reaction
// regardless if the message is cached or uncached, so we'll manually handle
// this event and emit the messageReactionAdd/messageReactionRemove event if the
// given event regards a user adding/removing a reaction on an uncached message.
export default class extends Listener {
  /**
   * Represents the events that represents when a user interacts via reactions.
   */
  public events: string[] = ['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'];

  /**
   * Initializes a new listener instance for the raw event.
   */
  public constructor() {
    super({ event: 'raw', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  packet Represents information about the event.
   */
  public async exec(packet: any): Promise<void> {
    // Ensures that the given event is regarding a user adding or removing a
    // reaction from a message.
    if (!this.events.includes(packet.t)) {
      return;
    }

    const channel = (await this.client.channels.fetch(packet.d.channel_id)) as TextChannel | DMChannel | null;

    // Ensures that the message isn't cached, as if the message is cached, the
    // appropriate event would have already been emitted.
    if (!channel || channel.messages.cache.has(packet.d.message_id)) {
      return;
    }

    // As we know the message isn't cached, we'll fetch it. This will cache the
    // message and allow the appropriate event to be fired normally from now on.
    const message: Message | undefined = await channel.messages.fetch(packet.d.message_id);

    // Next, we'll get the emoji that was used. Emojis may have their ID in the
    // format of: name:id, so we have to account for this possibility as well.
    const emoji: string = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;

    const reaction: MessageReaction = message.reactions.cache.get(emoji)!;

    // Add the reacting user to the reaction's user collection if the user
    // doesn't already exist within the reaction's user collection.
    if (reaction && !reaction.users.cache.has(packet.d.user_id)) {
      reaction.users.cache.set(packet.d.user_id, this.client.users.cache.get(packet.d.user_id)!);
    }

    // Now that we have properly processed the event, we'll emit the event.
    if (packet.t === 'MESSAGE_REACTION_ADD') {
      this.client.emit('messageReactionAdd', reaction, this.client.users.cache.get(packet.d.user_id)!);
    } else {
      this.client.emit('messageReactionRemove', reaction, this.client.users.cache.get(packet.d.user_id)!);
    }
  }
}
