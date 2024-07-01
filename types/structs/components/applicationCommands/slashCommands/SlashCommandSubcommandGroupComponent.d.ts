import type { SlashCommandSubcommandGroupBuilder } from "discord.js";
import type { SlashCommandSubcommandComponent } from "../index.js";
export declare class SlashCommandSubcommandGroupComponent {
    readonly builder: SlashCommandSubcommandGroupBuilder;
    readonly subcomponents: SlashCommandSubcommandComponent[];
    constructor(builder: SlashCommandSubcommandGroupBuilder);
    addSubcomponents(...subcomponents: SlashCommandSubcommandComponent[]): void;
}
