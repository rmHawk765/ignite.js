import { APIApplicationCommand, Client, Events } from "discord.js";
import { type Logger, format, createLogger, transports } from "winston";

import {
  ApplicationCommandBaseComponent,
  SlashCommandComponent,
  SlashCommandSubcommandComponent,
  ContextMenuCommandComponent,
  SlashCommandSubcommandGroupComponent,
  EventListenerComponent,
  ComponentType,
  IgniteClientOptions,
  ComponentManager,
} from "../../index.js";

/**
 * The base Ignite client class.
 *
 * @property discordClient - The discord.js {@link Client} object.
 * @property logger - The {@link winston.Logger} used by this client.
 * @property components - The components registered to this client.
 */
export class IgniteClient {
  private _discordClient?: Client;
  public get discordClient(): Client | undefined {
    return this._discordClient;
  }
  readonly logger: Logger;
  readonly components: ComponentType[];
  readonly componentManager: ComponentManager = new ComponentManager(this);
  private readonly rawOptions: IgniteClientOptions;

  constructor(options: IgniteClientOptions) {
    const loggerFormat =
      options.format ??
      format.printf(({ level, message, tag }) => {
        return `Ignite (${tag ?? "bot user N/A"}) (${level}): ${message} `;
      });
    this.logger = createLogger({
      ...options,
      format: loggerFormat,
      transports: options.transports ?? new transports.Console(),
    });
    const logger = this.logger;

    this.components = [];
    this.rawOptions = options;
  }

  /**
   * Logs in to Discord and ensures the client is ready.
   * @param token - The bot token to log in with.
   */
  async login(token: string) {
    this._discordClient = new Client(this.rawOptions);
    const client = this._discordClient;
    const logger = this.logger;

    await client.login(token);
    logger.info("Logged into Discord");

    await new Promise((resolve) => {
      client.once(Events.ClientReady, resolve);
    });

    // Client will always be ready after the above
    if (!client.isReady()) return;
  }

  /**
   * Registers all components added to the ComponentManager.
   */
  registerComponents() {
    const components = this.componentManager.components;
    const componentsEntries = components.entries();
    const logger = this.logger;
    const client = this.discordClient;
    if (!client) {
      logger.error(
        "Cannot register components, client is not ready. Have you called `login`?"
      );
      return;
    }

    for (const [id, component] of componentsEntries) {
      if (component.options.enabled === false) {
        logger.debug(
          `Component at:\n${component}\nis disabled, skipping registration.`,
          { tag: client.user?.tag }
        );
        continue;
      }
    }

    // Register non-interactionCreate event listeners
    for (const [id, component] of componentsEntries) {
      if (!(component instanceof EventListenerComponent)) continue;
      if (component.event === Events.InteractionCreate) continue;

      client.on(component.event, (...args) => component.run(this, ...args));
      logger.verbose(
        `Registered event listener for:\n${component.event}\nComponent ID: ${id}`,
        { tag: client.user?.tag }
      );
    }

    // Run interactionCreate listeners and handle commands
    client.on(Events.InteractionCreate, (interaction) => {
      for (const [id, component] of components.entries()) {
        if (component.options.enabled === false) {
          logger.debug(
            `Component with ID ${id} is disabled, skipping run.\nInteraction: ${interaction.toJSON()}`,
            { tag: client.user?.tag }
          );
          continue;
        }

        if (
          !interaction.isCommand() &&
          component instanceof EventListenerComponent &&
          component.event === Events.InteractionCreate
        ) {
          component.options.pendingUse = true;
          try {
            component.run(this, interaction);
          } catch (error) {
            logger.error(
              `Error when running non-command InteractionCreate listener\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}\nError: ${error}`,
              { tag: client.user?.tag }
            );
          }
          logger.silly(
            `Ran generic InteractionCreate listener\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}`,
            { tag: client.user?.tag }
          );

          component.options.pendingUse = false;
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
            component.options.pendingUse = true;
            try {
              component.run(this, interaction);
            } catch (error) {
              logger.error(
                `Error when running command\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}\nError: ${error}`,
                { tag: client.user?.tag }
              );
            }
            logger.silly(
              `Ran command\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}`,
              { tag: client.user?.tag }
            );

            component.options.pendingUse = false;
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

            if (subcomponent instanceof SlashCommandSubcommandGroupComponent) {
              if (subcomponent.builder.name !== subcommandGroupName) continue;

              for (const subcommandSubcomponent of subcomponent.subcomponents) {
                if (subcommandSubcomponent.builder.name !== subcommandName)
                  continue;

                component.options.pendingUse = true;
                try {
                  subcommandSubcomponent.run(this, interaction);
                } catch (error) {
                  logger.error(
                    `Error when running subcommand in group\nMaster component ID: ${id}\nInteraction: ${interaction.toJSON()}\nError: ${error}`,
                    { tag: client.user?.tag }
                  );
                }

                logger.silly(
                  `Ran subcommand in group\nMaster component ID: ${id}\nInteraction: ${interaction.toJSON()}`,
                  { tag: client.user?.tag }
                );

                component.options.pendingUse = false;
                return;
              }
            } else {
              if (subcomponent.builder.name !== subcommandName) continue;

              component.options.pendingUse = true;
              try {
                subcomponent.run(this, interaction);
              } catch (error) {
                logger.error(
                  `Error when running subcommand\nMaster component ID: ${id}\nInteraction: ${interaction.toJSON()}\nError: ${error}`,
                  { tag: client.user?.tag }
                );
              }
              logger.silly(
                `Ran subcommand\nMaster component ID: ${id}\nInteraction: ${interaction.toJSON()}`,
                { tag: client.user?.tag }
              );

              component.options.pendingUse = false;
              return;
            }
          }
        }

        if (interaction.isContextMenuCommand()) {
          if (!(component instanceof ContextMenuCommandComponent)) continue;

          component.options.pendingUse = true;
          try {
            component.run(this, interaction);
          } catch (error) {
            logger.error(
              `Error when running context menu command\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}\nError: ${error}`,
              { tag: client.user?.tag }
            );
          }
          logger.silly(
            `Ran context menu command\nComponent ID: ${id}\nInteraction: ${interaction.toJSON()}`,
            { tag: client.user?.tag }
          );

          component.options.pendingUse = false;
          return;
        }
      }
    });

