import { BaseCommand } from '@/structs/commands/BaseCommand';
import { ApplicationCommandType } from 'discord.js';

import type { InteractionResponse } from '@/types/discord/InteractionResponse';
import type { Explicit } from '@/types/ts/Explicit';
import type { MessageApplicationCommandData, MessageContextMenuCommandInteraction, UserApplicationCommandData, UserContextMenuCommandInteraction } from 'discord.js';

/**
 * The base structure for context commands.
 *
 * In a Discord application, context commands are commands that appear within
 * the context menu when right clicking a user or a message, within the `Apps`
 * submenu.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 * @template T The type of context command the structure represents.
 */
export abstract class ContextCommand<T extends ApplicationCommandType.Message | ApplicationCommandType.User> extends BaseCommand<T> {
  /**
   * The type of context the command represents.
   *
   * This property informs Discord the of the command's type, allowng them to
   * provide the command to the user in the correct context. As this command
   * represents a context command, it's value is constricted to `T`.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
   */
  public abstract readonly type: T;

  /**
   * The command's execution method.
   *
   * This method is called when the command is invoked by a user through the
   * respective context menu, it is responsible for executing the command's
   * logic.
   *
   * @param interaction The interaction that invoked the command.
   * @returns The response to send to the interaction.
   */
  public abstract exec(interaction: T extends ApplicationCommandType.Message ? MessageContextMenuCommandInteraction : UserContextMenuCommandInteraction): Promise<InteractionResponse>;

  /**
   * Invoked if the command throws an error during execution.
   *
   * During the execution of the command, if an error is thrown, this method is
   * then called. This method should be implemented to handle the error and
   * generate a response, which will be sent to the user.
   *
   * @param interaction The interaction that invoked the command.
   * @param error The error that was thrown.
   * @returns The response to send to the interaction.
   */
  public async onError(interaction: T extends ApplicationCommandType.Message ? MessageContextMenuCommandInteraction : UserContextMenuCommandInteraction, error: Error): Promise<InteractionResponse> {
    return await super.onError(interaction, error);
  }

  /**
   * The command serialized into a JSON object.
   *
   * When deploying a command to Discord, we'll need to send a JSON payload
   * describing the command, this method serializes the information of the
   * command into a JSON object.
   *
   * @see https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-structure
   * @returns The base information regarding the command serialized into a JSON
   */
  public toJSON(): T extends ApplicationCommandType.Message ? Explicit<MessageApplicationCommandData> : Explicit<UserApplicationCommandData> {
    return { ...super.toJSON(), type: this.type } as T extends ApplicationCommandType.Message ? Explicit<MessageApplicationCommandData> : Explicit<UserApplicationCommandData>;
  }
}
