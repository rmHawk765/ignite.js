import type { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
/**
 * Register a slash command subcommand and a function to be called when the
 * command is invoked.
 *
 * @example
 * ```ts
 * export const mySlashCommand = new SlashCommand(
 *   new SlashCommandBuilder()
 *     .setName("hello-world")
 *     .setDescription("Replies with 'Hello world!'"),
 *   async (interaction) => {
 *     await interaction.reply("Hello world!");
 *     return;
 *   }
 * );
 *
 * const mySubcommand = new SlashCommandSubcommandComponent(
 *   new SlashCommandSubcommandBuilder()
 *     .setName("scream")
 *     .setDescription("HELLO WORLD!"),
 *   async (interaction) => {
 *     await interaction.reply("HELLO WORLD!");
 *     return;
 *    }
 * );
 *
 * mySlashCommand.addSubcomponents(mySubcommand);
 * ```
 */
export declare class SlashCommandSubcommandComponent {
    readonly builder: SlashCommandSubcommandBuilder;
    readonly run: (interaction: ChatInputCommandInteraction) => unknown;
    constructor(builder: SlashCommandSubcommandBuilder, run: (interaction: ChatInputCommandInteraction) => unknown);
}
