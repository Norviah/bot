import { Guild, User } from 'discord.js';
import { Listener } from '../../structs/listener';

import { punctuate } from '../../util/punctuate';

/**
 * GuildBanAdd: Emitted whenever a user is banned from a guild.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the guildBanAdd event.
   */
  public constructor() {
    super({ event: 'guildBanAdd', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  guild The guild that the user was banned form.
   * @param  user  The user that was banned.
   */
  public async exec(guild: Guild, user: User): Promise<void> {
    // First, we'll get an object representing the information regarding the ban
    // for the given user.
    const info: { user: User; reason?: string } = await guild.fetchBan(user);

    // As when someone is banned, a reason can be provided for the ban. We'll
    // determine if the user who was banned was banned using the client's ban
    // command by checking the reason of why the user was banned.
    const command: RegExpExecArray | null = info.reason ? /^banned by (?<mod>.*#\d{4}) \[\d+\] for the reason: (?<reason>.*[.?! ])$/i.exec(info.reason) : null;

    // Here, we'll determine the reason for the user's ban by checking if the
    // ban was used by a command then by defaulting to the reason from Discord.
    const reason: string = punctuate(command?.groups?.reason ?? info.reason ?? 'not set');

    const description = `**${user.tag}** has been banned${command?.groups ? ` by **${command.groups.mod}**` : ''} for the reason: ${reason}`;

    await this.client.log(guild, { color: 'red', event: 'guildBanAdd', entity: user, description });
  }
}
