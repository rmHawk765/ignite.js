import type { SlashCommandSubcommandGroupBuilder } from "discord.js";
import type { SlashCommandSubcommandComponent } from "../index.js";

export class SlashCommandSubcommandGroupComponent {
  readonly builder: SlashCommandSubcommandGroupBuilder;
  readonly subcomponents: SlashCommandSubcommandComponent[];

  constructor(builder: SlashCommandSubcommandGroupBuilder) {
    this.builder = builder;
    this.subcomponents = [];
  }

  addSubcomponents(...subcomponents: SlashCommandSubcommandComponent[]) {
    for (const subcomponent of subcomponents) {
      this.subcomponents.push(subcomponent);
    }
  }
}
