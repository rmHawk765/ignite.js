import type {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  ApplicationCommandBaseComponent,
  ApplicationCommandBaseComponentOptions,
} from "../index.js";

/**
 * Register a context menu command and a function to be called when the command
 * is invoked.
 */
export class ContextMenuCommandComponent extends ApplicationCommandBaseComponent {
  readonly builder: ContextMenuCommandBuilder;
  readonly run: (interaction: ContextMenuCommandInteraction) => unknown;

  constructor(
    builder: ContextMenuCommandBuilder,
    run: (interaction: ContextMenuCommandInteraction) => unknown,
    options?: ApplicationCommandBaseComponentOptions
  ) {
    super(options);

    this.builder = builder;
    this.run = run;
  }
}
