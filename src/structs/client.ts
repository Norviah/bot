import { ClientOptions, Guild, Message, TextChannel } from 'discord.js';
import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';

import { commandHandlerOptions } from '../config/commandHandler';

import { colors } from '../util/colors';
import { embed } from '../util/embed';
import { emotes } from '../util/emotes';
import { ensure } from '../util/ensure';
import { join } from '../util/join';
import { prompt } from '../util/prompt';

import { isPermission, permissions } from '../util/types/permission';
import { isSnowflake } from '../util/types/snowflake';
import { isDefaultEmoji } from '../util/types/emoji';

import { Config } from '../types/config';
import { LoggedEvents } from '../types/typescript/events';
import { GuildConfig } from '../types/guildConfig';
import { MessageEmbedOptions } from '../types/messageEmbedOptions';

import { Command } from './command';
import { Database } from './database';
import { logger } from './logger';

import * as descriptions from '../util/descriptions';
import * as regex from '../util/regex';
import * as paths from '../util/paths';

export class Client extends AkairoClient {
  /**
   * Handles messages and commands.
   */
  public commandHandler: CommandHandler = new CommandHandler(this, {
    ...commandHandlerOptions,

    /**
     * Finds and returns the prefix for the given guild within the database.
     * @param  guild The guild to find a prefix for.
     * @return       The prefix for the given guild.
     */
    prefix: (message: Message): string => {
      return this.database.guild(message.guild).settings.prefix;
    },
  });

