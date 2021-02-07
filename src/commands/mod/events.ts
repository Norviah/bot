import { Message } from 'discord.js';
import { basename } from 'path';

import { Command } from '../../structs/command';
import { CommandOptions } from '../../types/commandOptions';

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
    'Events essentially represents when a specific thing happens in your server, when you assign a logging channel using the `.settings set logchannel <channel>`, \
    certain events will then be logged into that channel. To get a full list of possible events, use the `.settings list` channel, to get a description of what each \
    event represents, use the `.settings describe <event>` command.',

  /**
   * Represents an array of permissions that a user needs in order to execute
   * this command.
   */
  permissions: ['MANAGE_GUILD'],

  /**
   * Enforces this command to only be used in guilds.
   */
  channel: 'guild',
};

/**
 * Allows moderators pick which events the client should log.
 */
export default class extends Command {
  /**
   * Initializes a new instance of the command.
   */
  public constructor() {
    super('events', options);
  }

  /**
   * Executes the command.
   * @param  message The message that called this command.
   */
  public async exec(message: Message): Promise<any> {
    //
    const events: string = JSON.stringify(this.client.database.guild(message.guild).events, null, 2);

    //
    const description: string = `**Events** represents when a certain thing occurs within this server, for example, when someone deletes a message or when \
    a message is deleted are both events. With the \`events enable\` and \`events disable\` subcommand, you can pick which events you want to be logged to the server's logging \
    channel, which can be set via the \`settings log\` command. \n\n\
    Below are the current support events that can be logged and a value representing if it's active. To get a description of what a certain event means, use the \`events describe [name]\` subcommand. \
    \n\`\`\`JSON\n${events}\`\`\``;

    await this.client.inform(message, description, { timestamp: undefined, entity: message.guild });
  }
}
