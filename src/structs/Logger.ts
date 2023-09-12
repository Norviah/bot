import { Logger as BaseLogger } from '@norviah/logger';

import { config } from '@/util/config';
import { join } from 'path';

import type { Options as LoggerOptions, LoggingOptions } from '@norviah/logger';

import * as paths from '@/util/paths';

export class Logger extends BaseLogger {
  /**
   * Initializes a new `Logger` instance.
   *
   * @param options Options for the logger.
   */
  public constructor(options?: Partial<LoggerOptions>) {
    super({ write: true, dir: paths.LOGS, both: true, format: { title: '%t ' }, ...options });
  }

  /**
   * A shortcut method for logging an `error` event.
   *
   * @param content The content to log.
   * @param options Options for the log.
   */
  public error(content: string | string[], options?: Partial<LoggingOptions>): void {
    super.error(content, { ...options, subDir: options?.subDir ? join('errors', options.subDir) : 'errors' });
  }

  /**
   * Logs the provided content as debug information.
   *
   * Debug information are information that isn't necessarily important, but
   * can be useful for debugging purposes.
   *
   * @param content The content to log.
   * @param options Options for the log.
   */
  public debug(content: string | string[], options?: Partial<LoggingOptions>): void {
    if (config.debug) {
      this.info(content, { ...options, title: options?.title ? `[debug] ${options.title}` : '[debug]' });
    }
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
