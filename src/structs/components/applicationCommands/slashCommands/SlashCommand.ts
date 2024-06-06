import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

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
export default class SlashCommand {
  readonly builder: SlashCommandBuilder;
  readonly run: (interaction: ChatInputCommandInteraction) => unknown;

  constructor(
    builder: SlashCommandBuilder,
    run: (interaction: ChatInputCommandInteraction) => unknown
  ) {
    this.builder = builder;
    this.run = run;
  }
}
