import type { ClientOptions } from "discord.js";
import type winston from "winston";
/**
 * The options to be passed to {@link IgniteClient}.
 *
 * @extends ClientOptions
 * @property basePluginsDir - The base directory to search for plugins.
 * Ignite scans this directory recursively, allowing for custom organisation
 * into subfolders.
 */
export interface IgniteClientOptions extends ClientOptions, winston.LoggerOptions {
    basePluginsDir: string;
}
