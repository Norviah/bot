import { Command } from '@cli/structs/Command';
import { Flags } from '@oclif/core';

import { config } from '@/util/config';
import { prisma } from '@/util/prisma';

import type { Command as CommandModel, GuildCommand as GuildCommandModel } from '@prisma/client';
import type { ApplicationCommand, ApplicationCommandData as PayloadData } from 'discord.js';

export default class Deploy extends Command<typeof Deploy, true> {
  /**
   * The command's summary.
   *
   * A small, brief description regarding the command.
   */
  public static summary: string = 'Deploys commands to Discord.';

  /**
   * The command's description.
   *
   * A more detailed description regarding the command, this should thoroughly
   * describe the command and its purpose.
   */
  public static description: string = `This command acts as the command manager
  for your Discord application. Once executed, all locally defined commands are
  deployed to Discord and saved to the database for future reference, deleting
  all commands that no longer exist.

  If the \`--development\` flag is provided, then all commands are instead
  deployed to the development server specified within the config. It's highly
  recommended to have a server dedicated for development purposes, as besides
  for obvious reasons, deploying commands to a single guild is nearly instant.

  The process of deploying commands to Discord is as follows:

  ⠀  1. Deploy all commands to Discord,
  ⠀  2. Save deployed commands to the database,
  ⠀  3. Delete all commands that no longer exist.`;

  /**
   * Examples for the command.
   */
  public static examples: string[] = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> --development'];

  /**
   * Available options for the command.
   *
   * The user may provide these options to the command to alter the command's
   * behavior.
   */
  public static flags = {
    /**
     * The `--development` flag.
     *
     * This flag determines whether if commands are being deployed for
     * development purposes. If set, then commands will only be deployed to the
     * development server specified within the config.
     */
    development: Flags.boolean({ description: 'Whether if commands should be deployed only to the development server.', default: false, char: 'd' }),
  };

  /**
   * Whether if the command requires the client to be logged in.
   */
  public requiresClient = true as const;

  /**
   * Generates the payload used to deploy commands to Discord.
   *
   * In order to deploy commands to Discord, we need to provide Discord a
   * payload for each command. This payload describes information regarding the
   * command, such as its name, description, and options.
   *
   * This method generates the payload for each scope of the application: global
   * and guilds. Global commands are commands that are available to all guilds,
   * while guild commands are only available to a specific guild.
   *
   * @returns The payload for the commands to deploy.
   */
  public generatePayload(): { global: PayloadData[]; guilds: Map<string, PayloadData[]> } {
    /**
     * Represents the payload for global commands.
     *
     * These commands will be available to all guilds that the client is in.
     */
    const global: PayloadData[] = [];

    /**
     * Represents the payload for guild commands.
     *
     * These commands will only be available to the guilds specified.
     */
    const guilds: Map<string, PayloadData[]> = new Map();

    /**
     * Adds a payload to the specified guild's collection.
     *
     * A helper method to add a payload to the collection of the provided guild,
     * if the guild doesn't exist within the collection, then a new collection
     * is created.
     *
     * @param id The guild's ID.
     * @param payload The payload to add.
     */
    const add = (id: string, payload: PayloadData): void => {
      // References the existing collection of payloads for the specified guild,
      // if the guild doesn't exist within the collection, then a new collection
      // is created.
      const existingData: PayloadData[] = guilds.get(id) ?? [];

      guilds.set(id, existingData.concat([payload]));
    };

    for (const command of Array.from(this.client.handlers.commands.modules.values())) {
      // Commands have the `guilds` property to specify the desired guild to
      // deploy the command to. Before we aknowledge this property, we'll first
      // check if the command was executed for development purposes.

      // If so, all commands are to be deployed to the development server.
      if (this.flags.development) {
        add(config.devServer, command.toJSON());
      }

      // If the command was executed for production purposes, we then can
      // acknowledge the `guilds` property. This property is a collection of
      // guild ids that the command should be deployed to.

      // We first want to ensure that the command has specified this property
      // in addition to ensuring that the property isn't empty.
      else if (command.guilds && command.guilds.length > 0) {
        for (const guild of command.guilds) {
          add(guild, command.toJSON());
        }
      }

      // Otherwise, if the command has no specified guilds, then the command is
      // deployed globally.
      else {
        global.push(command.toJSON());
      }
    }

    return { global, guilds };
  }

  /**
   * The error handler for Discord API calls.
   *
   * This method is responsible for handling any errors that occur when
   * attempting to remove an application command from Discord.
   *
   * Essentially, this method only checks if the error's message is a specific
   * phrase, as this phrase only occurs if the command we're attempting to
   * delete doesn't exist. If this is the case, then we can safely ignore the
   * error.
   *
   * @param error The error that occurred.
   */
  public deleteErrorHandler(error: Error): void {
    if (error.message === 'Unknown application command') {
      return;
    }

    this.logger.exit(error.message, { subDir: '/errors/' });
  }

