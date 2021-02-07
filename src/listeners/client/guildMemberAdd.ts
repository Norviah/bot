import { GuildMember, Role, TextChannel } from 'discord.js';
import { Listener } from '../../structs/listener';

/**
 * GuildMemberAdd: Emitted when a new member has joined a guild that the client
 * is in.
 */
export default class extends Listener {
  /**
   * Initializes a new listener instance for the guildMemberAdd event.
   */
  public constructor() {
    super({ event: 'guildMemberAdd', emitter: 'client' });
  }

  /**
   * Executes the listener.
   * @param  member The member that has joined the guild.
   */
  public async exec(member: GuildMember): Promise<any> {
    // First, we'll get the guild's settings to determine what the guild has set
    // and what the guilds want the client to do.
    const { settings } = this.client.database.guild(member.guild);

    if (settings.channel && settings.greeting) {
      // Get the greeting the guild has set for new members, replacing special
      // key words with the variables that they represent.
      const greeting: string = settings.greeting.replace(/@user/g, member.toString()).replace(/@server/g, member.guild.name);

      // As channels are saved via IDs in the database, we'll try to resolve the
      // set ID into a channel object to determine where to send the greeting.
      const channel: TextChannel | null = member.guild.channels.resolve(settings.channel) as TextChannel;

      if (channel) {
        return await channel.send(greeting);
      }

      // If a channel isn't found, we'll log it into the guild.

      // We'll inform them that we have found a greeting, but, we couldn't
      // find a text channel with the saved ID, which most likely represents
      // that that text channel was deleted as IDs aren't dynamic.
      const description: string = `I tried to greet ${member}, but I couldn't find a channel with the ID of: ${settings.channel}.`;

      // We'll also inform them of how to set a new text channel.
      const note: string = "Please use the 'settings set channel' command to reset the main text channel";

      await this.client.log(member.guild, { event: null, entity: this.client.user, note, description, color: 'red' });
    }

    // Next, we'll check to see if the guild has assigned a main role to give to
    // the new member.
    if (settings.role) {
      // Similar to the channel, we'll try to resolve the ID into a role object.
      const role: Role | null = member.guild.roles.resolve(settings.role);

      // If an error occurs while trying to add the role to the member, we'll
      // set a description of the error to this variable.
      let error: string | null = null;

      if (role) {
        await member.roles.add(role).catch(() => {
          error = `I couldn't give the user ${member} the role ${role}, try putting my role above this role.`;
        });
      }

      // If the guild has assigned a role and the client couldn't find a role
      // with the saved ID, it's most likely that the role has been deleted, so
      // we'll inform this and ask the guild to reassign a role.
      else {
        error = `**${member.guild.name}** has a main role assigned with the ID \`${settings.role}\` but I couldn't find this role, please set a new role with the \`settings set role\` command.`;
      }

      // If an error occurred, we'll log it to the guild.
      if (error) {
        await this.client.log(member.guild, { description: error, event: null, color: 'red' });
      }
    }

    const description: string = `${member} has joined the server.`;

    // We'll have the footer represent the amount of members within the guild.
    const note: string = `Members: ${member.guild.members.cache.size}`;

    // After we've handled greeting the new member and giving them the guild's
    // main role, we'll log to the guild that this member has joined the server.
    this.client.log(member.guild, { event: 'guildMemberAdd', color: 'green', entity: member.user, description, note });
  }
}
