import type {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  ApplicationCommandBaseComponent,
  ApplicationCommandBaseComponentOptions,
} from "../../../../index.js";
import { IgniteClient } from "../../../../index.js";

/**
 * Register a context menu command and a function to be called when the command
 * is invoked.
 */
export class ContextMenuCommandComponent extends ApplicationCommandBaseComponent {
  constructor(
    readonly builder: ContextMenuCommandBuilder,
    readonly run: (
      client: IgniteClient,
      interaction: ContextMenuCommandInteraction
    ) => unknown,
    readonly options: ApplicationCommandBaseComponentOptions
  ) {
    super(options);
  }
}
