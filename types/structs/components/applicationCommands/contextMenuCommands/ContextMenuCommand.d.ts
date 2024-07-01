import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from "discord.js";
import { ApplicationCommandBaseComponent, ApplicationCommandBaseComponentOptions } from "../index.js";
/**
 * Register a context menu command and a function to be called when the command
 * is invoked.
 */
export declare class ContextMenuCommandComponent extends ApplicationCommandBaseComponent {
    readonly builder: ContextMenuCommandBuilder;
    readonly run: (interaction: ContextMenuCommandInteraction) => unknown;
    constructor(builder: ContextMenuCommandBuilder, run: (interaction: ContextMenuCommandInteraction) => unknown, options?: ApplicationCommandBaseComponentOptions);
}