    logger.info("Registered all components", { tag: client.user?.tag });
  }

  /**
   * Deploys all registered commands to Discord.
   * @throws Error if you have not called {@link IgniteClient.login} first.
   */
  async deployCommands() {
    const logger = this.logger;
    const client = this.discordClient;
    const componentsEntries = this.componentManager.components.entries();
    if (!client) {
      logger.error(
        "Cannot deploy commands, client is not ready. Have you called `login`?"
      );
      return;
    }

    if (!client.isReady()) {
      logger.error(
        "Cannot deploy commands, client is not ready. Have you called `login`?",
        { tag: client.user?.tag }
      );
      return;
    }

    const commands = client.application.commands;

    await commands.fetch().catch((error) => {
      logger.error(`Failed to fetch application commands:\n${error}`, {
        tag: client.user?.tag,
      });
      return;
    });

    // Finalise & deploy application commands
    for (const [id, component] of componentsEntries) {
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

      if (component.options.commandIds) {
        for (const id of component.options.commandIds) {
          const command = commands.cache.get(id); // avoids unnecessary API calls
          /** 
          const comparableCommand = Object.keys(oldCommand).reduce<
            Record<string, any>
          >((acc, key) => {
            const deployedCommandKeys = Object.keys(command?.toJSON() ?? {});
            if (deployedCommandKeys.includes(key)) {
              acc[key] = oldCommand[key];
            }
            return acc;
          }, {});
          */
          if (
            !command?.equals(
              // The cast is necessary here as deployed commands have extra
              // properties which are not relevant for this comparison
              component.builder.toJSON() as APIApplicationCommand
            )
          ) {
            if (component.options.undeployed) {
              await command?.delete().catch((error) => {
                logger.error(
                  `Failed to delete command:\n${command?.toJSON()}\nComponent ID: ${id}\nError: ${error}`,
                  { tag: client.user?.tag }
                );
              });

              logger.debug(
                `Component with ID ${id} is marked for undeployment, undeployed command with ID ${id}.`,
                { tag: client.user?.tag }
              );
              continue;
            }

            await command?.edit(fullCommandData).catch((error) => {
              logger.error(
                `Failed to edit command. Existing command:\n${command?.toJSON()}\nNew command data:\n${fullCommandData.toJSON()}\nError: ${error}`,
                { tag: client.user?.tag }
              );
            });

            logger.debug(
              `Component at:\n${component}\nis marked for undeployment, undeployed command with ID ${id}.`,
              { tag: client.user?.tag }
            );
          }
        }
      } else {
        const result = await commands.create(fullCommandData).catch((error) => {
          logger.error(
            `Failed to create command. Command data:\n${fullCommandData.toJSON()}\nError: ${error}`,
            { tag: client.user?.tag }
          );
        });
        if (!result) return;

        if (!component.options.commandIds) {
          component.options.commandIds = [];
        }
        component.options.commandIds.push(result.id);
        logger.info(
          `Deployed new command with ID ${result.id}. Add this ID to the commandIds array under component.options.`,
          { tag: client.user?.tag }
        );
      }
    }

    logger.info("Deployed all application commands", { tag: client.user?.tag });
  }

  /**
   * Logs in to Discord, registers all components and deploys all commands.
   * For finer control, use the specific methods.
   *
   * @param token - The bot token to log in with.
   */
  async expressInit(token: string) {
    await this.login(token);
    await this.registerComponents();
    await this.deployCommands();
  }

  /**
   * Gracefully destroys the client by waiting for interactions to finish.
   * This is a crap implementation, I know, but icba to do a proper emitter
   * based one for now.
   * @param force Force destroy without waiting
   */
  async destroy(force?: boolean) {
    const client = this.discordClient;
    const components = this.componentManager.components.map((value) => value);
    const logger = this.logger;

    if (!client) {
      logger.error(
        "Cannot destroy, client is not ready. Have you called `login`?"
      );
      return;
    }
    if (!force) {
      while (true) {
        const anyPending = components.some(
          (component) => component.options.pendingUse
        );
        if (!anyPending || force) break;

        logger.info(`Waiting for interactions to finish...`);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    await this.discordClient?.destroy();
  }
}
