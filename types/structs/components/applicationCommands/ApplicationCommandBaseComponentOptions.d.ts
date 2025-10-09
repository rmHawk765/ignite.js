import type { Snowflake } from "discord.js";
import { BaseComponentOptions } from "../../../index.js";
export interface ApplicationCommandBaseComponentOptions extends BaseComponentOptions {
    /**
     * Array of application command IDs to check in the event of a name mismatch.
     * In most cases, you should not change this as it is automatically populated.
     */
    commandIds?: Snowflake[];
    /**
     * Array of the IDs of guilds to register this command in. If this is not
     * provided, the command will be registered globally.
     */
    guildIds?: Snowflake[];
    /**
     * Whether to **deregister** or keep this command deregistered on the next {@link IgniteClient.registerComponents} call.
     */
    deregistered?: boolean;
    /**
     * Whether to **undeploy** or keep this command undeployed on the next {@link IgniteClient.deployCommands} call.
     * login.
     * You may wish to keep certain command components registered for internal use but not deployed.
     */
    undeployed?: boolean;
}
