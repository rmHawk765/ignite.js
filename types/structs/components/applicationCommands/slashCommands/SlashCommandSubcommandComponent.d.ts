import type { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { IgniteClient } from "../../../client/IgniteClient.js";
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
 *   async (client, interaction) => {
 *     await interaction.reply("Hello world!");
 *     return;
 *   }
 * );
 *
 * const mySubcommand = new SlashCommandSubcommandComponent(
 *   new SlashCommandSubcommandBuilder()
 *     .setName("scream")
 *     .setDescription("HELLO WORLD!"),
 *   async (client, interaction) => {
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
    readonly run: (client: IgniteClient, interaction: ChatInputCommandInteraction) => unknown;
    constructor(builder: SlashCommandSubcommandBuilder, run: (client: IgniteClient, interaction: ChatInputCommandInteraction) => unknown);
}
