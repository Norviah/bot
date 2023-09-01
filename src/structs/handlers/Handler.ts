import { ClientError, ErrorCodes } from '../ClientError';

import { logger } from '@/util/logger';
import { readdir } from '@/util/readdir';
import { existsSync, statSync } from 'fs';

import type { Client } from '@/structs/Client';
import type { Module } from '@/structs/Module';
import type { AbstractClass } from 'type-fest';

/**
 * The base structure for handlers.
 *
 * Handlers are used to manage modules, which are abstract classes that must be
 * extended to define a certain functionality. Handlers are responsible for
 * importing modules from files and storing them within a collection for future
 * reference.
 *
 * @template T The type of module that the handler manages.
 */
export abstract class Handler<T extends Module> {
  /**
   * A reference to the abstract class that the handler manages.
   *
   * This property references the abstract class for the desired module,
   * allowing the handler to determine whether if a file correctly exports an
   * instance of the expected class.
   */
  public abstract readonly reference: AbstractClass<T>;

  /**
   * The root directory to look for modules in.
   *
   * When importing modules, the handler will use the specified directory to
   * look in, importing all scripts within this directory and all
   * subdirectories.
   */
  public abstract readonly directory: string;

  /**
   * The Discord client.
   *
   * A reference to the instantiated Discord client.
   */
  public readonly client: Client;

  /**
   * The collection of modules that the handler manages.
   *
   * References all modules that have been initialized by the handler, stored
   * within a collection for future reference.
   */
  public readonly modules: Map<string, T> = new Map();

  /**
   * Initializes a new `Handler` instance.
   *
   * @param client The instantiated Discord client.
   */
  public constructor(client: Client) {
    this.client = client;
  }

  /**
   * Imports and initializes a module from a file.
   *
   * This method implements the logic used for initializing a module from a
   * file, given a path, the method attempts to import and initialize a module
   * from the file.
   *
   * Note that when importing a module, this method only looks at the script's
   * default export.
   *
   * @param path The path to import the module from.
   * @returns The initialized module.
   */
  public import(path: string): T | never {
    // References the default export from the specified script, which will be
    // the module that we wish to import.
    const data: unknown = require(path)?.default;

    // Once we've imported the data form the file, we'll need ensure that the
    // default export is an instantiable class that extends the specified
    // module that the handler manages.
    if (!this.inherits(data)) {
      throw new ClientError(ErrorCodes.INVALID_MODULE, { path, module: this.reference.name });
    }

    return new data(this);
  }

  /**
   * Registers all modules from the provided directory.
   *
   * This method will recursively import all modules from the specified
   * directory, initializing them and storing them within the handler's
   * collection of modules.
   *
   * @param directory The directory to register modules from.
   */
  public registerAll(directory: string = this.directory): void {
    if (!existsSync(directory) || !statSync(directory).isDirectory()) {
      throw new ClientError(ErrorCodes.INVALID_DIRECTORY, { path: directory });
    }

    // Once we've ensured that the path exists and is a directory, we can
    // recursively read all files from the specified directory.
    const paths: string[] = readdir(directory);

    for (const path of paths) {
      this.register(path);
    }

    // After all modules have been registered and initialized, we'll then want
    // to iterate through each module and invoke the `initialize` method, as a
    // module may wish to perform additional initialization.
    for (const module of this.modules.values()) {
      module.initialize?.();
    }
  }

  /**
   * Registers a module within the handler.
   *
   * This method will register a module from the specified path, initializing it
   * and storing it within the handler's collection of modules.
   *
   * @param path The path to register the module at.
   * @returns The registered module.
   */
  public register(path: string): T {
    const module: T = this.import(path);

    // Once the module has been initialzied, we'll want to store it within the
    // handler's collection, however, we'll first need to ensure that the module
    // consists of a unique name.
    if (this.modules.has(module.name)) {
      throw new ClientError(ErrorCodes.DUPLICATE_MODULE, { module: module.name, handler: this.constructor.name });
    }

    // As we've ensured that the module consists of a unique name, we can store
    // it within the handler's collection.
    this.modules.set(module.name, module);

    logger.debug(`registered module: ${module.name}`, { title: this.constructor.name });

    return module;
  }

  /**
   * Determines whether if the provided object is a valid module.
   *
   * A helper method that determines whether if the provided object is an
   * instantiable class that extends the abstract class that the handler
   * manages.
   *
   * This method is used to determine whether if a file correctly exports an
   * instance of the expected class.
   *
   * @param object The object to check.
   * @returns Whether if the object is a valid module.
   */
  public inherits(object: unknown): object is new (...args: ConstructorParameters<typeof Module>) => T {
    return typeof object === 'function' && object.prototype instanceof this.reference;
  }
}
