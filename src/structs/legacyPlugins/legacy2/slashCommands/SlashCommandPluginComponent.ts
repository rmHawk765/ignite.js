import {
  normalizeArray,
  type ChatInputCommandInteraction,
  type RestOrArray,
  type SlashCommandBuilder,
} from "discord.js";
import { SlashCommandSubcommandPluginComponent } from "./SlashCommandSubcommandPluginComponent";

export class SlashCommandPluginComponent {
  readonly builder:
    | ((builder: SlashCommandBuilder) => SlashCommandBuilder)
    | SlashCommandBuilder;
  readonly run: (interaction: ChatInputCommandInteraction) => unknown;
  readonly subcommands: SlashCommandSubcommandPluginComponent[];

  /**
   * Builder for slash command components.
   */
  constructor(
    builder:
      | ((builder: SlashCommandBuilder) => SlashCommandBuilder)
      | SlashCommandBuilder,
    run: (interaction: ChatInputCommandInteraction) => unknown
  ) {
    this.builder = builder;
    this.run = run;
    this.subcommands = [];
  }

  /**
   * Add subcommands to this component.
   */
  public addSubcommands(
    subcommands: RestOrArray<SlashCommandSubcommandPluginComponent>
  ) {
    const normalisedSubcommands = normalizeArray(subcommands);

    for (const subcommand of normalisedSubcommands) {
      this.subcommands.push(subcommand);
    }

    return this;
  }
}
