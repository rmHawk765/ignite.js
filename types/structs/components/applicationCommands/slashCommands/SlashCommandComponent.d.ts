import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ApplicationCommandBaseComponent, ApplicationCommandBaseComponentOptions, IgniteClient, SlashCommandSubcomponentType } from "../../../index.js";
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
 *   async (client, interaction) => {
 *     return interaction.reply("Hello world!");
 *   }
 * );
 * ```
 */
export declare class SlashCommandComponent extends ApplicationCommandBaseComponent {
    readonly builder: SlashCommandBuilder;
    readonly run: (client: IgniteClient, interaction: ChatInputCommandInteraction) => unknown;
    readonly options: ApplicationCommandBaseComponentOptions;
    readonly subcomponents: SlashCommandSubcomponentType[];
    constructor(builder: SlashCommandBuilder, run: (client: IgniteClient, interaction: ChatInputCommandInteraction) => unknown, options: ApplicationCommandBaseComponentOptions, subcomponents?: SlashCommandSubcomponentType[]);
    addComponents(...subcomponents: SlashCommandSubcomponentType[]): void;
}
