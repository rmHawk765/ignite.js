import fs from "node:fs";
import path from "node:path";
import { Client, Events } from "discord.js";
import type { IgniteClientOptions } from "./IgniteClientOptions.js";
import SlashCommand from "../components/applicationCommands/slashCommands/SlashCommand.js";
import SlashCommandSubcommand from "../components/applicationCommands/slashCommands/SlashCommandSubcommand.js";
import ContextMenuCommand from "../components/applicationCommands/contextMenuCommands/ContextMenuCommand.js";
import EventListener from "../components/eventListeners/EventListener.js";
import { ComponentType } from "../components/ComponentType.js";
import SlashCommandSubcommandGroup from "../components/applicationCommands/slashCommands/SlashCommandSubcommandGroup.js";

/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
 * @property components - The components registered to this client.
 */
export class IgniteClient {
  readonly discordClient: Client;
  readonly basePluginsDir: string;
  readonly components: ComponentType[];

  constructor(options: IgniteClientOptions) {
    this.discordClient = new Client(options);
    this.basePluginsDir = options.basePluginsDir;
    this.components = [];
  }

  async login(token: string) {
    const modulePaths: string[] = [];

    const dirEntries = fs.readdirSync(this.basePluginsDir, {
      withFileTypes: true,
      recursive: true,
    });

    for (const dirEntry of dirEntries) {
      const entryPath = path.relative(
        this.basePluginsDir,
        path.join(dirEntry.parentPath, dirEntry.name)
      );

      if (
        dirEntry.isFile() &&
        (path.extname(dirEntry.name) === ".js" ||
          path.extname(dirEntry.name) === ".mjs" ||
          path.extname(dirEntry.name) === ".ts" ||
          path.extname(dirEntry.name) === ".mts")
      ) {
        modulePaths.push(entryPath);
      }
    }

    for (const modulePath of modulePaths) {
      const module = await import(modulePath);

      for (const exported of module) {
        if (
          !(
            exported instanceof SlashCommand ||
            exported instanceof ContextMenuCommand ||
            exported instanceof EventListener
          )
        )
          continue;

        this.components.push(exported);
      }
    }

    await new Promise((resolve) => {
      this.discordClient.once(Events.ClientReady, resolve);
    });

    for (const component of this.components) {
      if (!(component instanceof EventListener)) continue;
      if (component.event === Events.InteractionCreate) continue;

      this.discordClient.on(component.event, component.run);
    }

    this.discordClient.on(Events.InteractionCreate, (interaction) => {
      for (const component of this.components) {
        if (
          !interaction.isCommand() &&
          component instanceof EventListener &&
          component.event === Events.InteractionCreate
        ) {
          component.run(interaction);

          return;
        }

        if (
          interaction.isCommand() &&
          (component instanceof SlashCommand ||
            component instanceof ContextMenuCommand) &&
          interaction.commandName !== component.builder.name
        )
          continue;

        if (
          interaction.isChatInputCommand() &&
          (component instanceof SlashCommand ||
            component instanceof SlashCommandSubcommand)
        ) {
          const subcommandGroupName =
            interaction.options.getSubcommandGroup(false);
          const subcommandName = interaction.options.getSubcommand(false);

          if (subcommandName && component instanceof SlashCommandSubcommand) {
            if (subcommandName !== component.builder.name) continue;

            if (
              component.parentSlashCommand instanceof
                SlashCommandSubcommandGroup &&
              component.parentSlashCommand.builder.name !== subcommandGroupName
            )
              continue;

            component.run(interaction);

            return;
          }

          if (!(component instanceof SlashCommand)) continue;

          component.run(interaction);

          return;
        }

        if (interaction.isContextMenuCommand()) {
          if (!(component instanceof ContextMenuCommand)) continue;

          component.run(interaction);

          return;
        }
      }
    });

    return this.discordClient.login(token);
  }
}
