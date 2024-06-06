import type { SlashCommandBuilder } from "discord.js";
import type { SlashCommandFunctionType } from "../decorators/slashCommands";

export class SlashCommandComponent {
  public readonly builder: SlashCommandBuilder;
  public readonly run: SlashCommandFunctionType;

  constructor(builder: SlashCommandBuilder, run: SlashCommandFunctionType) {
    this.builder = builder;
    this.run = run;
  }
}
