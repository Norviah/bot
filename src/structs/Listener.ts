import { Module } from '@/structs/Module';

/**
 * The base structure for listeners.
 *
 * In node.js, listeners are pieces of code that are registered to be called
 * when a particular event occurs. When an event is emitted from an event
 * emitter, the bound piece of logic will be executed.
 *
 * For example, in discord.js, everything is essentially an event emitter. When
 * a message is sent, when someone joins a voice channel, etc. This structure
 * can be used to listen to specific events that are emitted from a specified
 * source.
 *
 * @see https://nodejs.org/api/events.html#events_class_eventemitter
 */
export abstract class Listener extends Module {
  /**
   * The name of the emitter that will emit the desired event.
   *
   * The value specified here must be the same string as the event emitter's
   * key when initializing a `ListenerHandler` instance.
   *
   * @example
   * Here, we'll initialize a new `ListenerHandler` instance within the client.
   * When initializing a new instance, we must pass in an object that contains
   * a list of event emitters to bind listeners to.
   *
   * ```ts
   * class Client {
   *   public listener = new ListenerHandler(
   *     this,
   *     {
   *       client: this,
   *     }
   *   );
   * }
   * ```
   *
   * In this example, we provide the `client` as an event emitter to register
   * within the listener handler. Then, when initializing a `Listener` instance,
   * we must assign `emitter` to the `"client"`, as this is the key that the
   * client is assigned to within the object.
   */
  public abstract readonly emitter: string;

  /**
   * The name of the event to listen to.
   *
   * This property defines the desired event that the listener will listen to,
   * and will be used to bind the listener to the event emitter.
   */
  public abstract readonly event: string;

  /**
   * The listener's name.
   *
   * A module's name is used to identify it within its handler, meaning that it
   * must be a unique string, however, multiple listeners can listen to an event
   * with the same name, but from different event emitters.
   *
   * To ensure that the name is unique, we'll use the combination of the
   * emitter and the event.
   */
  public get name(): string {
    return `${this.emitter}:${this.event}`;
  }

  /**
   * The type of listener.
   *
   * This property defines the relationship between the listener and the event,
   * representing whether the listener will be permanently bound to the event or
   * if it will be bound to only the next emitted event.
   *
   * If `on`, the listener is invoked *every* time the event is emitted. If
   * `once`, once the event is emitted, the listener is unbound from the
   * event and then invoked.
   *
   * @see https://nodejs.org/api/events.html#handling-events-only-once
   */
  public readonly type: 'on' | 'once' = 'on';

  /**
   * The listener's execution method.
   *
   * Once the desired event is emitted, this method will be called with any
   * parameters that the event also passes.
   *
   * @param args Arguments that were emitted with the event.
   */
  public abstract exec(...args: unknown[]): Promise<void>;
}
