import { ClientError, ErrorCodes } from '@/structs/ClientError';
import { Listener } from '@/structs/Listener';
import { Handler } from '@/structs/handlers/Handler';
import { logger } from '@/util/logger';

import type { Client } from '@/structs/Client';
import type EventEmitter from 'events';
import type { AbstractClass } from 'type-fest';

import * as paths from '@/util/paths';

export class ListenerHandler extends Handler<Listener> {
  /**
   * The base directory that contains the desired modules.
   *
   * When importing listeners, the handler will look in this directory for
   * listeners to import, recursively looking in subdirectories.
   */
  public readonly directory: string = paths.LISTENERS;

  /**
   * The reference to the abstract class that the handler manages.
   */
  public readonly reference: AbstractClass<Listener> = Listener;

  /**
   * The collection of event emitters to bind listeners to.
   *
   * When importing listeners, the handler will also bind the listener's to its
   * respective event emitter. This property represents the collection of event
   * emitters to look for.
   */
  public readonly emitters: Map<string, EventEmitter> = new Map();

  /**
   * Initializes a new `ListenerHandler` instance.
   *
   * @param client The client object.
   * @param emitters The collection of event emitters to bind listeners to.
   */
  public constructor(client: Client, emitters: Record<string, EventEmitter>) {
    super(client);

    for (const [name, emitter] of Object.entries(emitters)) {
      this.emitters.set(name, emitter);
    }

    this.registerAll();
  }

  /**
   * Registers a listener from the specified path.
   *
   * This method extends the base handler's method by binding the listener to
   * its respective event emitter once the listener has been initialized.
   *
   * @param path The path to register the listener from.
   * @returns The registered listener.
   */
  public register(path: string): Listener {
    // The logic for importing and initializing the listener is handled through
    // the parent class, which returns a reference to the just initialized
    // listener.

    // This method will additionally bind the listener to its respective event.
    const listener: Listener = super.register(path);

    // Once we have the initialized listener, we'll attempt to find the
    // listener's event emitter in the handler's collection.
    const emitter: EventEmitter | undefined = this.emitters.get(listener.emitter);

    if (!emitter) {
      throw new ClientError(ErrorCodes.UNKNOWN_EMITTER, { emitter: listener.emitter, listener: listener.name });
    }

    // If an emitter is found, we'll bind the listener's execution method to the
    // emitter. Note that when binding the listener, we must use the `bind`
    // method to keep the listener's `this` context.
    emitter[listener.type](listener.event, listener.exec.bind(listener));

    logger.debug(`binded listener \`${listener.name}\` to it's respective event`, { title: this.constructor.name });

    return listener;
  }
}
