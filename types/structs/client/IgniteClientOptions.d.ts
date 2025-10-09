import type { ClientOptions } from "discord.js";
import { LoggerOptions } from "winston";
/**
 * The options to be passed to {@link IgniteClient}.
 *
 * @extends ClientOptions
 * @extends LoggerOptions
 * @property basePluginsDir - The base directory to search for plugins.
 * Ignite scans this directory recursively, allowing for custom organisation
 * into subfolders.
 * @property apiTimeout - The timeout in seconds for awaiting API requests.
 * Defaults to 60 seconds (1 minute). If set to `0`, no timeout will be applied.
 */
export interface IgniteClientOptions extends ClientOptions, LoggerOptions {
    basePluginsDir: string;
    apiTimeout?: number;
}
