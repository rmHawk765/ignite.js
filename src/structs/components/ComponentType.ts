import type ContextMenuCommand from "./applicationCommands/contextMenuCommands/ContextMenuCommand";
import type SlashCommand from "./applicationCommands/slashCommands/SlashCommand";
import type SlashCommandSubcommand from "./applicationCommands/slashCommands/SlashCommandSubcommand";
import type EventListener from "./eventListeners/EventListener";
import type { AllowedClientEvents } from "./eventListeners/AllowedEvents";
import SlashCommandSubcommandGroup from "./applicationCommands/slashCommands/SlashCommandSubcommandGroup";

export type ComponentType =
  | SlashCommand
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup
  | ContextMenuCommand
  | EventListener<keyof AllowedClientEvents>;

export type ApplicationCommandComponentType =
  | SlashCommand
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup
  | ContextMenuCommand;
