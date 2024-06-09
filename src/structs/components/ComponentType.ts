import type ContextMenuCommand from "./applicationCommands/contextMenuCommands/ContextMenuCommand.js";
import type SlashCommand from "./applicationCommands/slashCommands/SlashCommand.js";
import type SlashCommandSubcommand from "./applicationCommands/slashCommands/SlashCommandSubcommand.js";
import type EventListener from "./eventListeners/EventListener.js";
import SlashCommandSubcommandGroup from "./applicationCommands/slashCommands/SlashCommandSubcommandGroup.js";
import { ClientEvents } from "discord.js";

export type ComponentType =
  | SlashCommand
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup
  | ContextMenuCommand
  | EventListener<keyof ClientEvents>;

export type ApplicationCommandComponentType =
  | SlashCommand
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup
  | ContextMenuCommand;
