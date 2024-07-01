import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ApplicationCommandBaseComponent, ApplicationCommandBaseComponentOptions } from "../index.js";
import { SlashCommandSubcomponentType } from "../../ComponentType.js";
/**
 * Register a slash command and a function to be called when the slash command
 * is invoked.
 *
 * @example
 * ```ts
 * export const mySlashCommand = new SlashCommand(
 *   new SlashCommandBuilder()
 *     .setName("hello-world")
 *     .setDescription("Replies with 'Hello world!'"),
 *   async (interaction) => {
 *     return interaction.reply("Hello world!");
 *   }
 * );
 * ```
 */
export declare class SlashCommandComponent extends ApplicationCommandBaseComponent {
    readonly builder: SlashCommandBuilder;
    readonly run: (interaction: ChatInputCommandInteraction) => unknown;
    readonly subcomponents: SlashCommandSubcomponentType[];
    constructor(builder: SlashCommandBuilder, run: (interaction: ChatInputCommandInteraction) => unknown, options?: ApplicationCommandBaseComponentOptions);
    addComponents(...subcomponents: SlashCommandSubcomponentType[]): void;
}
