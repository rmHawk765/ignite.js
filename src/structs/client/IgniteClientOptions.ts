import type { IgniteClient } from "./IgniteClient.js";
import type { ClientOptions } from "discord.js";
import { LoggerOptions } from "winston";

/**
 * The options to be passed to {@link IgniteClient}.
 *
 * @extends ClientOptions
 * @extends LoggerOptions
 */
export interface IgniteClientOptions extends ClientOptions, LoggerOptions {}
