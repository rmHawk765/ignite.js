import type { SlashCommandSubcommandGroupBuilder } from "discord.js";
import type { SlashCommandSubcommandComponent } from "../index.js";

export class SlashCommandSubcommandGroupComponent {
  constructor(
    readonly builder: SlashCommandSubcommandGroupBuilder,
    readonly subcomponents: SlashCommandSubcommandComponent[] = []
  ) {}

  addSubcomponents(...subcomponents: SlashCommandSubcommandComponent[]) {
    for (const subcomponent of subcomponents) {
      this.subcomponents.push(subcomponent);
    }
  }
}
