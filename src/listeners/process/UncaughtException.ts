import { Listener } from '@/structs/Listener';

/**
 * The listener to bind to the `uncaughtException` event from the Node.js
 * process.
 *
 * This event is emitted when an uncaught exception bubbles all the way back to
 * the main event loop.
 *
 * @see https://nodejs.org/api/process.html#event-uncaughtexception
 */
export default class UncaughtException extends Listener {
  /**
   * The event emitter that will emit the desired event.
   *
   * This must be the same string as the key used to pass in the desired emitter
   * when initializing the listener handler.
   *
   * @see https://nodejs.org/api/process.html
   */
  public emitter: string = 'process';

  /**
   * The desired event to listen to.
   */
  public event: string = 'uncaughtException';

  /**
   * The category of the listener.
   *
   * Categories are used to group listeners together, we'll use this to group
   * listeners by their emitter.
   */
  public category: string = 'process';

  /**
   * Executes the listener.
   *
   * When an uncaught exception is thrown, this method is called. We'll log the
   * error to the console and additionally save it to a file for future
   * reference.
   *
   * @param error The uncaught exception.
   * @param origin Indicates if the exception originated from an unhandled
   * rejection or from a sunchronous error.
   */
  public async exec(error: Error, origin: 'uncaughtException' | 'unhandledRejection'): Promise<void> {
    this.logger.error(error.stack ?? error.message, { title: 'unhandled exception', subDir: `exceptions/uncaught/${origin}` });
  }
}
