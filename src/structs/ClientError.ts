export enum ErrorCodes {}

export const MessageGenerator = {};

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
