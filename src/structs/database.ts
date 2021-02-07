import { Guild, Snowflake } from 'discord.js';
import Enmap from 'enmap';

import { GuildConfig } from '../types/guildConfig';
import { GuildSettings } from '../types/guildSettings';
import { defaultGuildConfig } from '../config/guild';

import * as paths from '../util/paths';

export class Database extends Enmap<Snowflake, GuildConfig> {
  /**
   * The default config for guilds.
   */
  public defaults: GuildConfig = defaultGuildConfig;

  /**
   * Initializes a new Database instance.
   * @param name The name of the table to use within the database.
   * @param dir  Represents where to save the database on disk.
   */
  public constructor(public name: string, public dir: string = paths.database) {
    super({ name: name, dataDir: dir });
  }

  /**
   * Returns the given guild's entry within the database, ensuring that it has
   * an entry and returning what is found. If the given guild is null, the
   * default config values for guilds are returned instead.
   * @param  guild The guild to get the entry of.
   * @return       The entry for the given guild within the database.
   */
  public guild(guild: Guild | null): GuildConfig {
    return guild ? this.ensure(guild.id, this.defaults) : this.defaults;
  }

  /**
   * Ensures that the given guild has an entry within the database.
   * @param  guild The guild to set an entry for.
   * @return       The Database instance.
   */
  public assure(guild: Guild): Database {
    if (!this.has(guild.id)) {
      this.set(guild.id, this.defaults);
    }

    return this;
  }

  /**
   * A type safe implementation for setting values for a guild's settings.
   * @param  guild    The guild to edit.
   * @param  property The property to assign the value to.
   * @param  value    The value to set.
   * @return          The Database instance.
   */
  public settings<T extends GuildSettings, K extends keyof T>(guild: Guild, property: K, value: T[K]): Database {
    return this.assure(guild).set(guild.id, value, `settings.${property}`);
  }

  /**
   * A type safe implementation for setting values within a guild's config.
   * @param  guild    The guild to edit.
   * @param  property The property to assign the value to.
   * @param  value    The value to set.
   * @return          The Database instance.
   */
  public put<T extends Omit<GuildConfig, 'settings'>, K extends keyof T, V extends keyof T[K]>(guild: Guild, property: K, key: keyof T[K], value: T[K][V]): Database {
    return this.assure(guild).set(guild.id, value, `${property}.${key}`);
  }

  /**
   * Returns the value represented by the key within the given property.
   * @param  guild    The guild to get a value from.
   * @param  property The property to get the key from.
   * @param  key      The key to return.
   * @return          The value of the given key within the given property.
   */
  public getKey<T extends GuildConfig, K extends keyof T, V extends keyof T[K]>(guild: Guild | null, property: K, key: V): T[K][V] | undefined {
    return (this.guild(guild) as T)[property][key];
  }

  /**
   * Determines if the given key exists within the property for the given guild.
   * @param  guild    The guild to check.
   * @param  property The property to check from.
   * @param  key      The key to check.
   * @return          Representing if the key exists within the property.
   */
  public hasKey<T extends GuildConfig, K extends keyof T>(guild: Guild, property: K, key: string): boolean {
    return this.assure(guild).has(guild.id, `${property}.${key}`);
  }

  /**
   * Deletes the given key from an object within the given guild's entry.
   * @param  guild    The guild to remove the key from.
   * @param  property The property to delete the key from.
   * @param  key      The key to delete.
   * @return          The Database instance.
   */
  public deleteKey<K extends keyof Omit<GuildConfig, 'settings' | 'events'>>(guild: Guild, property: K, key: string): Database {
    return this.assure(guild).delete(guild.id, `${property}.${key}`);
  }
}
