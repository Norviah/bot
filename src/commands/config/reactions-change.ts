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
  description: 'Allows the possibility to change the emote a role is assigned to.',

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
      id: 'role',
      type: 'role',
      prompt: { start: 'please provide a role to use', retry: 'please provide a valid role' },
    },

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
    super('reactions-change', options);
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

    // As we'll be presenting the custom config values the guild has set within
    // the database, we'll need to have a reference to the guild's settings.
    const config: GuildConfig = this.client.database.guild(message.guild!);

    // We'll check to see if the guild assigned a role to the given emoji.
    let oldEmojiID: string | undefined;

    for (const [emojiID, roleID] of Object.entries(config.reactions)) {
      // Here we'll iterate through the guild's reaction databse to find the
      // entry for the given role, if one is found, we'll save the emoji's ID.
      if (roleID === args.role.id) {
        oldEmojiID = emojiID;
      }
    }

    // If an entry isn't found, we'll inform the author.
    if (!oldEmojiID) {
      return await this.client.error(message, `It seems like the role ${args.role} doesn't have an emoji set to it.`);
    }

    // We'll check to see if the given emoji is the same emoji.
    else if (name === oldEmojiID) {
      return await this.client.error(message, `The role ${args.role} is already associated with the emoji ${args.emoji}.`);
    }

    // Now that we have the old emoji, we can remove it from the database,
    this.client.database.deleteKey(message.guild!, 'reactions', oldEmojiID);

    // And we'll set the given emoji to the role.
    this.client.database.put(message.guild!, 'reactions', name, args.role.id);

    await this.client.confirm(message, `Successfully changed the emoji associated with ${args.role} to ${args.emoji}.`);
  }
}
