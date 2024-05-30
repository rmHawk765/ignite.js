import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export class SlashCommandPluginComponent {
  builder:
    | ((builder: SlashCommandBuilder) => SlashCommandBuilder)
    | SlashCommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => unknown;

  /**
   *
   */
  constructor(
    builder:
      | ((builder: SlashCommandBuilder) => SlashCommandBuilder)
      | SlashCommandBuilder,
    run: (interaction: ChatInputCommandInteraction) => unknown
  ) {
    this.builder = builder;
    this.run = run;
  }
}
