import { Listener } from '@/structs/Listener';

import type { BaseCommand } from '@/structs/commands/BaseCommand';
import type { InteractionResponse } from '@/types/discord/InteractionResponse';
import type { ApplicationCommandType, BaseInteraction, ChatInputCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

/**
 * The listener to bind to the `interactionCreate` event from the Discord
 * client.
 *
 * This event is emitted when an interaction is created.
 *
 * @see https://old.discordjs.dev/#/docs/discord.js/main/class/Client?scrollTo=e-interactionCreate
 */
export default class InteractionCreate extends Listener {
  /**
   * The emitter that will emit the desired event.
   *
   * @see https://old.discordjs.dev/#/docs/discord.js/main/class/Client
   */
  public emitter: string = 'client';

  /**
   * The desired event to listen to.
   */
  public event: string = 'interactionCreate';

  /**
   * The category of the listener.
   *
   * Categories are used to further group modules within their handler, which
   * allows us to group listeners by their emitter.
   */
  public category: string = 'client';

  /**
   * Ensures the provided interaction represents a command interaction.
   *
   * The `interactionCreate` event for the client emits whenever an interaction
   * is created in general, whether it be for a command or not. As this listener
   * aims to be a command handler, this method ensures that the provided
   * interaction is a command interaction.
   *
   * @param interaction The interaction which was created.
   * @returns Whether if the interaction is a command interaction.
   */
  public validate(interaction: BaseInteraction): interaction is ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction {
    return interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand();
  }

  /**
   * Executes the provided command.
   *
   * Once the listener executes and finds the respective command, this method is
   * then called to execute the respective command. This method ensures that the
   * client has the required permissions to execute the command.
   *
   * @param interaction The interaction that invoked the command.
   * @param command The command to execute.
   */
  public async run(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction, command: BaseCommand<ApplicationCommandType>): Promise<void> {
    // Before we can execute the command, we'll first need to ensure that the
    // client has the required permissions to execute the command. Commands may
    // implement things such as embed messages or reactions, which require
    // permissions to be executed.

    // When defining a command, there may be specified client permissions that
    // are required to execute the command.
    if (interaction.guild && command.clientPermissions && command.clientPermissions.length > 0) {
      const hasPermissions: boolean = interaction.guild.members.me?.permissions.has(command.clientPermissions) ?? false;

      // If the client does not have permissions, we'll send an error message to
      // the user and prevent the command from executing.
      if (!hasPermissions) {
        await interaction.reply({ content: `In order to execute this command, I need the following permission(s): \`${this.util.join(command.clientPermissions, 'and')}\`.`, ephemeral: true });

        return;
      }
    }

    try {
      // Here we'll attempt to execute the command, passing the interaction as
      // the context regarding the command's execution.
      const response: InteractionResponse = await command.exec(interaction);

      // Once the command has finished executing, the command will return the
      // response to send to the user. By forcing commands to return an
      // interaction response, we can ensure that the user is aware that the
      // client acknowledges their request.

      if (interaction.replied) {
        await interaction.followUp(response);
      } else {
        await interaction[interaction.deferred ? 'editReply' : 'reply'](response);
      }

      this.logger.info(`${this.util.who(interaction)} executed **${command.name}** in ${this.util.where(interaction)}`);
    } catch (error) {
      // If an error occurs while executing the command, we'll log the error
      // stack to the console, which will be saved to a file for future
      // reference.
      const stack: string[] | undefined = (error as Error).stack?.split(/r?\n/g).map((line: string) => line.trim());

      this.logger.error([`error executing \`${command.name}\` in ${this.util.where(interaction)}`, ...(stack ?? [])], { subDir: 'commands' });

      // We'll then hand off the error to the command's error handler, which
      // will handle the error accordingly.
      await command.onError(interaction, error as Error);
    }
  }

  /**
   * Executes the listener.
   *
   * This listener aims to function as the client's command handler, once an
   * interaction is created, the listener will attempt to find the respective
   * command and execute it.
   *
   * @param interaction The interaction which was created.
   */
  public async exec(interaction: BaseInteraction): Promise<void> {
    if (!this.validate(interaction)) {
      return;
    }

    // References the name of the command the interaction is in regards to.
    const name: string = interaction.commandName;

    // The respective command that the interaction represents, if it exists.
    const command: BaseCommand<ApplicationCommandType> | undefined = this.handler.client.handlers.commands.modules.get(name);

    // If the command couldn't be found, then an inconsistency exist within
    // Discord's api and the local files as Discord recognizes a command that
    // doesn't exist within the client.

    // If this is the case, the client author will need to redeploy the
    // commands to update the commands within Discord's api.
    if (!command) {
      // We'll simply give the user an error message in hopes that they possibly
      // executed the command just as it was deployed.
      await interaction.reply({ content: `The command \`${name}\` couldn't be found, please try again later.`, ephemeral: true });

      // We'll also log this error for future reference.
      return this.logger.error(`command **${name}** was called in ${this.util.where(interaction)} but doesn't exist`, { subDir: 'commands' });
    }

    await this.run(interaction, command);
  }
}
