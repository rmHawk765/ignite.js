import { Client } from "discord.js";
import { type Logger } from "winston";
import { ComponentType, IgniteClientOptions, ComponentManager } from "../../index.js";
/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
 * @property logger - The {@link winston.Logger} used by this client.
 * @property components - The components registered to this client.
 */
export declare class IgniteClient {
    private _discordClient?;
    get discordClient(): Client | undefined;
    readonly logger: Logger;
    readonly basePluginsDir: string;
    readonly components: ComponentType[];
    readonly componentManager: ComponentManager;
    private readonly rawOptions;
    constructor(options: IgniteClientOptions);
    /**
     * Logs in to Discord and ensures the client is ready.
     * @param token - The bot token to log in with.
     */
    login(token: string): Promise<void>;
    /**
     * Registers all components in the basePluginsDir.
     */
    registerComponents(): Promise<void>;
    /**
     * Deploys all registered commands to Discord.
     * @throws Error if you have not called {@link IgniteClient.login} first.
     */
    deployCommands(): Promise<void>;
    /**
     * Logs in to Discord, registers all components and deploys all commands.
     * For finer control, use the specific methods.
     *
     * @param token - The bot token to log in with.
     */
    expressInit(token: string): Promise<void>;
}
