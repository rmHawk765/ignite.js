import fs from "node:fs";
import path from "node:path";
import { ApplicationCommandData, Client, Events } from "discord.js";
import type { IgniteClientOptions } from "./IgniteClientOptions.js";
import {
  ApplicationCommandBaseComponent,
  SlashCommandComponent,
  SlashCommandSubcommandComponent,
  ContextMenuCommandComponent,
  SlashCommandSubcommandGroupComponent,
} from "../components/applicationCommands/index.js";
import { EventListenerComponent } from "../components/eventListeners/index.js";
import type { ComponentType } from "../components/ComponentType.js";
import winston from "winston";
import { dir } from "node:console";
import { pathToFileURL } from "node:url";

/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
 * @property logger - The {@link winston.Logger} used by this client.
 * @property components - The components registered to this client.
 */
export class IgniteClient {
  readonly discordClient: Client;
  readonly logger: winston.Logger;
  readonly basePluginsDir: string;
  readonly components: ComponentType[];

  constructor(options: IgniteClientOptions) {
    this.discordClient = new Client(options);

    const loggerFormat =
      options.format ??
      winston.format.printf(({ level, message }) => {
        return `Ignite (${level}): ${message} `;
      });
    this.logger = winston.createLogger({
      ...options,
      format: loggerFormat,
      transports: [new winston.transports.Console()],
    });

    this.basePluginsDir = path.resolve(options.basePluginsDir);
    this.components = [];
  }

  async login(token: string) {
    // Load all components
    const moduleUrls: string[] = [];

    {
      const dirEntries = fs.readdirSync(this.basePluginsDir, {
        withFileTypes: true,
        recursive: true,
      });

      for (const dirEntry of dirEntries) {
        const entryAbsolutePath = path.resolve(
          dirEntry.parentPath,
          dirEntry.name
        );

        if (
          dirEntry.isFile() &&
          [".js", ".ts", ".mjs", ".mts"].includes(path.extname(dirEntry.name))
        ) {
          const moduleUrl = pathToFileURL(entryAbsolutePath).href;
          moduleUrls.push(moduleUrl);
        }
      }

      for (const modulePath of moduleUrls) {
        const logger = this.logger;
        async function safeImportModule(): Promise<any> {
          try {
            return await import(modulePath);
          } catch (error) {
            logger.error(
              `Failed to import module at:\n${modulePath}\nError: ${error}`
            );
          }
        }
        const module: any = await safeImportModule();
        if (!module) continue;

        const allExports = Object.values(module);

        for (const exported of allExports) {
          if (
            !(
              exported instanceof SlashCommandComponent ||
              exported instanceof ContextMenuCommandComponent ||
              exported instanceof EventListenerComponent
            )
          )
            continue;

          this.components.push(exported);

          this.logger.debug(`Registered component:\n${exported}`);
        }
      }

      this.logger.info("Registered all components");

      // Register non-interactionCreate event listeners
      for (const component of this.components) {
        if (!(component instanceof EventListenerComponent)) continue;
        if (component.event === Events.InteractionCreate) continue;

        this.discordClient.on(component.event, component.run);
      }

      // Run interactionCreate listeners and handle commands
      this.discordClient.on(Events.InteractionCreate, (interaction) => {
        for (const component of this.components) {
          if (
            !interaction.isCommand() &&
            component instanceof EventListenerComponent &&
            component.event === Events.InteractionCreate
          ) {
            component.run(interaction);

            return;
          }

          if (
            interaction.isCommand() &&
            (component instanceof SlashCommandComponent ||
              component instanceof ContextMenuCommandComponent) &&
            interaction.commandName !== component.builder.name
          )
            continue;

          if (
            interaction.isChatInputCommand() &&
            !(component instanceof SlashCommandComponent)
          )
            continue;

          if (
            interaction.isContextMenuCommand() &&
            !(component instanceof ContextMenuCommandComponent)
          )
            continue;

          if (
            interaction.isChatInputCommand() &&
            component instanceof SlashCommandComponent
          ) {
            const subcommandGroupName =
              interaction.options.getSubcommandGroup(false);
            const subcommandName = interaction.options.getSubcommand(false);

            if (!subcommandName) {
              component.run(interaction);

              return;
            }

            for (const subcomponent of component.subcomponents) {
              if (
                !(
                  subcomponent instanceof SlashCommandSubcommandComponent ||
                  subcomponent instanceof SlashCommandSubcommandGroupComponent
                )
              )
                continue;

              if (
                subcomponent instanceof SlashCommandSubcommandGroupComponent
              ) {
                if (subcomponent.builder.name !== subcommandGroupName) continue;

                for (const subcommand of subcomponent.subcomponents) {
                  if (subcommand.builder.name !== subcommandName) continue;

                  subcommand.run(interaction);

                  return;
                }
              } else {
                if (subcomponent.builder.name !== subcommandName) continue;

                subcomponent.run(interaction);

                return;
              }
            }
          }

          if (interaction.isContextMenuCommand()) {
            if (!(component instanceof ContextMenuCommandComponent)) continue;

            component.run(interaction);

            return;
          }
        }
      });

      // Prep for command registration
      await this.discordClient.login(token);
      await new Promise((resolve) => {
        this.discordClient.once(Events.ClientReady, resolve);
      });

      if (!this.discordClient.isReady()) return;

      // Register application commands
      const commands = await this.discordClient.application.commands.fetch();

      const commandManager = this.discordClient.application.commands;

      for (const component of this.components) {
        if (!(component instanceof ApplicationCommandBaseComponent)) continue;

        const fullCommandData = (() => {
          if (component instanceof ContextMenuCommandComponent) {
            return component.builder;
          }

          for (const subcomponent of component.subcomponents) {
            if (subcomponent instanceof SlashCommandSubcommandComponent) {
              component.builder.addSubcommand(subcomponent.builder);
            } else {
              component.builder.addSubcommandGroup(subcomponent.builder);
            }
          }

          return component.builder;
        })();

        if (component.options?.commandIds) {
          for (const id of component.options.commandIds) {
            const command = commands.get(id);

            if (
              !command?.equals(
                // The cast is necessary here as otherwise you get a stupid error
                // about a single missing property which is only available
                // for the 'education guilds'
                // TODO: though I do want a proper fix for this
                component.builder.toJSON() as ApplicationCommandData
              )
            ) {
              await commands.get(id)?.edit(fullCommandData);
            }
          }
        } else {
          await commandManager.create(fullCommandData);
        }
      }

      this.logger.info("Deployed all application commands");
    }
  }
}
