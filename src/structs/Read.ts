import { ClientError, ErrorCodes } from '@/structs/ClientError';

import { existsSync, readFileSync, statSync } from 'fs';
import { extname } from 'path';

import type { JsonObject } from 'type-fest';

/**
 * A utility class for reading files.
 *
 * This class provides helper methods for reading various file types from the
 * file system, additionally implementing error handling and validation.
 */
export abstract class Read {
  /**
   * Imports the contents of the specified JSON file.
   *
   * @param path The path to the JSON file.
   * @returns The contents of the JSON file.
   */
  public static JSON(path: string): JsonObject | never {
    if (!existsSync(path)) {
      throw new ClientError(ErrorCodes.MISSING_JSON_FILE, path);
    } else if (statSync(path).isDirectory() || extname(path) !== '.json') {
      throw new ClientError(ErrorCodes.NON_JSON_FILE, path);
    }

    try {
      return JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      throw new ClientError(ErrorCodes.INVALID_JSON, path);
    }
  }
}
