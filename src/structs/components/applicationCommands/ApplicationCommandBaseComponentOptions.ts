import type { Snowflake } from "discord.js";

export interface ApplicationCommandBaseComponentOptions {
  /**
   * Array of application command IDs to check in the event of a name mismatch.
   */
  commandIds?: Snowflake[];
  /**
   * Array of the IDs of guilds to register this command in. If this is not
   * provided, the command will be registered globally.
   */
  guildIds?: Snowflake[];
  /**
   * Whether to deregister or keep this command deregistered on the next client
   * login.
   */
  deregistered?: boolean;
}
