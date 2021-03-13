import { GuildMember, MessageReaction, ReactionEmoji, Role, User } from 'discord.js';

import { Listener } from '../../structs/listener';
import { GuildConfig } from '../../types/guildConfig';

import * as regex from '../../util/regex';

/**
 * MessagReactionAdd: Emitted when a member reacts to a message.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the messageUpdate event.
   */
  public constructor() {
    super({ event: 'messageReactionAdd', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  reaction The reaction object.
   * @param  user     The user that applied the guild or reaction emoji.
   */
  public async exec(reaction: MessageReaction, user: User): Promise<void> {
    // If the client doesn't have permission to manage roles or if the user is a
    // bot, we'll stop here.
    if (!reaction.message.guild?.me?.hasPermission('MANAGE_ROLES') || user.bot) {
      return;
    }

    // As this client has a reaction/role system, where moderators within a
    // guild can set certain emotes to represent certain roles, and so when a
    // user reacts with an emote, the client will give them the role that that
    // emote represents.

    // First, we'll need to get the guild's config from the database.
    const config: GuildConfig = this.client.database.guild(reaction.message.guild);

    // Reactions must be sent from a guild, and so we'll check for that and
    // we'll also check that the reaction occurred within the specified channel.
    if (reaction.message.channel.id !== config.settings.reactionChannel) {
      return;
    }

    const { emoji } = reaction;
    const { guild } = reaction.message;

    // There are two classes for emojis: GuildEmoji and ReactionEmoji, it seems
    // like GuildEmoji represents custom emojis from a guild and ReactionEmoji
    // represents default emojis or emojis from another guild.

    // So if the given emoji is an instance of ReactionEmoji, we'll make sure
    // that the name is an emoji itself to determine if the emoji is a default
    // emoji, as if the emoji is a default emoji the name will be the emoji
    // itself. If it's an emoji from another guild, the name will represent the
    // actual name of the emoji.

    if (emoji instanceof ReactionEmoji && !regex.emoji.test(emoji.name)) {
      return;
    }

    // Next we'll try to find the emoji's entry within the guild's config in
    // order to determine the role the emoji represents.
    const roleID: string | undefined = config.reactions[emoji.id ?? emoji.name];

    if (!roleID) {
      return;
    }

    // Now that we know the emoji used is either a default emoji or a custom
    // from the guild, we'll try to find if the emoji is set to a role.
    const role: Role | undefined = guild.roles.cache.get(roleID);

    if (!role) {
      return await this.client.log(guild, {
        description: `The user ${user} has reacted with the emoji ${emoji}, but I can't find a role with the ID ${roleID}.`,
        event: null,
      });
    }

    // We know that the emoji is valid, as it's a custom or a default emoji, and
    // we know that the emoji represents a role, which we have, and so, we'll
    // assign that role to the user.

    // Before we do so, we'll need the user's member object.
    const member: GuildMember | undefined = guild.members.cache.get(user.id);

    if (member) {
      member.roles.add(role).catch((error: Error) => this.client.log(guild, { description: `I tried to assign the role ${role} to ${member}, but an error occurred: ${error.message}.`, event: null }));
    }
  }
}
