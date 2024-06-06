import type {
  SlashCommandSubcommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

export class SlashCommandSubcommandPluginComponent {
  readonly builder:
    | ((
        builder: SlashCommandSubcommandBuilder
      ) => SlashCommandSubcommandBuilder)
    | SlashCommandSubcommandBuilder;
  readonly run: (interaction: ChatInputCommandInteraction) => unknown;

  /**
   * Builder for slash command subcommand components.
   */
  constructor(
    builder:
      | ((
          builder: SlashCommandSubcommandBuilder
        ) => SlashCommandSubcommandBuilder)
      | SlashCommandSubcommandBuilder,
    run: (interaction: ChatInputCommandInteraction) => unknown
  ) {
    this.builder = builder;
    this.run = run;
  }
}
