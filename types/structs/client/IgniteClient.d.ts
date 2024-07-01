import { Client } from "discord.js";
import type { IgniteClientOptions } from "./IgniteClientOptions.js";
import type { ComponentType } from "../components/ComponentType.js";
import winston from "winston";
/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
 * @property logger - The {@link winston.Logger} used by this client.
 * @property components - The components registered to this client.
 */
export declare class IgniteClient {
    readonly discordClient: Client;
    readonly logger: winston.Logger;
    readonly basePluginsDir: string;
    readonly components: ComponentType[];
    constructor(options: IgniteClientOptions);
    login(token: string): Promise<void>;
}
