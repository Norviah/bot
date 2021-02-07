import { Guild } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * GuildDelete: Emitted when the client is kicked from a guild.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the guildDelete event.
   */
  public constructor() {
    super({ event: 'guildDelete', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  guild The guild that the client was removed from.
   */
  public async exec(guild: Guild): Promise<void> {
    this.logger.log(`${guild.name} [${guild.id}]`, { title: 'GUILD DELETE', subDir: 'guild/delete' });
  }
}
