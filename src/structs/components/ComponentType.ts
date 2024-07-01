import type {
  ContextMenuCommandComponent,
  SlashCommandComponent,
  SlashCommandSubcommandComponent,
  SlashCommandSubcommandGroupComponent,
} from "./applicationCommands/index.js";
import type { EventListenerComponent } from "./eventListeners/index.js";
import type { AllowedClientEvents } from "./eventListeners/Events.js";

export type ComponentType =
  | SlashCommandComponent
  | SlashCommandSubcommandComponent
  | SlashCommandSubcommandGroupComponent
  | ContextMenuCommandComponent
  | EventListenerComponent<keyof AllowedClientEvents>;

export type ApplicationCommandComponentType =
  | SlashCommandComponent
  | SlashCommandSubcommandComponent
  | SlashCommandSubcommandGroupComponent
  | ContextMenuCommandComponent;

export type SlashCommandSubcomponentType =
  | SlashCommandSubcommandComponent
  | SlashCommandSubcommandGroupComponent;
