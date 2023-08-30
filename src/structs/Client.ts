import { config } from '@config';
import { Client as BaseClient } from 'discord.js';

import { logger } from '@/util/logger';
import { fromZodError } from 'zod-validation-error';

import type { ClientOptions } from 'discord.js';
import type { ReadonlyDeep } from 'type-fest';
import type { ZodError } from 'zod';

import * as schemas from '@/schemas';

export class Client extends BaseClient {
  /**
   * The client's configuration object.
   *
   * This object references important information regarding the client, most
   * notably the token that is used to log in to Discord.
   */
  private readonly config: ReadonlyDeep<schemas.Config>;

  /**
   * Initializes a new `Client` instance.
   *
   * @param options Options for the client.
   */
  public constructor(options: ClientOptions) {
    super(options);

    try {
      this.config = schemas.config.parse(config);
    } catch (error) {
      logger.exit(fromZodError(error as ZodError).message, { title: 'invalid config' });
    }
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
