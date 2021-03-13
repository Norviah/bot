import { GuildEmoji, Message, Role } from 'discord.js';
import { Argument } from 'discord-akairo';
import { basename } from 'path';

import { GuildConfig } from '../../types/guildConfig';
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
  description: 'Allows users to remove an emoji from reactions to no longer allow users to get a certain role when reacting with this specific emoji.',

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
      id: 'emoji',
      type: Argument.union('emoji', 'defaultEmoji'),
      prompt: { start: 'please provide an emoji to use', retry: 'please provide a valid emoji' },
    },
  ],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('reactions-remove', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message, args: { emoji: string | GuildEmoji; role: Role }): Promise<any> {
    // As we'll be presenting the custom config values the guild has set within
    // the database, we'll need to have a reference to the guild's settings.
    const config: GuildConfig = this.client.database.guild(message.guild!);

    const entry: string | undefined = config.reactions[typeof args.emoji === 'string' ? args.emoji : args.emoji.id];

    // First, we'll check if the guild has set this emoji to a certain role.
    if (!entry) {
      return await this.client.error(message, `The emoji ${args.emoji?.toString() ?? args.emoji} isn't associated with a role, use the \`reactions\` command to see a list of emojis.`);
    }

    // Next, if an  is found, we'll try to find the role it's set to.
    // If the given emoji is valid, we'll try to find the role that the emoji is
    // associated with.
    const role: Role | string = message.guild!.roles.cache.get(entry) ?? '**[role not found]**';

    const response: boolean = await this.client.prompt(message, `Are you sure you want to remove the emoji ${args.emoji}? It's set to the role ${role}.`);

    if (!response) {
      return await message.reply('command cancelled.');
    }

    // If the author confirms, we'll delete the emoji from the database.
    this.client.database.deleteKey(message.guild!, 'reactions', typeof args.emoji === 'string' ? args.emoji : args.emoji.id);

    const description: string = `Successfully removed the emoji ${args.emoji}, users will no longer be assigned to the role ${args.role} when reacting with this emoji.`;

    await this.client.confirm(message, description);
  }
}
