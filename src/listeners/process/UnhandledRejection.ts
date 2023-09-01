import { Listener } from '@/structs/Listener';

/**
 * The listener to bind to the `unhandledRejection` event from the Node.js
 * process.
 *
 * This event is emitted whenever a promise is rejected and no error handler is
 * attached to the promise within a turn of the event loop.
 *
 * @see https://nodejs.org/api/process.html#event-unhandledrejection
 */
export default class UnhandledRejection extends Listener {
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
  public event: string = 'unhandledRejection';

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
   * @param reason The object with which the promise was rejected.
   * @param promise The promise that was rejected.
   */
  public async exec(reason: Error | unknown, promise: Promise<unknown>): Promise<void> {
    this.logger.error(`${reason instanceof Error ? reason.stack ?? reason.message : reason}`, { title: 'unhandled rejection', subDir: 'rejections' });
  }
}
