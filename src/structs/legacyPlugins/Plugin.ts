import type { PluginComponent } from "./legacy2/PluginComponent";
import { SlashCommandPluginComponent } from "./legacy2/slashCommands/SlashCommandPluginComponent";

/**
 * Base class for Ignite plugins.
 *
 * @since v0.1.0
 */
export class Plugin {
  public readonly slashCommands: PluginComponent[];

  /**
   * Base class for Ignite plugins.
   *
   * @since v0.1.0
   */
  public constructor() {
    this.slashCommands = [];
  }

  /**
   * Adds components to this Plugin.
   */
  public addComponents(components: PluginComponent[]) {
    for (const component of components) {
      if (component instanceof SlashCommandPluginComponent) {
        this.slashCommands.push(component);
      }
    }
  }
}