  /**
   * Monitors or blocks messages from the command handler.
   */
  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {});

  /**
   * Listens and executes methods for events.
   */
  public listenerHandler: ListenerHandler = new ListenerHandler(this, { directory: paths.listeners });

  /**
   * The logging system.
   */
  public logger: typeof logger = logger;

  /**
   * A list of minimal colors in HEX format.
   */
  public colors = colors;

  /**
   * A list of emojis.
   */
  public emotes = emotes;

  /**
   * A list of descriptions for each event and config key.
   */
  public descriptions = descriptions;

  /**
   * A list of absolute paths for directories used throughout this project.
   */
  public paths = paths;

  /**
   * A list of permission names.
   */
  public permissions = permissions;

  /**
   * The local persistent database we'll be using.
   */
  public database: Database = new Database('database');

  /**
   * Initializes a new Client instance.
   * @param config  Config values for the client.
   * @param options Options for the Discord.js client.
   */
  public constructor(public config: Config, options?: ClientOptions) {
    super(config, options);
  }

  /**
   * Converts the array into a string, with the elements separated via a comma
   * with the last two elements, when possible, separated with the given word.
   * @param  array The array to convert to a string.
   * @param  word  The word to append before the last element in the string.
   * @return       A string representing the elements of the array.
   */
  public join = join;

  /**
   * A helper function for creating embed messages.
   * @param  options Options for the embed message.
   * @return         An embed message initialized with the given options.
   */
  public embed = embed;

  /**
   * Prompts the message's author with a question and waits for the author to
   * react with an emote to determine their response.
   * @param  message  The message object.
   * @param  question The question to ask the author.
   * @param  limit    Determines how long we should wait for a response.
   * @return          The author's response.
   */
  public prompt = prompt;

  /**
   * Represents a helper method to send an embed message to the given author to
   * provide them information.
   * @param  message     The message to provide information to.
   * @param  description The embed message's description.
   * @param  options     Options for the embed message.
   * @return             The sent message containing the embed message.
   */
  public async inform(message: Message, description?: string, options?: MessageEmbedOptions): Promise<Message> {
    return await message.util!.send(this.embed({ description, entity: message.author, color: 'blue', ...options }));
  }

  /**
   * Represents a helper method to send an embed message to the given author to
   * confirm that an action is successful.
   * @param  message     The message to provide information to.
   * @param  description The embed message's description.
   * @param  options     Options for the embed message.
   * @return             The sent message containing the embed message.
   */
  public async confirm(message: Message, description?: string, options?: MessageEmbedOptions): Promise<Message> {
    return await message.util!.send(this.embed({ description, entity: message.author, color: 'green', ...options }));
  }

  /**
   * Represents a helper method to send an embed message to the given author to
   * provide them information about an error.
   * @param  message     The message to provide information to.
   * @param  description The embed message's description.
   * @param  options     Options for the embed message.
   * @return             The sent message containing the embed message.
   */
  public async error(message: Message, description?: string, options?: MessageEmbedOptions & { command?: Command }): Promise<Message> {
    // If a command is given, the command's usage will be added as a field to
    // the embed message to represent how to properly use the command, if the
    // error occurred happened to occur during an execution of a command.
    const usage: string[] | undefined = options?.command?.usage;

    // If a command is given, and it has an array representing how to use it,
    // we'll initialize an object containing it as a property.
    const field: { [key: string]: string[] } | undefined = usage ? { usage, ...options?.field } : undefined;

    return await message.util!.send(this.embed({ description, color: 'red', entity: message.author, field, ...options }));
  }

  /**
   * Logs certain events to a guild.
   * @param  guild       The guild to log the message to.
   * @param  event       The event that is getting logged.
   * @param  description The description of the log.
   * @param  options     Options for the embed message.
   */
  public async log(guild: Guild, options: MessageEmbedOptions & { description: string; event: LoggedEvents | null; message?: Message }): Promise<void> {
    // In order to log a message into the given guild, we'll need to import
    // their settings from the database to determine which channel to use.
    const config: GuildConfig = this.database.guild(guild);

    // Before continuing, we'll check to see if the guild wants the client to
    // log this specific event and that the guild has set a channel to log to.
    if (!config.settings.logChannel || (options.event ? !config.events[options.event] : false)) {
      return;
    }

    // As channels are saved via their IDs in the database, we'll try to find
    // the channel object by resolving the ID.
    const channel: TextChannel | null = guild.channels.resolve(config.settings.logChannel) as TextChannel;

    // If a user or guild is given, we'll have the footer represent it's ID, so
    // we'll initialize a string to represent the entity's instance and ID.
    const entityID: string | null = options.entity ? `${options.entity instanceof Guild ? 'Guild' : 'User'} ID: ${options.entity.id}` : null;

    // We'll do the same if a message is sent.
    const messageID: string | null = options.message ? `Message ID: ${options.message.id}` : null;

    const note: string[] = [options.note, entityID, messageID].flat().filter(ensure);

    await channel.send(this.embed({ color: 'blue', entity: guild, ...options, note }));
  }

  /**
   * Pauses the main thread for the given duration.
   * @param  duration Represents how long to wait for (in milliseconds).
   * @return          An empty promise.
   */
  public async wait(duration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * As commands have subcommands, we could manually set subcommands for each
   * command using something like an array, or, we can dynamically set
   * subcommands, still using an array, but automatically via IDs. IDs for
   * subcommands are in the format of '[base]-[name]' with base representing the
   * ID of the base command and name representing the name of the subcommand.
   *
   * Ideally, this function would be called during the initialization of
   * commands, but, that isn't possible as all commands won't be initialized and
   * the handler isn't set during the constructor for commands. Instead, this
   * handler is called when the client is initialized and ready, and, whenever
   * commands are reloaded.
   */
  handleSubcommands(): void {
    for (const id of this.commandHandler.modules.keyArray()) {
      this.handleSubcommand(id);
    }
  }

  /**
   * Generates and set an array of subcommands for the given command.
   * @param id             The ID of the command to handle.
   */
  private handleSubcommand(id: string): void {
    // First, we'll import the command object for the current ID.
    const command: Command | null = this.commandHandler.modules.get(id) as Command;

    // We are only looking for subcommands, which are represented by having a
    // hypen in the ID, we'll ignore this command if it isn't a subcommand.
    if (!command || !regex.commands.subcommand.test(command.id)) {
      return;
    }

    // As this is a subcommand, the ID is divided into sections as the form
    // [parent command's ID]-[name of subcommand], subcommands could also have
    // their own set of subcommands, so we'll split the command's ID.
    const sections: string[] = command.id.split('-');

    // As subcommands can have their own subcommands, we'll initialize a
    // variable to represent the name of the subcommand and the ID of the
    // parent command.

    // First, we know that the last element is the name of the subcommand, so
    // that's simple to retrieve.
    const name: string = sections.pop()!;

    // The rest of the elements are the ID of the subcommand parent's ID.
    const parentName: string = sections.join('-');

    // Before continuing, we'll ensure that the parent command is a valid,
    // existing command.
    if (!this.commandHandler.modules.has(parentName)) {
      throw new Error(`the parent command '${parentName}' doesn't exist from the command '${command.id}'.`);
    }

    // Now that we know the parent command exists, we'll import it.
    const parent: Command = this.commandHandler.modules.get(parentName)! as Command;

    // Next, we'll ensure that the parent command doesn't have arguments, as if
    // it does, then it'll be impossible to call a subcommand, as it will
    // instead be seen as an argument.
    if (parent.arguments) {
      throw new Error(`the parent command '${parent.id}' for '${command.id}' shouldn't support arguments.`);
    }

    // Next, we'll add this subcommand into the parent command's list of
    // subcommands, initializing a new list if one doesn't exist.

    // This property is in the form of an array consisting of tuples regarding
    // the ID and name of each subcommand. This setup is extremely useful as
    // this property is what we'll use when determining subcommands based off
    // of given arguments from a command.
    parent.subcommands = parent.subcommands ? [...parent.subcommands, [command.id, name]] : [[command.id, name]];

    command.subcommand = true;
  }

  /**
   * Initializes properties and starts the client.
   */
  public async start(): Promise<void> {
    // Set the inhibitor handler for the command handler to use, so the command
    // handler can emit certain events from the inhibitor handler.
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

    // Set the command handler to use the listener handler, so we can listen and
    // do something when a certain event is emitted.
    this.commandHandler.useListenerHandler(this.listenerHandler);

    // Set custom emitters for the listener handler.
    this.listenerHandler.setEmitters({ process: process, commandHandler: this.commandHandler, listenerHandler: this.listenerHandler });

    // Implements a custom argument type 'permission' for arguments, this
    // argument matches a valid permission name.
    this.commandHandler.resolver.addType('permission', isPermission);

    // Implements a custom argument type 'snowflake' for arguments, this
    // argument matches a valid 18 digit number.
    this.commandHandler.resolver.addType('snowflake', isSnowflake);

    // Implements a custom argument type 'emoji' for arguments, this argument
    // matches any default emoji.
    this.commandHandler.resolver.addType('defaultEmoji', isDefaultEmoji);

    // Read and load all modules.
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();

    //
    super.login(this.config.token);
  }
}
