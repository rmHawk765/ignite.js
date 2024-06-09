import type { ClientEvents, CommandInteraction, Interaction } from "discord.js";

export interface AllowedClientEvents extends ClientEvents {
  interactionCreate: [interaction: Exclude<Interaction, CommandInteraction>];
}
