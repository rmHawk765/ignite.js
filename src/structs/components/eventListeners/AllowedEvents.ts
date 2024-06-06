import { type ClientEvents, Events } from "discord.js";

export type AllowedEvents = Exclude<Events, Events.InteractionCreate>;

export type AllowedClientEvents = Omit<ClientEvents, "interactionCreate">;
