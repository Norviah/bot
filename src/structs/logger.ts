import { Logger } from '@norviah/logger';

/**
 * An initialized instance of the logging system, which allows multiple files to
 * use this module to log without having to initialize a new instance each time.
 */
export const logger: Logger = new Logger({ write: true, both: true });
