import { Listener } from '../../structs/listener';

/**
 * Warn: Emitted when the Discord.js client throws a warning.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the warn event.
   */
  public constructor() {
    super({ event: 'warn', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  info Information about the warning.
   */
  public async exec(info: string): Promise<void> {
    this.logger.warn(`${info}`, { subDir: 'warnings/client' });
  }
}
