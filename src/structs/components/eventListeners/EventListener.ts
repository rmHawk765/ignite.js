import { AllowedClientEvents } from "./Events.js";

/**
 * Register a function to be called on a specified event.
 *
 * @example - Listen to message delete events
 * ```
 * export const myEventListener = new EventListener(
 *   Events.MessageDelete,
 *   (message) => console.log(`A message was deleted: ${message}`)
 * );
 * ```
 *
 * @example - Button handler
 * ```
 * export const myButtonHandler = new EventListener(
 *   Events.InteractionCreate,
 *   async (interaction) => {
 *     if (!interaction.isButton()) return;
 *     if (interaction.customId !== 'myCustomId') return;
 *
 *     await interaction.reply(`Button pressed by ${interaction.user.displayName}!`);
 *   }
 *);
 *
 * ```
 *
 * **It is NOT recommended to listen to the `warn` and `debug` events as Ignite
 * handles errors internally by default.**
 */
export default class EventListener<Event extends keyof AllowedClientEvents> {
  readonly event: Event;
  readonly run: (...args: AllowedClientEvents[Event]) => unknown;

  constructor(
    event: Event,
    run: (...args: AllowedClientEvents[Event]) => unknown
  ) {
    this.event = event;
    this.run = run;
  }
}
