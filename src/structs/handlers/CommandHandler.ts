import { BaseCommand } from '@/structs/commands/BaseCommand';
import { Handler } from '@/structs/handlers/Handler';

import type { Client } from '@/structs/Client';
import type { ContextCommand } from '@/structs/commands/ContextCommand';
import type { SlashCommand } from '@/structs/commands/SlashCommand';
import type { ApplicationCommandType } from 'discord.js';
import type { AbstractClass } from 'type-fest';

import * as paths from '@/util/paths';

export class CommandHandler extends Handler<BaseCommand<ApplicationCommandType>> {
  /**
   * The base directory that contains the desired modules.
   *
   * When importing commands, the handler will look in this directory for
   * commands to import, recursively looking in subdirectories.
   */
  public readonly directory: string = paths.COMMANDS;

  /**
   * The reference to the abstract class that the handler manages.
   */
  public readonly reference: AbstractClass<BaseCommand<ApplicationCommandType>> = BaseCommand;

  /**
   * All initialized commands.
   */
  public modules!: Map<string, SlashCommand | ContextCommand<ApplicationCommandType.Message | ApplicationCommandType.User>>;

  /**
   * Initializes a new `Handler` instance.
   *
   * @param client The instantiated Discord client.
   */
  public constructor(client: Client) {
    super(client);

    this.registerAll();
  }
}
