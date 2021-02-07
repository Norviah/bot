import { Listener } from '../../structs/listener';

/**
 * Ready: Emitted when the client is initialized and ready.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the ready event.
   */
  public constructor() {
    super({ event: 'ready', emitter: 'client' });
  }

  /**
   * Executes the listener.
   */
  public async exec(): Promise<void> {
    if (!this.client.user) {
      return this.logger.warn("the client's user object is null.", { title: '__WARNING__', subDir: 'warnings' });
    }

    // If the client's user object is available, we'll set the client's activity
    // to represent how to access the help command.
    this.client.user.setActivity({ type: 'LISTENING', name: `@${this.client.user.username} help` });

    // Log that the client is ready.
    this.logger.success(`${this.client.user.tag}\n`, { title: '__READY__' });

    // After the client is initialized and ready, we'll initialize subcommands.
    this.client.handleSubcommands();
  }
}
