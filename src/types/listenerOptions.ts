import { DiscordEvents } from './typescript/discordEvents';
import { AkairoEvents } from './typescript/akairoEvents';

export interface ListenerOptions {
  /**
   * The emitter that is emitting the event, this has to be an object assigned
   * to the listener handler during initialization.
   */
  emitter: string;

  /**
   * The name of the event to listen to.
   */
  event: DiscordEvents | AkairoEvents | 'unhandledRejection';

  /**
   * The type of listener.
   */
  type?: 'on' | 'off';

  /**
   * The ID of a listener instance, if this value isn't provided, the event will
   * be used as the ID.
   */
  id?: string;
}
