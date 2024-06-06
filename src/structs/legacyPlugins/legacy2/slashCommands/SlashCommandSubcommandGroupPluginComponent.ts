import {
  normalizeArray,
  type RestOrArray,
  type SlashCommandSubcommandGroupBuilder,
} from "discord.js";
import type { SlashCommandSubcommandPluginComponent } from "./SlashCommandSubcommandPluginComponent";

export class SlashCommandSubcommandGroupPluginComponent {
  readonly builder:
    | ((
        builder: SlashCommandSubcommandGroupBuilder
      ) => SlashCommandSubcommandGroupBuilder)
    | SlashCommandSubcommandGroupBuilder;
  readonly subcommands: SlashCommandSubcommandPluginComponent[];

  /**
   * Builder for slash command components.
   */
  constructor(
    builder:
      | ((
          builder: SlashCommandSubcommandGroupBuilder
        ) => SlashCommandSubcommandGroupBuilder)
      | SlashCommandSubcommandGroupBuilder,
    subcommands: RestOrArray<SlashCommandSubcommandPluginComponent>
  ) {
    this.builder = builder;
    this.subcommands = normalizeArray(subcommands);
  }
}
