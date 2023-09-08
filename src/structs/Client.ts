import { ListenerHandler } from '@/structs/handlers/ListenerHandler';
import { Client as BaseClient } from 'discord.js';

import { config } from '@/util/config';
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
   * The various handlers for the client.
   *
   * This property holds a reference to the various handlers that are used by
   * the client for various purposes.
   */
  public readonly handlers: Readonly<{ listeners: ListenerHandler }> = {
    listeners: new ListenerHandler(this, { process, client: this }),
  };

  /**
   * Starts the client.
   */
  public async start(): Promise<void> {
    try {
      await this.login(this.config.token);
    } catch (error) {
      if (error instanceof Error) {
        logger.exit(error.stack ? error.stack : error.message, { title: 'bubbled error', subDir: 'errors/bubbles' });
      }
    }
  }
}
