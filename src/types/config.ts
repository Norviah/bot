import { AkairoOptions } from 'discord-akairo';

export interface Config extends AkairoOptions {
  /**
   * The Discord ID, or IDs, of the client owners, this value should only
   * contain the IDs of users you trust, as these users can execute any command
   * through the client regardless of the permissions they have.
   */
  readonly ownerID: string | string[];

  /**
   * The client's token, which is available at:
   * https://discordapp.com/developers/applications/me.
   */
  readonly token: string;

  /**
   * The invite link for the client, don't set this value if you don't want
   * users getting the invite link for your client.
   */
  readonly invite?: string;
}
