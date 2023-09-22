import { Module } from '@/structs/Module';
import { ApplicationCommandType, PermissionsBitField } from 'discord.js';

import type { SlashCommand } from '@/structs/commands/SlashCommand';
import type { ContextCommand } from '@/structs/commands/ContextCommand';
import type { InteractionResponse } from '@/types/discord/InteractionResponse';
import type { Explicit } from '@/types/ts/Explicit';
import type { BaseApplicationCommandData, CommandInteraction, LocalizationMap, PermissionFlags, Snowflake } from 'discord.js';

/**
 * The base structure for commands.
 *
 * Commands are an essential part of a Discord application, they allow users to
 * interact with the application in variety of ways. Through commands, the
 * application can receive input from users and execute actions based on that
 * input.
 *
 * In a Discord application, there are three types of commands:
 *
 *   1. Slash commands - commands that are invoked by typing a `/` in a channel
 *      or DM.
 *   2. User context menu commands - commands that are invoked by right-clicking
 *      on a user and selecting the command from the context menu.
 *   3. Message context menu commands - commands that are invoked by right-
 *      clicking on a message and selecting the command from the context menu.
 *
 * `BaseCommand` represents the base structure for commands, providing the basic
 * functionality that is shared between all types of commands.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands
 * @template T The type of command.
 */
export abstract class BaseCommand<T extends ApplicationCommandType> extends Module {
  /**
   * The command's description.
   *
   * An in-depth description of the command, this property should present a
   * thorough description of the command and its functionality.
   */
  public abstract readonly description: string;

  /**
   * The command's type.
   *
   * Represents the command's type, which is used to determine how the command
   * is invoked.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
   */
  public abstract readonly type: T;

  /**
   * Localization dictionary for the command's name.
   *
   * Represents the localization dictionary for the command's name, which will
   * cause the application to use the localcized name dependent on the client's
   * selected language.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#localization
   */
  public readonly nameLocalizations?: LocalizationMap;

  /**
   * Default permissions for the command.
   *
   * Note that these permissions represent the ***default*** permissions for the
   * command when the command is first deployed to a guild or when the
   * application joins a new guild.
   *
   * These permissions are only the default and can be altered by guild
   * administrators, allowing them to configure access however they see fit. Due
   * to this, **it is highly advised** to not implement commands that are
   * dev-only which use actions such as `eval`.
   *
   * @see https://discord.com/developers/docs/interactions/slash-commands#permissions
   * @see https://discordjs.guide/slash-commands/permissions.html#member-permissions
   */
  public readonly permissions?: (keyof PermissionFlags)[];

  /**
   * Permissions the client needs in order to execute the command.
   *
   * This property differs from the `permissions` property as it is in regards
   * to the client itself. If specified, the client will check that it has all
   * provided permissions before executing the command.
   *
   * If the client is missing any of the provided permissions, the command will
   * not be executed.
   */
  public readonly clientPermissions?: (keyof PermissionFlags)[];

  /**
   * Indicates whether if the command is available within the client's DMs.
   *
   * This flag is only applicable for globally-scoped commands, it is ignored
   * for guild-specific commands.
   */
  public readonly dm?: boolean;

  /**
   * Indicates whether if the command should be age-restricted.
   *
   * Commands that contains age-restricted content should be marked as such,
   * this will limit who can see and access the command.
   *
   * @see https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands
   */
  public readonly nsfw?: boolean;

  /**
   * The guilds to restrict the command to.
   *
   * If specified, the command will be deployed *only* the specified guilds,
   * meaning the command will not be available globally.
   *
   * @see https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
   */
  public readonly guilds?: Snowflake[];

  /**
   * The command's execution method.
   *
   * This method represents the logic that is executed once the command is
   * invoked. During the command's execution, the returned value will be sent
   * to the interaction as a response, this is to ensure that commands do
   * respond to the user.
   *
   * Responding to the interaction is required, as this confirms to Discord that
   * the command has successfully received the interaction and responded to the
   * user. Failing to respond will cause Discord to send a follow-up message
   * indicating that the command has failed.
   *
   * @see https://discord.com/developers/docs/interactions/receiving-and-responding
   * @see https://discordjs.guide/slash-commands/response-methods.html
   *
   * @param interaction The interaction that invoked the command.
   * @returns The response to the interaction.
   */
  public abstract exec(interaction: CommandInteraction): Promise<InteractionResponse>;

  /**
   * Invoked if the command throws an error during execution.
   *
   * During the execution of the command, if an error is thrown, this method is
   * invoked. This method is responsible for handling the error and responding
   * to the interaction.
   *
   * @param interaction The interaction that invoked the command.
   * @param error The error that was thrown.
   */
  public async onError(interaction: CommandInteraction, error: Error): Promise<void> {
    const content: string = 'An error occurred while running the command, please try again in a bit.';

    if (interaction.replied) {
      await interaction.followUp({ content, ephemeral: true });
    } else {
      await interaction[interaction.deferred ? 'editReply' : 'reply']({ content, ephemeral: true });
    }
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
  public toJSON(): Explicit<BaseApplicationCommandData> {
    const payload: Explicit<BaseApplicationCommandData> = {
      name: this.name,
      nameLocalizations: this.nameLocalizations,
      defaultMemberPermissions: this.permissions?.length ? new PermissionsBitField(this.permissions) : null,
      dmPermission: this.dm,
      nsfw: this.nsfw,
    };

    return payload;
  }

  /**
   * Indicates whether if the command is a slash command.
   *
   * @returns Whether if the command is a slash command.
   */
  public isSlashCommand(): this is SlashCommand {
    return this.type === undefined || this.type === ApplicationCommandType.ChatInput;
  }

  /**
   * Indicates whether if the command is a context command.
   *
   * @returns Whether if the command is a context command.
   */
  public isContextCommand(): this is ContextCommand<ApplicationCommandType.User> | ContextCommand<ApplicationCommandType.Message> {
    return this.type === ApplicationCommandType.User || this.type === ApplicationCommandType.Message;
  }

  /**
   * Indicates whether if the command is a user context command.
   *
   * @returns Whether if the command is a user context command.
   */
  public isUserContextCommand(): this is ContextCommand<ApplicationCommandType.User> {
    return this.type === ApplicationCommandType.User;
  }

  /**
   * Indicates whether if the command is a message context command.
   *
   * @returns Whether if the command is a message context command.
   */
  public isMessageContextCommand(): this is ContextCommand<ApplicationCommandType.Message> {
    return this.type === ApplicationCommandType.Message;
  }
}
