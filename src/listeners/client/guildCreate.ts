import { Guild } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * GuildCreate: Emitted when the client is invited into a new guild.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the guildCreate event.
   */
  public constructor() {
    super({ event: 'guildCreate', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  guild The guild that the client was invited to.
   */
  public async exec(guild: Guild): Promise<void> {
    this.logger.log(`${guild.name} [${guild.id}]`, { title: 'GUILD CREATE', subDir: 'guild/create' });
  }
}
