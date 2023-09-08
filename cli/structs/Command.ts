import { Client } from '@/structs/Client';
import { Logger } from '@/structs/Logger';
import { Command as BaseCommand } from '@oclif/core';

import { join } from 'path';

import * as paths from '@/util/paths';

import type { Config as CommandConfig, Interfaces } from '@oclif/core';
export type Flags<T extends typeof BaseCommand> = Interfaces.InferredFlags<(typeof Command)['baseFlags'] & T['flags']>;
export type Args<T extends typeof BaseCommand> = Interfaces.InferredArgs<T['args']>;

export abstract class Command<T extends typeof BaseCommand> extends BaseCommand {
  /**
   * Parsed flags from the command-line.
   */
  public flags!: Flags<T>;

  /**
   * Parsed arguments from the command-line.
   */
  public args!: Args<T>;

  /**
   * The Discord client.
   *
   * As the command-line interface is used to help manage aspects of the bot,
   * we'll have the commands access to the client, which will allow us to
   * interact with the Discord API.
   *
   * We aren't necessarily using intents here, as we don't need to listen to
   * events, we just need to be able to login and access the various api
   * managers.
   */
  public client: Client<true> = new Client<true>({ intents: [] });

  /**
   * The logging system.
   *
   * This logging system allows for logging to the console and to files,
   * in addition to providing a structured format for logs.
   *
   * @see https://github.com/norviah/logger#readme
   */
  public logger: Logger = new Logger({ dir: join(paths.LOGS, 'cli') });

  /**
   * Initializes a new `Command` instance.
   *
   * @param argv The arguments passed to the command.
   * @param config The configuration of the command.
   */
  public constructor(argv: string[], config: CommandConfig) {
    super(argv, config);
  }

  /**
   * Initializes the command and its related properties.
   */
  public async init(): Promise<void> {
    await super.init();

    // Here, we'll parse the command-line arguments and flags using the commands
    // explicitly set flags and arguments in addition to any base flags.
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: super.ctor.baseFlags,
      args: this.ctor.args,
    });

    this.flags = flags as Flags<T>;
    this.args = args as Args<T>;

    // Next, we'll want to ensure the client is logged and and ready before we
    // do anything else, as we'll need to access to the client's various apis.
    await this.client.start();
  }

  /**
   * Handles errors thrown during the command's execution.
   *
   * This method is called when an error occurs throughout the course of a
   * command run.
   *
   * @see https://oclif.io/docs/error_handling/
   * @error The error that was thrown.
   */
  public async catch(error: Error): Promise<void> {
    this.logger.exit(error.message, { subDir: 'errors' });
  }
}
