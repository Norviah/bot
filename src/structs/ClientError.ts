export enum ErrorCodes {
  /**
   * The event where a specified directory was not found.
   */
  INVALID_DIRECTORY = 'INVALID_DIRECTORY',

  /**
   * The event where a handler attempts to import a module from a script that
   * does not export a valid instance of the module.
   */
  INVALID_MODULE = 'INVALID_MODULE',

  /**
   * The event where a module is initialized with a handler that does not manage
   * the module's respective type.
   */
  INVALID_HANDLER = 'INVALID_HANDLER',

  /**
   * The event where a handler attempts to register a module with a name that
   * already exists within the handler's collection.
   */
  DUPLICATE_MODULE = 'DUPLICATE_MODULE',

  /**
   * The event where a handler is told to import a module from a non-typescript
   * file.
   */
  NON_TS_FILE = 'NON_TS_FILE',

  /**
   * The event where a listener references an emitter that wasn't provided when
   * initializing the listener handler.
   */
  UNKNOWN_EMITTER = 'UNKNOWN_EMITTER',
}

export const MessageGenerator = {
  /**
   * Generates the error message for the `INVALID_DIRECTORY` error code.
   *
   * @returns The constructed error message.
   */
  INVALID_DIRECTORY: (options: { path: string }): string => {
    return `invalid directory path, \`${options.path}\` does not exist or is not a directory`;
  },

  /**
   * Returns the error message for the `INVALID_MODULE` error code.
   *
   * @returns The constructed error message.
   */
  INVALID_MODULE: ({ path, module }: { path: string; module: string }): string => {
    return `invalid module, the path \`${path}\` does not export a valid instance of \`${module}\``;
  },

  /**
   * Returns the error message for the `INVALID_HANDLER` error code.
   *
   * @returns The constructed error message.
   */
  INVALID_HANDLER: ({ module, handler }: { module: string; handler: string }): string => {
    return `invalid handler, the module \`${module}\` is not compatible with the \`${handler}\` handler`;
  },

  /**
   * Returns the error message for the `DUPLICATE_MODULE` error code.
   *
   * @returns The constructed error message.
   */
  DUPLICATE_MODULE: ({ module, handler }: { module: string; handler: string }): string => {
    return `the module \`${module}\` already exists within the \`${handler}\` handler`;
  },

  /**
   * Generates the error message for the `NON_TS_FILE` error code.
   *
   * @returns The constructed error message.
   */
  NON_TS_FILE: ({ name, path }: { name: string; path: string }): string => {
    return `unable to import module \`${name}\` from \`${path}\`, as the file is not a typescript file`;
  },

  /**
   * Returns the error message for the `UNKNOWN_EMITTER` error code.
   *
   * @returns The constructed error message.
   */
  UNKNOWN_EMITTER: ({ emitter, listener }: { emitter: string; listener: string }): string => {
    return `the emitter \`${emitter}\` referenced by the listener \`${listener}\` wasn't provided`;
  },
};

export class ClientError<T extends keyof typeof ErrorCodes> extends Error {
  /**
   * The code representing the thrown error.
   *
   * This property will represent the string representation of the thrown error,
   * which can be used to handle the error in a specific error if desired.
   */
  public code: T;

  /**
   * Arguments that contain additional information about the error, if
   * applicable.
   *
   * `MessageGenerate` represents a list of functions used to construct a string
   * for a given error code. These functions may accept arguments which is used
   * within the constructed string, if specified, this property will reference
   * the arguments passed to the message generator.
   */
  public args: Parameters<(typeof MessageGenerator)[T]>;

  /**
   * Initializes a new `ClientError` instance.
   *
   * @param code The string representation of the error.
   * @param args Any arguments used to construct the error message, if
   * applicable.
   */
  public constructor(code: T, ...args: Parameters<(typeof MessageGenerator)[T]>) {
    const message: string = (MessageGenerator[code] as (...args: Parameters<(typeof MessageGenerator)[T]>) => string)(...args);

    super(message);

    this.code = code;
    this.args = args;
  }

  /**
   * Determines the specific type of error that occured.
   *
   * When catching an instance of `ClientError`, by default, the inferred type
   * of the error is unknown. This method implements a type guard to determine
   * the type of error that occured, which can be used to handle the error in a
   * specific way.
   *
   * @param code The code to check against.
   * @returns Whether if the `ClientError` is of the specified type.
   * @example
   * ```ts
   * try {
   *   // ...
   * } catch (error) {
   *   if (error instanceof ClientError) {
   *     // Uknown `ClientError` error
   *
   *     if (error.is(ErrorCodes.INVALID_DIRECTORY)) {
   *       // `INVALID_DIRECTORY` error
   *     }
   *   }
   *
   *   // Unknown error
   * }
   * ```
   */
  public is<T extends ErrorCodes>(code: T): this is ClientError<T> {
    return (this.code as keyof typeof ErrorCodes) === code;
  }
}
