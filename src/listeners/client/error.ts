import { Listener } from '../../structs/listener';

/**
 * Error: Emitted when the Discord.js client encounters an error.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the error event.
   */
  public constructor() {
    super({ event: 'error', emitter: 'client', id: 'clientError' });
  }

  /**
   * Executes the listener.
   * @param  error The error that was thrown.
   */
  public async exec(error: Error): Promise<void> {
    this.logger.error(`${error}\n${error.stack}\n`, { subDir: 'errors/client' });
  }
}
