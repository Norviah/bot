import { GuildEmoji, Message, Role } from 'discord.js';
import { Argument } from 'discord-akairo';
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
  description: 'Set an emoji to represent a specific role, to allow users to get said role when reacting with the given emoji.',

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
    {
      id: 'role',
      type: 'role',
      prompt: { start: 'please provide a role to use', retry: 'please provide a valid role' },
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
    super('reactions-set', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message, args: { emoji: string | GuildEmoji; role: Role }): Promise<any> {
    // Represents the name of the emoji, we check to see if the emoji is a
    // string as if it is, it's a default emoji and in Discord's API, default
    // emoji have their names as the emoji itself.
    const name: string = typeof args.emoji === 'string' ? args.emoji : args.emoji.id;

    // I'm not sure if it's possible, but we'll constrict the given emoji to an
    // emoji that exists within the guild, just in case.
    if (args.emoji instanceof GuildEmoji && args.emoji.guild.id !== message.guild!.id) {
      return await this.client.error(message, 'The given emoji must be from this server, not another server.');
    }

    // We'll also check if the given emoji is already set to an emoji.
    else if (this.client.database.hasKey(message.guild!, 'reactions', name)) {
      // Before continuing, we'll confirm with the author.
      const response: boolean = await this.client.prompt(message, `The emoji ${args.emoji} is already set to a role, would you like to overwrite it?`);

      if (!response) {
        return await message.reply('command cancelled.');
      }
    }

    // We'll make sure that the role isn't a role that is managed from an
    // external service, which essentially mean bot roles.
    if (args.role.managed || args.role.comparePositionTo(message.guild!.me!.roles.highest) > 1) {
      return await this.client.error(message, "I can't add members to that role, please choose a different role or increase my role's position.");
    }

    // Now we simply assign the emoji to the role within the database.
    this.client.database.put(message.guild!, 'reactions', name, args.role.id);

    const description: string = `Successfully set the emote ${args.emoji} to the role ${args.role}. If a reaction channel is set, users can react with this emoji to be assigned to the given role.`;

    await this.client.confirm(message, description);
  }
}
