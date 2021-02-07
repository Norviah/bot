import { GuildMember } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * GuildMemberRemove: Emitted when a member leaves a guild, either voluntarily
 * or if they were kicked.
 */
export default class extends Listener {
  /**
   * Initializes  anew listener instance for the guildmemberRemove event.
   */
  public constructor() {
    super({ event: 'guildMemberRemove', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  member The member that left.
   */
  public async exec(member: GuildMember): Promise<void> {
    // As a member has just left the guild, we'll have the footer of the embed
    // message represent the current amount of members within the guild.
    const note: string = `Members: ${member.guild.members.cache.size}`;

    await this.client.log(member.guild, { description: `${member} has left the server.`, event: 'guildMemberRemove', color: 'red', entity: member.user, note });
  }
}
