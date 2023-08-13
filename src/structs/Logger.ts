import { Logger as BaseLogger } from '@norviah/logger';

import type { LoggingOptions } from '@norviah/logger';

import * as paths from '@/util/paths';

export class Logger extends BaseLogger {
  /**
   * Initializes a new `Logger` instance.
   *
   * @param options Options for the logger.
   */
  public constructor(options?: Partial<LoggingOptions>) {
    super({ write: true, dir: paths.LOGS, both: true, format: { title: '%t ' }, ...options });
  }

  /**
   * A shortcut method for logging an `error` event.
   *
   * @param content The content to log.
   * @param options Options for the log.
   */
  public error(content: string | string[], options?: Partial<LoggingOptions>): void {
    super.error(content, { subDir: 'errors', ...options });
  }

  /**
   * A utility method for logging an `error` event and exiting the process.
   *
   * @param content The content to log.
   * @param options Options for the log.
   */
  public exit(content: string | string[], options?: Partial<LoggingOptions> & { code?: number }): never {
    this.error(content, options);
    process.exit(options?.code);
  }
}
