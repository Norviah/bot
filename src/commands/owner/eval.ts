import { Message, MessageEmbed } from 'discord.js';
import { inspect } from 'util';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Executes given arguments as code.',

  /**
   * Determines if this command can only be executed by the client owners.
   */
  ownerOnly: true,

  /**
   * Arguments for this command.
   */
  args: [{ id: 'code', match: 'content', prompt: { start: 'what do you want to execute as code?' } }],
};

// Executes given arguments as JavaScript code, this command is rather useful as
// it allows you to debug at runtime, allowing you to see live values, it's also
// useful as you can change values live if you don't have access to your
// computer.
export default class extends Command {
  /**
   * This command is expected to be used with code blocks, for example:
   *
   *  !eval ```
   *    // code;
   *  ```
   *
   * This regular expression matches if arguments are given in this format, in
   * addition to the language if one is given, and allows us to remove those
   * values to only have the code left.
   */
  public block: RegExp = /^\`\`\`(\w+)?|\`\`\`$/g;

  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('eval', options);
  }

  /**
   * Removes any unwanted values from the given text.
   * @param  text The text to sanitize.
   * @return      The text sanitized.
   */
  public async sanitize(text: any): Promise<string> {
    // If the text is a promise, we'll wait for it to resolve.
    if (text && text.constructor.name === 'Promise') {
      text = await text;
    }

    // If the text is an object, we'll convert it into a string.
    if (typeof text !== 'string') {
      text = inspect(text, { depth: 1 });
    }

    // Remove all instances of the client's token, just in case.
    text = text.replace(new RegExp(this.client.config.token, 'g'), '[token]');

    return text;
  }

  /**
   * Executes the command.
   * @param  message   The message that called this command.
   * @param  args      Given arguments.
   * @param  args.code The given string to execute as code.
   */
  public async exec(message: Message, args: { code: string }): Promise<void> {
    // As it's expected that inputs are given in a code block, we'll remove it
    // from the input if the user did provide them.
    const input: string = args.code.replace(this.block, '');

    // Evaluate the given string as JavaScript and store the result.
    const result: string = await this.sanitize(eval(input));

    let response: MessageEmbed | string;

    // If the result is greater than 2000 characters, we can't send it in a
    // message, so we'll simply inform the author.
    if (result.length >= 2000) {
      response = this.client.embed({ entity: message.author, description: "The result can't be sent, as it's more than 2000 characters." });
    }

    // We know that the result is less than 2000 characters, but we also have to
    // check if it's greater than 1994 characters, as the backticks needed to
    // send the message count, so we have to take that into account.
    else response = result.length >= 1995 ? result : `\`\`\`${result}\`\`\``;

    await message.util!.send(response, { disableMentions: 'all' });
  }
}
