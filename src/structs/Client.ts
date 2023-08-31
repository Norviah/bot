import { config } from '@/util/config';
import { Client as BaseClient } from 'discord.js';

import { logger } from '@/util/logger';

import type { Config } from '@/schemas';
import type { ClientOptions } from 'discord.js';
import type { ReadonlyDeep } from 'type-fest';

export class Client extends BaseClient {
  /**
   * The client's configuration object.
   *
   * This object references important information regarding the client, most
   * notably the token that is used to log in to Discord.
   */
  private readonly config: ReadonlyDeep<Config> = config;

  /**
   * Initializes a new `Client` instance.
   *
   * @param options Options for the client.
   */
  public constructor(options: ClientOptions) {
    super(options);
  }

  /**
   * Starts the client.
   */
  public async start(): Promise<void> {
    try {
      this.login(this.config.token);
    } catch (error) {
      if (error instanceof Error) {
        logger.exit(error.stack ? error.stack : error.message, { title: 'bubbled error', subDir: 'errors/bubbles' });
      }
    }
  }
}
