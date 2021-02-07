import { Listener } from '../../structs/listener';

/**
 * UnhandledRejection: Emitted whenever a promise is rejected and no error
 * handler is attached to resolve/handle the error.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the event.
   */
  public constructor() {
    super({ event: 'unhandledRejection', emitter: 'process' });
  }

  /**
   * Executes the listener.
   * @param  error The error that was thrown.
   */
  public async exec(error: Error): Promise<void> {
    this.logger.error(`[unhandled rejection] ${error.stack}\n`, { title: 'REJECTION', subDir: 'rejections' });
  }
}
