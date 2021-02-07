import { ArgumentOptions as Base, ArgumentPromptOptions } from 'discord-akairo';

/**
 * Options for arguments, the reason why we create a custom type is to either
 * ensure properties will be given or to ensure a type of a certain property.
 */
export interface ArgumentOptions extends Base {
  /**
   * The ID of the argument, this property represents the name of this argument
   * and how an argument can be accessed via the args object during execution.
   */
  id: string;

  /**
   * Represents what prompt to run if a user did not give valid arguments.
   */
  prompt?: ArgumentPromptOptions;
}
