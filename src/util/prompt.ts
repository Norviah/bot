import { Collection, Message, MessageReaction, User } from 'discord.js';

import { emotes } from './emotes';
import { embed } from './embed';

/**
 * Represents the two valid emotes to watch for.
 */
const reactions: string[] = [emotes.thumbsUp, emotes.thumbsDown];

/**
 * Determines if the given reaction is valid.
 * @param  reaction The reaction to check.
 * @return          Represents if the reaction is valid.
 */
function valid(reaction: MessageReaction): boolean {
  return reactions.includes(reaction.emoji.name);
}

/**
 * Prompts the message's author with a question and waits for the author to
 * react with an emote to determine their response.
 * @param  message  The message object.
 * @param  question The question to ask the author.
 * @param  limit    Determines how long we should wait for a response.
 * @return          The author's response.
 */
export async function prompt(message: Message, question: string, limit: number = 30000): Promise<boolean> {
  // This function determines if the given reaction is valid and is from the
  // original author, we must declare this filter within this function as it
  // depends on the message author's ID and the user's ID, which are both
  // dynamic and has to be easily changed when wanted.
  const filter = (reaction: MessageReaction, user: User): boolean => {
    return valid(reaction) && message.author.id === user.id;
  };

  const prompt: Message = await message.channel.send(embed({ description: question, color: 'blue', entity: message.author }));

  // Once the question is sent, we'll react with both of the emotes to make it
  // easier for the author to react with their response.
  for (const reaction of reactions) {
    await prompt.react(reaction);
  }

  let response: boolean;

  try {
    // Once the question is sent, we'll wait for the author to react with a
    // valid emote to determine their response.
    const collection: Collection<string, MessageReaction> = await prompt.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] });

    // If the author did respond, we'll simply determine if they reacted with
    // the thumbs up emote as this represents true.
    response = collection.first()?.emoji.name === emotes.thumbsUp;
  } catch {
    // If an error occurred, it's most likely due to the author taking too long
    // to respond, so we'll return with false.
    response = false;
  }

  // After we have a response, we'll delete the prompt to clean up the channel.
  prompt.delete();

  return response;
}
