import { Message, TextChannel } from 'discord.js';
import { Listener as Base } from 'discord-akairo';

import { Client } from './client';
import { logger } from './logger';
import { ListenerOptions } from '../types/listenerOptions';

export abstract class Listener extends Base {
  /**
   * Listeners have access to the client instance that was initialized and being
   * used, but, the type of the client property is the base Akairo client. As we
   * have a custom client instance, we'll have to type cast it for TypeScript.
   */
  public client: Client = this.client as Client;

  /**
   * The logging system.
   */
  public logger: typeof logger = logger;

  /**
   * Initializes a new Listener instance.
   * @param id      The ID of the listener.
   * @param options Optional options for the listener.
   */
  public constructor(options: ListenerOptions) {
    super(options.id ?? options.event, { category: options.emitter, ...options });
  }

  /**
   * Returns a string representation of the author of the given message,
   * specifically the author's tag and ID.
   * @param  message The message.
   * @return         A string representing the author's tag and ID.
   */
  public author(message: Message): string {
    return `${message.author.tag} [${message.author.id}]`;
  }

  /**
   * Returns a string representing where the given message was sent.
   * @param  message The message.
   * @return         A string referencing where the message was sent.
   */
  public location(message: Message): string {
    return message.guild ? `${message.guild.name}#${(message.channel! as TextChannel).name} [${message.guild.id}]` : 'DMs';
  }
}
