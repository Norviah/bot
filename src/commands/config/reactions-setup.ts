import { GuildEmoji, MessageEmbed, Message, TextChannel } from 'discord.js';
import { basename } from 'path';

import { GuildConfig } from '../../types/guildConfig';
import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

import * as regex from '../../util/regex';

const options: CommandOptions = {
  /**
   * Represents the command's category, which will be pulled from the
   * subdirectory that the command is in.
   */
  category: basename(__dirname),

  /**
   * Provides a description of this command.
   */
  description:
    "This command acts as an easy way to set up a message for reacting, if a reaction channel is set, I will create a message containing every emoji along with the roles they represent in addition to reacting with\
    said emojis to make reacting simple for users.\n\nIf this command has been used previously, pass the message's ID as an argument and I'll instead update that message with a new list.",

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
      id: 'message',
      type: 'guildMessage',
      prompt: { retry: 'please provide a valid message ID', optional: true },
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
    super('reactions-setup', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message, args: { message: Message | null }): Promise<any> {
    // In order to know what emotes the guild has set to what roles, we'll need
    // to get their entry within the database.
    const config: GuildConfig = this.client.database.guild(message.guild!);

    const { reactionChannel } = config.settings;

    // Represents the guild's reaction channel.
    const channel: TextChannel | undefined = reactionChannel ? (message.guild!.channels.cache.get(reactionChannel) as TextChannel) : undefined;

    // We'll make sure that the guild has atleast one emoji set up.
    if (!Object.keys(config.reactions)) {
      return await this.client.error(message, "This server doesn't have any emojis set to a role.");
    }

    // Next, we'll make sure that the guild has set a reaction channel.
    else if (!channel) {
      return await this.client.error(message, 'You need to have a reaction channel set to use this command, please use the `settings set reactionchannel` command.');
    }

    // Finally, if the guild has a reaction channel set and a message ID is
    // given, we'll ensure that: the message was sent in the reaction channel
    // and that the client is the owner of the message.
    else if (args.message && (args.message.channel.id !== channel.id || args.message.author.id !== this.client.user?.id)) {
      return await this.client.error(message, "Invalid message ID given, either that message isn't sent in the reaction channel or I'm not the author of that message.");
    }

    // Instead of using an object, we'll create a string to reference the list
    // of emojis and the role they represent. If the guild hasn't set any emojis
    // to a role yet, we'll set a message.
    const list: string[] = [];

    for (const emojiID in config.reactions) {
      list.push(`${message.guild!.emojis.cache.get(emojiID)?.toString() ?? emojiID}: ${message.guild!.roles.cache.get(config.reactions[emojiID]) ?? '[role not found]'}`);
    }

    const description: string = "Here's a list of emojis along with the roles they represent, please react to the role you'd like.";

    // Here we create an embed message containing the list.
    const embed: MessageEmbed = this.client.embed({ description: `${description}\n\n${list.join('\n')}`, title: 'Reaction List' });

    // If a message ID is given, we'll check to see if that message has an embed
    // attached and the description consists of the description above.
    if (args.message && args.message.embeds.length > 0 && !args.message.embeds.find((embed) => embed)?.description?.includes(description)) {
      return await this.client.error(message, "Invalid message ID given, it seems like that message doesn't consist of a list of emojis.");
    }

    let information: Message | undefined = args.message ? args.message : undefined;

    // If a message ID is given, we'll edit the message to contain the newly
    // generated list of emojis.
    if (args.message) {
      await args.message.edit(undefined, embed);
    }

    // Otherwise, we'll send a new message.
    else information = await channel.send(embed);

    // Now that a message has been sent, we'll react with every emoji to make it
    // simple for users to add their reaction.
    for (const [emojiID, roleID] of Object.entries(config.reactions)) {
      // As default emojis can be used, we'll determine if the emoji ID is an
      // itself, as if it is, that represents that the emoji is a default emoji
      // which can be directly used as a reaction. If not, we'll try to find the
      // emoji via the guild's emoji cache.
      const emoji: GuildEmoji | string | undefined = regex.emoji.test(emojiID) ? emojiID : message.guild!.emojis.cache.get(emojiID);

      if (emoji) {
        await information?.react(emoji);
      }
    }
  }
}
