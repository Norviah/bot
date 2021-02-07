/**
 * Represents an expression used to match links.
 */
export const link: RegExp = /((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+)/;

/**
 * Represents a regular expression used to match discord invites.
 */
export const invite: RegExp = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/;

/**
 * Matches a Snowflake/ID of an entity on Discord.
 */
export const snowflake: RegExp = /^[0-9]{18}$/;

/**
 * Matches a user's tag.
 */
export const tag: RegExp = /(.*#[0-9]{4})/g;

/**
 * Expressions used for command names.
 */
export const commands = {
  /**
   * Matches an ID of a subcommand.
   */
  subcommand: /^(\w+-)+\w+$/,

  /**
   * Matches the parentcommand for a subcommand,
   * NOTE: this regular expression matches an extra - at the end, and must be
   * removed manually.
   */
  parent: /^(\w+-)+/,

  /**
   * Matches the name of a command or a subcommand.
   */
  commandName: /(?!=-)\w+$/,

  /**
   * Used to determine if an argument is required.
   */
  required: /^<\w+>$/,
};
