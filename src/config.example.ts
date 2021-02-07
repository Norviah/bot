// After you have set the values,
// make sure to rename this file to 'config.ts'.

import { Config } from './types/config';

export const config: Config = {
  /**
   * The Discord ID, or IDs, of the client owners, this value should only
   * contain the IDs of users you trust, as these users can execute any command
   * through the client regardless of the permissions they have.
   */
  ownerID: ['[your ID]'],

  /**
   * The client's token, which is available at:
   * https://discordapp.com/developers/applications/me.
   */
  token: "[client's token]",

  /**
   * The invite link for the client, don't set this value if you don't want
   * users getting the invite link for your client.
   */
  invite: undefined,
};
