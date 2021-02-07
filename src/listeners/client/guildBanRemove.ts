import { Guild, User } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * GuildBanRemove: Emitted whenever a user is un-banned from a guild.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the guildBanAdd event.
   */
  public constructor() {
    super({ event: 'guildBanRemove', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  guild The guild that the user was banned form.
   * @param  user  The user that was banned.
   */
  public async exec(guild: Guild, user: User): Promise<void> {
    await this.client.log(guild, { event: 'guildBanRemove', entity: user, description: `**${user.tag}** has been unbanned.` });
  }
}
