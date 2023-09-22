import { BaseCommand } from '@/structs/commands/BaseCommand';
import { ApplicationCommandType } from 'discord.js';

import type { InteractionResponse } from '@/types/discord/InteractionResponse';
import type { Explicit } from '@/types/ts/Explicit';
import type { ApplicationCommandOptionData, ChatInputApplicationCommandData, ChatInputCommandInteraction, LocalizationMap } from 'discord.js';

/**
 * The base structure for slash commands.
 *
 * Slash commands are a type of application command, they are Discord's own
 * implementation of commands. They provide a variety of features that are not
 * present when using commands simply as messages.
 *
 * Slash commands are an essential part of a Discord application, they allow
 * users to interact with the application in variety of ways. They are invoked
 * by typing `/` in a channel or DM, selecting the desired command from the
 * autocomplete menu.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#slash-commands
 */
export abstract class SlashCommand extends BaseCommand<ApplicationCommandType.ChatInput> {
  /**
   * Localization dictionary for the command's name.
   *
   * Represents the localization dictionary for the command's description, which
   * will cause the application to use the localcized description dependent on
   * the client's selected language.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#localization
   */
  public readonly descriptionLocalizations?: LocalizationMap;

  /**
   * The type of command.
   *
   * This property informs Discord the of the command's type, allowng them to
   * provide the command to the user in the correct context. As this command
   * represents a slash command, the type is set to `CHAT_INPUT`.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
   */
  public readonly type = ApplicationCommandType.ChatInput;

  /**
   * Any options for the command.
   *
   * Commands may have options, which can be thought of as arguments to a
   * function, these provide a way for the user to provide additional
   * information the command may need.
   *
   * When the command is called, the user will be prompted to provide these
   * options, in addition to any auto-completion that may be provided - such as
   * a list of channels.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
   */
  public readonly options?: ApplicationCommandOptionData[];

  /**
   * The command's execution method.
   *
   * This method is called when a user calls the command in Discord, it is
   * responsible for executing the command's logic.
   *
   * @param interaction The interaction that invoked the command.
   * @returns The response to send to the interaction.
   */
  public abstract exec(interaction: ChatInputCommandInteraction): Promise<InteractionResponse>;

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
  public async onError(interaction: ChatInputCommandInteraction, error: Error): Promise<InteractionResponse> {
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
  public toJSON(): Explicit<ChatInputApplicationCommandData> {
    return { ...super.toJSON(), description: this.description, descriptionLocalizations: this.descriptionLocalizations, options: this.options, type: this.type };
  }
}
