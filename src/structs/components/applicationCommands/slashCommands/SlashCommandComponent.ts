import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import {
  ApplicationCommandBaseComponent,
  ApplicationCommandBaseComponentOptions,
  IgniteClient,
  SlashCommandSubcomponentType,
} from "../../../index.js";

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
export class SlashCommandComponent extends ApplicationCommandBaseComponent {
  constructor(
    readonly builder: SlashCommandBuilder,
    readonly run: (
      client: IgniteClient,
      interaction: ChatInputCommandInteraction
    ) => unknown,
    readonly options: ApplicationCommandBaseComponentOptions,
    readonly subcomponents: SlashCommandSubcomponentType[] = []
  ) {
    super(options);
  }

  addComponents(...subcomponents: SlashCommandSubcomponentType[]) {
    for (const component of subcomponents) {
      this.subcomponents.push(component);
    }
  }
}
