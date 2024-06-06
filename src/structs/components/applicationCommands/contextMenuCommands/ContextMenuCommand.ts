import type {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";

/**
 * Register a context menu command and a function to be called when the command
 * is invoked.
 */
export default class ContextMenuCommand {
  readonly builder: ContextMenuCommandBuilder;
  readonly run: (interaction: ContextMenuCommandInteraction) => unknown;

  constructor(
    builder: ContextMenuCommandBuilder,
    run: (interaction: ContextMenuCommandInteraction) => unknown
  ) {
    this.builder = builder;
    this.run = run;
  }
}
