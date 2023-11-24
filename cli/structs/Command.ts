import { Logger } from '@/structs/Logger';
import { Command as BaseCommand } from '@oclif/core';

import { client } from '@cli/util/client';
import { join } from 'path';

import * as paths from '@/util/paths';

import type { Config as CommandConfig, Interfaces } from '@oclif/core';
import type { Client } from '@/structs/Client';

export type Flags<T extends typeof BaseCommand> = Interfaces.InferredFlags<(typeof Command)['baseFlags'] & T['flags']>;
export type Args<T extends typeof BaseCommand> = Interfaces.InferredArgs<T['args']>;

export abstract class Command<T extends typeof BaseCommand, ClientApplication extends boolean = false> extends BaseCommand {
  /**
   * Parsed flags from the command-line.
   */
  public flags!: Flags<T>;

  /**
   * Parsed arguments from the command-line.
   */
  public args!: Args<T>;

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
   * Whether if the command requires the client to be logged in.
   */
  public abstract requiresClient: ClientApplication;

  /**
   * The Discord client.
   *
   * This property holds a reference to the Discord client, which is used to
   * interact with the Discord API.
   *
   * Depending on the value of `requiresClient`, if true, the client will be
   * ensured to be logged in and ready before the command is executed.
   */
  public get client(): Client<ClientApplication> {
    return client as Client<ClientApplication>;
  }

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

    // Finally, after the comamnd's properties have been initialized, we'll want
    // to ensure that the client is logged in, only if the command requires it.
    if (this.requiresClient) {
      await client.start();
    }
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
