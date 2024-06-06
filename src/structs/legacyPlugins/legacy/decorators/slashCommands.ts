import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type { Plugin } from "../../Plugin";

export type SlashCommandFunctionType = (
  interaction: ChatInputCommandInteraction
) => unknown;

export type DecoratedSlashCommandFunction = (
  interaction: ChatInputCommandInteraction
) => unknown;

export function slashCommand(builder: SlashCommandBuilder) {
  return function slashCommandDecorator(
    originalMethod: SlashCommandFunctionType,
    context: ClassMethodDecoratorContext<Plugin, SlashCommandFunctionType>
  ) {
    return function replacementMethod(
      this: Plugin,
      interaction: ChatInputCommandInteraction
    ): any {};
  };
}

export function slashCommandSubcommand(
  parentSlashCommand: SlashCommandFunctionType,
  builder: SlashCommandSubcommandBuilder
) {
  return function subCommandDecorator(
    originalMethod: SlashCommandFunctionType,
    context: ClassMethodDecoratorContext<Plugin, SlashCommandFunctionType>
  ) {
    context.addInitializer(function () {
      const slashCommand;

      this["slashCommands"].push();
    });

    return function replacementMethod(
      this: Plugin,
      interaction: ChatInputCommandInteraction
    ) {};
  };
}

class test {
  @slashCommand(new SlashCommandBuilder())
  async parentTest(interaction: ChatInputCommandInteraction) {}

  @slashCommandSubcommand(
    test.prototype.parentTest,
    new SlashCommandSubcommandBuilder()
  )
  async test(interaction: ChatInputCommandInteraction) {}
}
