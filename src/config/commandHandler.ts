import { Message } from 'discord.js';
import { ArgumentPromptData, CommandHandlerOptions } from 'discord-akairo';

import * as paths from '../util/paths';
import { punctuate } from '../util/punctuate';

/**
 * The custom message for an infinite prompt.
 */
const infinitePrompt: string = 'Enter each argument as a new message, when done, enter `done`. ';

export const commandHandlerOptions: CommandHandlerOptions = {
  /**
   * Represents the directory that commands will be loaded from.
   */
  directory: paths.commands,

  /**
   * Determines if Akairo will handle edited messages as commands.
   */
  handleEdits: true,

  /**
   * Assigns message.util, which provides useful functions, and this value is
   * also needed for Akairo to handle edited messages.
   */
  commandUtil: true,

  /**
   * Determines if members should be fetched on every message received from a
   * guild.
   */
  fetchMembers: true,

  /**
   * Default options to use for prompts of commands that use arguments.
   */
  argumentDefaults: {
    prompt: {
      /**
       * Modifies the prompt that asks a user to provide a certain argument.
       * @param message The message that called the command.
       * @param text    The original start prompt for the command.
       * @param data    Information about the input from the message's author.
       */
      modifyStart: (message: Message, text: string, data: ArgumentPromptData): string => {
        return `${message.author}, ${punctuate(text)} ${data.infinite ? infinitePrompt : ''}To cancel, enter \`cancel\`.`;
      },

      /**
       * Modifies the retry prompt, which is called when a user doesn't provide
       * a valid argument for the command and can retry.
       * @param message The message that called the command.
       * @param text    The original retry prompt for the command.
       * @param data    Information about the input from the message's author.
       */
      modifyRetry: (message: Message, text: string, data: ArgumentPromptData): string => {
        return `${message.author}, **${data.phrase}** isn't a valid argument, ${punctuate(text)} ${data.infinite ? infinitePrompt : ''}To cancel, enter \`cancel\`.`;
      },

      /**
       * This will be sent to the author if they took too long to provide an
       * argument.
       * @param message The message that called the command.
       */
      timeout: (message: Message): string => `${message.author}, time ran out, command has been cancelled.`,

      /**
       * This function will be called if the author took too many tries.
       * @param message The message that called the command.
       */
      ended: (message: Message): string => `${message.author}, too many retries, command has been cancelled.`,

      /**
       * This function will be called if the author cancelled the prompt.
       * @param message The message that called the command.
       */
      cancel: (message: Message): string => `${message.author}, command has been cancelled.`,

      /**
       * Determines how many times a user can retry to provide valid arguments
       * for a command if they have failed the first time.
       */
      retries: 3,

      /**
       * Represents how long we should wait for a user to provide arguments.
       */
      time: 30000,

      /**
       * When the user is giving input for an array of arguments, this word
       * represents the phrase to stop Akairo from taking inputs.
       */
      stopWord: 'done',
    },
  },
};
