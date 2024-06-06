import { SlashCommandSubcommandGroupBuilder } from "discord.js";
import SlashCommand from "./SlashCommand";

export default class SlashCommandSubcommandGroup {
  readonly parentSlashCommand: SlashCommand;
  readonly builder: SlashCommandSubcommandGroupBuilder;

  constructor(
    parentSlashCommand: SlashCommand,
    builder: SlashCommandSubcommandGroupBuilder
  ) {
    this.parentSlashCommand = parentSlashCommand;
    this.builder = builder;
  }
}
