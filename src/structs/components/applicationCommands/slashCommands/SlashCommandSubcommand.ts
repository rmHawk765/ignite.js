import type {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type SlashCommand from "./SlashCommand.js";
import SlashCommandSubcommandGroup from "./SlashCommandSubcommandGroup.js";

/**
 * Register a slash command subcommand and a function to be called when the
 * command is invoked.
 */
export default class SlashCommandSubcommand {
  readonly parentSlashCommand: SlashCommand | SlashCommandSubcommandGroup;
  readonly builder: SlashCommandSubcommandBuilder;
  readonly run: (interaction: ChatInputCommandInteraction) => unknown;

  constructor(
    parentSlashCommandOrGroup: SlashCommand | SlashCommandSubcommandGroup,
    builder: SlashCommandSubcommandBuilder,
    run: (interaction: ChatInputCommandInteraction) => unknown
  ) {
    this.parentSlashCommand = parentSlashCommandOrGroup;
    this.builder = builder;
    this.run = run;
  }
}
