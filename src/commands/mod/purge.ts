import { Collection, GuildMember, Message, TextChannel } from 'discord.js';
import { Argument } from 'discord-akairo';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

import * as regex from '../../util/regex';

const filters = {
  /**
   * Determines if the given message was sent from a bot.
   * @param  message The message to check.
   * @return         Represents if the message's author is a bot.
   */
  bots: (message: Message): boolean => message.author.bot,

  /**
   * Determines if the given message has any attachments.
   * @param  message The message to check.
   * @return         Represents if the message has attachments.
   */
  attachments: (message: Message): boolean => message.attachments.size > 0,

  /**
   * Determines if the given message has any links.
   * @param  message The message to check.
   * @return         Represents if the message has links.
   */
  links: (message: Message): boolean => regex.link.test(message.content),

  /**
   * Determines if the given message has any Discord invites.
   * @param  message The message to check.
   * @return         Represents if the message has Discord invites.
   */
  invites: (message: Message): boolean => regex.invite.test(message.content),

  /**
   * Determines if the message contains the given phrase.
   * @param  message The message to check.
   * @param  phrase  The phrase to base off of.
   * @return         Represents if the message has the given phrase.
   */
  phrase: (message: Message, member: GuildMember | null, phrase: string | null): boolean => (phrase ? message.content.toLowerCase().includes(phrase.toLowerCase()) : false),

  /**
   * Determines if the message was sent by the given user.
   * @param  message The message to check.
   * @param  user    The user to base off of.
   * @return         Represents if the message has been sent by the given user.
   */
  user: (message: Message, member: GuildMember | null): boolean => (member ? message.author.id === member.id : false),

  /**
   * Determines if the message has any embeds.
   * @param  message The message to check.
   * @return         Represents if the message has embeds.
   */
  embeds: (message: Message): boolean => message.embeds.length > 0,

  /**
   * Determines if the message has any reactions.
   * @param  message The message to check.
   * @return         Represents if the message has reactions.
   */
  reactions: (message: Message): boolean => message.reactions.cache.size > 0,

  /**
   * Determines if the message's author has mentioned any user.
   * @param  message The message to check.
   * @return         Represents if the message has mentioned atleast one user.
   */
  mentions: (message: Message): boolean => message.mentions.users.size > 0,
};

/**
 * Represents a list of filters that are flags and don't require parameters.
 */
const flags = Object.keys(filters).filter((key) => !['user', 'phrase'].includes(key)) as (keyof Omit<typeof filters, 'user' | 'phrase'>)[];

/**
 * Based off of the filters that are flags, we'll create an object for each flag
 * to use as a flag argument for the command.
 */
const args: CommandOptions['args'] = flags.map((flag: string) => ({ id: flag, match: 'flag', flag: `--${flag}` }));

/**
 * Provides information about this command.
 */
const options: CommandOptions = {
  /**
   * The command's category.
   */
  category: basename(__dirname),

  /**
   * Represents useful information for this command.
   */
  description:
    "Purges the given amount of messages from a channel, if wanted, you can provide flags to remove specific messages.\n\n \
    By default, if multiple flags are provided, messages that pass **every** flag will be deleted, for example, `purge 100 --bots --links` \
    will delete messages that contains links **and** are from bots. If you want the check to be either or, provide the\n`--exclusive` flag, \
    continuing off of the example, `purge 100 --bots --links --exclusive` will delete messages that are from bots **or** messages that contains a link\n\n \
    If wanted, you can provide the flag `--opposite` to delete every message that doesn't pass every flag, for example, `purge 100 --bots --phrase \"example\"`\n \
    will delete every message that isn't from a bot or that doesn't have `example` in it's content.",

  /**
   * Consists of examples for this command.
   */
  examples: ['purge 100', 'purge 100 --bots --invites', 'purge 100 --attachments', 'purge 100 --user @user --phrase "bad words"'],

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_MESSAGES'],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',

  /**
   * Arguments for this command.
   */
  args: [
    {
      id: 'amount',
      type: Argument.range('number', 1, 100, true),
      prompt: { start: 'please provide a number from 1 through 100.', retry: 'please provide a number from 1 through 100' },
    },

    {
      id: 'exclusive',
      match: 'flag',
      flag: '--exclusive',
    },

    {
      id: 'user',
      type: 'member',
      match: 'option',
      flag: '--user',
    },

    {
      id: 'phrase',
      type: 'string',
      match: 'option',
      flag: '--phrase',
    },

    {
      id: 'opposite',
      type: 'flag',
      match: 'flag',
      flag: '--opposite',
    },

    ...args,
  ],
};

/**
 * Purge: Deletes a given amount of messages from a channel.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the Purge command.
   */
  public constructor() {
    super('purge', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called the command.
   * @param  args    Given arguments.
   */
  public async exec(
    message: Message,
    args: { [key in keyof Omit<typeof filters, 'user' | 'phrase'>]: boolean } & {
      amount: number;
      exclusive: boolean;
      user: GuildMember | null;
      phrase: string | null;
      opposite: boolean;
    }
  ): Promise<any> {
    // Delete the original message before continuing to prevent it from being
    // accounted for when deleting messages.
    await message.delete();

    // Get a collection of the given amount of messages, the amount must be
    // equal or less than 100 because that's how much is allowed from the API.
    let messages: Collection<string, Message> = await message.channel.messages.fetch({ limit: args.amount });

    // As the 'args' object represents given arguments, it represents filters to
    // use when deleting messages in addition to other unrelated flags. We'll
    // initialize an array containing the filters and remove the filters that
    // weren't given by the message's author.
    const options = Object.keys(filters).filter((filter) => args[filter as keyof typeof filters]) as (keyof typeof filters)[];

    // Once we have the filters that were given, we'll initialize an array
    // containing the method for each filter.
    const checks = options.map((filter) => filters[filter]);

    // Determine which method the user wants to use when deleting messages, if
    // they pass the 'exclusive' flag, we'll delete messages that passes any
    // given filter, otherwise, we'll delete messages that passes every filter.
    const method: 'every' | 'some' = args.exclusive ? 'some' : 'every';

    // Check to see if any filter was given, if so, filter out the messages
    // based off of the wanted method.
    messages = checks.length ? messages.filter((message) => checks[method]((check) => (!args.opposite ? check(message, args.user, args.phrase) : !check(message, args.user, args.phrase)))) : messages;

    if (messages.size === 0) {
      return this.client.inform(message, "There aren't any messages that satisfies the given constraints.");
    }

    await (message.channel as TextChannel).bulkDelete(messages);

    // Confirm with the author and present the amount of deleted messages.
    const confirm: Message = await this.client.confirm(message, `Deleted \`${messages.size}\` message(s).`);

    // Wait for 3 seconds after we send the confirmation, and then delete it.
    await this.client.wait(3000);

    // If, for whatever reason, the delete method fails, it represents that the
    // confirmation message couldn't be found, so we'll just ignore it.
    await confirm.delete().catch(() => null);
  }
}
