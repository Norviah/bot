import { ClientError, ErrorCodes } from '@/structs/ClientError';
import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Reads the contents of a specified directory.
 *
 * Given a directory, `readdir` recursively reads the contents of the directory
 * and returns it, consisting of the absolute path for every file.
 *
 * @param dir The directory to read contents from.
 * @returns The contents of the directory.
 */
export function readdir(dir: string): string[] {
  if (!existsSync(dir) || !lstatSync(dir).isDirectory()) {
    throw new ClientError(ErrorCodes.INVALID_DIRECTORY, { path: dir });
  }

  // Initially, we'll read the contents of the base directory. We'll use this
  // array as a basis for reading the contents of each subdirectory.
  const paths: string[] = readdirSync(dir).map((path: string) => join(dir, path));

  // To recursively read the paths for each subdirectory, we'll use the reduce
  // method to visit each path within the base directory.

  // We'll initially start with an empty array and visit each path, if the path
  // is a directory, we recursively call this function and append the results
  // into the array. If the path is a file, we'll simply append the path.
  return paths.reduce((previous: string[], current: string): string[] => {
    return lstatSync(current).isDirectory() ? [...previous, ...readdir(current)] : [...previous, current];
  }, []);
}
