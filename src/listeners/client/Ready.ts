import { Listener } from '@/structs/Listener';
import type { Client } from '@/structs/Client';

/**
 * The listener to bind to the `ready` event from the Discord client.
 *
 * This event is emitted once the client is ready to start interacting with
 * Discord's API.
 *
 * @see https://old.discordjs.dev/#/docs/discord.js/main/class/Client?scrollTo=e-ready
 */
export default class Ready extends Listener {
  /**
   * The event emitter that will emit the desired event.
   *
   * @see https://old.discordjs.dev/#/docs/discord.js/main/class/Client
   */
  public emitter: string = 'client';

  /**
   * The desired event to listen to.
   */
  public event: string = 'ready';

  /**
   * The category of the listener.
   *
   * Categories are used to group listeners together, we'll use this to group
   * listeners by their emitter.
   */
  public category: string = 'client';

  /**
   * Executes the listener.
   *
   * Once the client is ready to start working, this method is then called.
   * We'll simply implement this method to print that the client is indeed
   * ready to start working.
   *
   * @param client The instantiated client.
   */
  public async exec(client: Client): Promise<void> {
    if (!client.user) {
      return this.logger.warn("the client's user object is null", { subDir: 'warnings' });
    }

    this.logger.success(`${client.user.tag}\n`, { title: '__READY__' });
  }
}
