import { path } from 'app-root-path';
import { join } from 'path';

/**
 * The absolute path for the project's root directory.
 */
export const ROOT: string = path;

/**
 * The absolute path for the config file.
 */
export const CONFIG: string = join(ROOT, 'config.json');

/**
 * The absolute path for logs.
 */
export const LOGS: string = join(ROOT, 'logs');

/**
 * The absolute path for the project's source code.
 */
export const SRC: string = join(ROOT, 'src');

/**
 * The absolute path for commands.
 */
export const COMMANDS: string = join(SRC, 'commands');

/**
 * The absolute path for listeners.
 */
export const LISTENERS: string = join(SRC, 'listeners');
