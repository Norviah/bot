import { User, VoiceState } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * VoiceStateUpdate: Emitted when the voice state of a user changes, e.g.
 * muting/unmuting and deafening/undeafening.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the voiceStateUpdate event.
   */
  public constructor() {
    super({ event: 'voiceStateUpdate', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param before Represents the user's voice state before the update.
   * @param after  Represents the user's voice state after the update.
   */
  public async exec(before: VoiceState, after: VoiceState): Promise<void> {
    const user: User | undefined = (before.member ?? after.member)?.user;

    // Represents the ID of this event.
    const event = 'voiceStateUpdate';

    // In order to determine if a user has joined a voice channel we'll have to
    // compare the channel from before and after the update, ensuring that the
    // names are different.

    // As this event is executed when anything happens to a user's voice state,
    // it's important to ensure that the event is about a change from the user's
    // voice channel, to prevent this message from being logged when anything
    // else happens, such as the user muting/unmuting themself.
    if (after.channel && before.channel?.id !== after.channel.id) {
      await this.client.log(before.guild, { event, description: `${user} joined the voice channel **${after.channel}**.`, entity: user });
    }

    // To determine if a user has left a voice channel, we'll check if the
    // user's state before the update has a channel property while the state
    // after the change doesn't have a channel property.
    else if (before.channel && !after.channel) {
      await this.client.log(before.guild, { event, description: `${user} left the voice channel **${before.channel}**.`, entity: user });
    }
  }
}
