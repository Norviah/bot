import { join } from 'path';
import { path } from 'app-root-path';

/**
 * Represents the absolute path for this project's root directory.
 */
export const root: string = path;

/**
 * As this project uses TypeScript, we can't use absolute paths as the codebase
 * will be compiled into JavaScript, so, we'll use a relative path to point to
 * the project's root build directory.
 */
export const build: string = join(__dirname, '..');

/**
 * The absolute path for the command sub directory.
 */
export const commands: string = join(build, 'commands');

/**
 * The absolute path for the listeners sub directory.
 */
export const listeners: string = join(build, 'listeners');

/**
 * The absolute path for the directory that will hold the database.
 */
export const database: string = join(root, 'database');
