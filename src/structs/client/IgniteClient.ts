import fs from "node:fs";
import path from "node:path";
import { Client, Events, SlashCommandSubcommandGroupBuilder } from "discord.js";
import type { IgniteClientOptions } from "./IgniteClientOptions";
import SlashCommand from "../components/applicationCommands/slashCommands/SlashCommand";
import SlashCommandSubcommand from "../components/applicationCommands/slashCommands/SlashCommandSubcommand";
import ContextMenuCommand from "../components/applicationCommands/contextMenuCommands/ContextMenuCommand";
import EventListener from "../components/eventListeners/EventListener";
import { ComponentType } from "../components/ComponentType";
import SlashCommandSubcommandGroup from "../components/applicationCommands/slashCommands/SlashCommandSubcommandGroup";

/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
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

    function getModulePaths(item: string) {
      const dirEntries = fs.readdirSync(item, { withFileTypes: true });

      for (const entry of dirEntries) {
        const entryPath = path.join(item, entry.name);

        if (entry.isDirectory()) {
          getModulePaths(entryPath);
        } else if (
          (entry.isFile() && path.extname(entry.name) === "js") ||
          path.extname(entry.name) === "mjs" ||
          path.extname(entry.name) === "ts"
        ) {
          modulePaths.push(entryPath);
        }
      }
    }

    getModulePaths(this.basePluginsDir);

    /*
    const dirEntries = fs
      .readdirSync(this.basePluginsDir, { recursive: true })
      .filter((item) => {
        if (item instanceof Buffer) {
          const newItems = fs.readdirSync(item);

          for (const newItem of newItems) {
            const isFile = fs.lstatSync(newItem).isFile();
            const isJSTSFile =
              path.extname(newItem) === ".js" ||
              path.extname(newItem) === ".mjs" ||
              path.extname(newItem) === ".ts";

            if (isJSTSFile && isFile) {
              return newItem;
            }
          }

          function destructure(item: string) {
            const isFile = fs.lstatSync(item).isFile();
            const isJSTSFile =
              path.extname(item) === ".js" ||
              path.extname(item) === ".mjs" ||
              path.extname(item) === ".ts";

            if (isJSTSFile && isFile) {
              return item;
            } else {
              destructure(item);
            }
          }

          for (const item of newItems) {
            try {
              destructure(item);
            } catch (error) {
              if (!(error instanceof RangeError)) throw error;

              console.warn(
                `Max recursion length possibly reached while loading plugins:\n${error}`
              );
            }
          }
        } else {
          const isFile = fs.lstatSync(item).isFile();
          const isJSTSFile =
            path.extname(item) === ".js" ||
            path.extname(item) === ".mjs" ||
            path.extname(item) === ".ts";

          if (isJSTSFile && isFile) {
            return item;
          }
        }
      });
      */

    for (const modulePath of modulePaths) {
      const module = await import(modulePath);

      for (const exported of module) {
        if (
          !(
            exported instanceof SlashCommand ||
            exported instanceof SlashCommandSubcommand ||
            exported instanceof ContextMenuCommand ||
            exported instanceof EventListener
          )
        )
          continue;

        this.components.push(exported);
      }
    }

    for (const component of this.components) {
      if (!(component instanceof EventListener)) continue;

      this.discordClient.on(component.event, component.run);
    }

    this.discordClient.on(Events.InteractionCreate, async (interaction) => {
      for (const component of this.components) {
        if (interaction.isCommand()) {
          if (
            !(
              component instanceof SlashCommand ||
              component instanceof SlashCommandSubcommand ||
              component instanceof ContextMenuCommand
            )
          )
            continue;

          if (interaction.commandName !== component.builder.name) continue;
        }

        if (interaction.isChatInputCommand()) {
          if (
            !(
              component instanceof SlashCommand ||
              component instanceof SlashCommandSubcommand
            )
          )
            continue;

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

        
      }
    });

    return this.discordClient.login(token);
  }
}
