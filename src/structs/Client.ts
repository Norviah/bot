import { Client as BaseClient } from 'discord.js';
import { config } from '@config';

import type { ReadonlyDeep } from 'type-fest';

import * as schemas from '@/schemas';

export class Client extends BaseClient {
  /**
   * The client's configuration object.
   *
   * This object references important information regarding the client, most
   * notably the token that is used to log in to Discord.
   */
  private readonly config: ReadonlyDeep<schemas.Config> = schemas.config.parse(config);

  /**
   * Starts the client.
   */
  public async start(): Promise<void> {
    await this.login(this.config.token);
  }
}