  /**
   * Saves the command to the database.
   *
   * After a command has been deployed to Discord, we'll use the response from
   * Discord to save the command into the database for future reference.
   *
   * @param payload The response from Discord which provides information of the
   * command that was deployed.
   */
  public async save(payload: ApplicationCommand): Promise<void> {
    const connectGuildCommand = payload.guildId
      ? {
          connectOrCreate: {
            where: {
              id: payload.id,
            },

            create: {
              id: payload.id,
              guild: {
                connectOrCreate: {
                  where: {
                    id: payload.guildId,
                  },

                  create: {
                    id: payload.guildId,
                  },
                },
              },
            },
          },
        }
      : undefined;

    await prisma.command.upsert({
      where: {
        name: payload.name,
      },

      create: {
        name: payload.name,
        id: payload.guildId ? undefined : payload.id,
        guilds: payload.guildId ? connectGuildCommand : undefined,
      },

      update: {
        id: payload.guildId ? undefined : payload.id,
        guilds: payload.guildId ? connectGuildCommand : undefined,
      },
    });

    this.logger.success(`saved command \`${payload.name}\` to the database`);
  }

  /**
   * Deploys the command.
   *
   * This method will deploy the provided payload to Discord, ensuring that the
   * command was deployed to the specified scope. Once deployed, the command is
   * then saved within the database for future reference.
   *
   * @param payload The payload for the command.
   * @param guild The guild to deploy the command to, if specified.
   * @returns The response from Discord regarding the deployed command.
   */
  public async deploy(payload: PayloadData, guild?: string): Promise<ApplicationCommand> {
    // Here we'll attempt to deploy the command to Discord's API. If the command
    // was deployed successfully, then Discord will respond with information
    // regarding the command.
    const response = await this.client.application.commands.create(payload, guild!);

    const where: string = guild ? `to guild \`${guild}\`` : 'globally';

    if (!response) {
      this.logger.exit(`failed to deploy command \`${payload.name}\` ${where}`);
    }

    this.logger.success(`deployed command \`${payload.name}\` ${where}`);

    // Once the command has been deployed, we'll use the response sent from
    // Discord to save the command to the database for future reference.
    await this.save(response);

    return response;
  }

  /**
   * Deletes a command from Discord and the database.
   *
   * This method is responsible for deleting a command, this process entails
   * deleting the command from Discord and removing all references to the
   * command from the database.
   *
   * @param command The command to delete.
   */
  public async delete(command: CommandModel & { guilds: GuildCommandModel[] }): Promise<void> {
    // As commands may be deployed to a guild, in addition to being deployed to
    // all guilds, we'll first want to handle deleting the command from all
    // guilds that the command was deployed to.

    // When deleting commands, we'll first delete the command from Discord, then
    // from the database. This is to ensure that if an error occurs when
    // deleting the command from Discord, we're ensured that the command still
    // exists within the database.
    for (const guildCommand of command.guilds) {
      await this.client.application.commands.delete(guildCommand.id, guildCommand.guildId).catch(this.deleteErrorHandler);

      await prisma.guildCommand.delete({
        where: { id: guildCommand.id },
      });
    }

    // After deleting the command from the specified guilds, we'll then want to
    // delete the global instance for the command. Commands may not be deployed
    // globally, so we'll first want to ensure this.
    if (command.id) {
      await this.client.application.commands.delete(command.id).catch(this.deleteErrorHandler);
    }

    // Finally, we'll delete the command from the database.
    await prisma.command.delete({ where: { name: command.name } });

    this.logger.success(`deleted command \`${command.name}\``);
  }

  /**
   * Executes the command.
   *
   * When executed, the command will deploy all commands to whatever scope that
   * was specified. Once deployed, information is saved to the database for
   * future reference.
   *
   * The reason why we save commands into the database is to ensure that Discord
   * is in sync to whatever commands we have. As if a command's file is removed,
   * Discord will still think that the command exists and will still respond to
   * it. By having a local reference to deployed commands, we can prevent issues
   * similar to this.
   *
   * To be precise, the command will follow these steps:
   *
   *   1. Deploy all commands to Discord.
   *
   *      All commands from local files will be deployed to Discord, which will
   *      return information regarding the deployed command, notably its ID.
   *
   *   2. Save the command's information to the database.
   *
   *      Once Discord responds with the command's information, we'll use
   *      this information to save the command to the database for future
   *      reference.
   *
   *   3. Delete any commands that no longer exist from the database and
   *      Discord.
   *
   *      After all commands have been deployed, we'll check the database for
   *      commands and compare them to the commands that were just deployed. If
   *      any commands exist in the database that weren't deployed, then we'll
   *      delete them from the database and Discord.
   */
  public async run(): Promise<void> {
    // A container for the payload response from Discord after deploying a
    // command. The response sent is important as we'll use this information to
    // compare against the database to delete any removed commands.
    const applications: ApplicationCommand[] = [];

    // First, we'll generate the payload for the commands. This payload
    // represents the command as a JSON object, which describes the command's
    // that Discord then takes and uses to create the command.
    const { global, guilds } = this.generatePayload();

    for (const [guild, commands] of guilds) {
      for (const application of commands) {
        applications.push(await this.deploy(application, guild));
      }
    }

    for (const application of global) {
      applications.push(await this.deploy(application));
    }

    // After deploying all commands, we'll then handle deleting removed
    // commands. As all commands are saved within the database, we can compare
    // commands from the database against the commands that were just deployed.

    // We'll first retrieve all commands from the database, which will be used
    // to compare against the commands that were just deployed.
    const commands = await prisma.command.findMany({
      include: {
        guilds: true,
      },
    });

    // From this collection, we'll initialize a new list to reference commands
    // missing from the commands that were just deployed. All commands found are
    // then removed from the database and Discord.
    const deleted = commands.filter((command) => {
      return !applications.some((deployed) => command.name === deployed.name);
    });

    for (const command of deleted) {
      await this.delete(command);
    }
  }
}
