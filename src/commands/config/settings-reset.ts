import { Message } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';
import { GuildSettings } from '../../types/guildSettings';

import { defaultGuildSettings } from '../../config/guild';

import { join } from '../../util/join';

/**
 * Represents the valid keys that can be reset in a guild's entry within the
 * database.
 */
const keys: (keyof GuildSettings)[] = Object.keys(defaultGuildSettings) as (keyof GuildSettings)[];

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description: 'Sets the logging channel, this is where certain events will be logged to.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Represents arguments for this command.
   */
  args: [
    {
      id: 'keys',
      type: keys,
      match: 'separate',
      prompt: { start: 'which key(s) would you like to reset?', retry: `please provide a valid key, one of \`${join(keys, 'or')}\`` },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators to reset a specific key from their custom settings within
 * the database.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('settings-reset', options);
  }

  /**
   * Executes the command.
   * @param  message     The message that called this command.
   * @param  args        Given arguments.
   * @param  args.phrase The new phrase to set for the guild's custom greeting.
   */
  public async exec(message: Message, args: { keys: (keyof GuildSettings)[] }): Promise<any> {
    // As multiple keys can be reset at a time, we'll initialize an array
    // representing the given keys and their default value.
    const defaults: string[] = args.keys.map((key: keyof GuildSettings) => `**${key}** to \`${defaultGuildSettings[key] ?? 'nothing'}\``);

    const description: string = `Are you sure you want to reset the given key(s) to their default value? The default value(s) being: \n\n${defaults.join('\n')}`;

    // Before continuing, we'll confirm this action with the author.
    const response: boolean = await this.client.prompt(message, description);

    if (!response) {
      return await message.util!.reply('command cancelled.');
    }

    // If the author confirmed, we'll iterate through each key, and reset it
    // within the database.
    for (const key of args.keys) {
      this.client.database.settings(message.guild!, key, defaultGuildSettings[key]);
    }

    await this.client.confirm(message, `Successfully reset the given key(s) to their default values.`);
  }
}
