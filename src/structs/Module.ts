import { ClientError, ErrorCodes } from './ClientError';

import { logger } from '@/util/logger';
import { prisma } from '@/util/prisma';

import type { Handler } from '@/structs/handlers/Handler';
import type { Logger } from '@norviah/logger';
import type { PrismaClient } from '@prisma/client';

/**
 * The base structure for modules.
 *
 * Modules are used to group pieces of functionality for any purpose you wish.
 * All types of modules must have their own, and unique, handler which is
 * responsible for importing and initializing modules from files.
 */
export abstract class Module {
  /**
   * The module's name.
   *
   * This will represent how the module is referenced within the handler and
   * possible error messages.
   */
  public abstract readonly name: string;

  /**
   * The category that the module belongs to.
   *
   * Modules are pieces of functionality that are grouped together, however,
   * modules can further be grouped together. This property can be used to
   * group modules together within the handler.
   *
   * For example, commands are pieces of modules that can be represented through
   * the `Module` class. In addition, modules can be grouped together by their
   * purpose, such as administration commands or music commands.
   */
  public readonly category: string = 'default';

  /**
   * The database client.
   *
   * @see https://www.prisma.io/docs
   */
  public readonly prisma: PrismaClient = prisma;

  /**
   * The logging system.
   *
   * A useful logging system that prints messages in a structured format, all
   * logs are additionally stored in a file for future reference.
   *
   * @see https://github.com/norviah/logger
   */
  public readonly logger: Logger = logger;

  /**
   * A reference to the handler that manages this module.
   *
   * This property references the handler that manages the module, allowing the
   * module to access the Discord client and other modules within the handler.
   */
  public readonly handler: Handler<typeof this>;

  /**
   * Initializes a new `Module` instance.
   *
   * @param handler The handler that manages the module.
   */
  public constructor(handler: Handler<Module>) {
    if (!(this.constructor.prototype instanceof handler.reference)) {
      throw new ClientError(ErrorCodes.INVALID_HANDLER, { module: this.constructor.name, handler: handler.constructor.name });
    }

    this.handler = handler as Handler<typeof this>;
  }

  /**
   * Further initialization logic for the module after it has been imported by
   * the handler.
   *
   * Once the handler has imported and initialized all modules, this method is
   * called on each module. If desired, this method can be implemented to
   * further initialize the module once imported.
   */
  public initialize?(): void;
}
