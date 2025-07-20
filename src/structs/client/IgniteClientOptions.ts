import type { IgniteClient } from "./IgniteClient.js";
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
 */
export interface IgniteClientOptions extends ClientOptions, LoggerOptions {
  basePluginsDir: string;
}
