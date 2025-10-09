import type { Logger } from "winston";
/**
 * Util function for dynamically import modules and retrieving components.
 * @param dir Base directory to search for components.
 * @param logger Optional `winston.Logger` instance for logging errors.
 * No errors are thrown if this is provided
 */
export declare function dynamicImport(dir: string, logger?: Logger): Promise<void>;
