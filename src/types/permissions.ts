import { GuildConfig } from '../types/guildConfig';

/**
 * Represents the format of permissions for commands.
 */
export type Permissions = GuildConfig['permissions'][keyof GuildConfig['permissions']];
