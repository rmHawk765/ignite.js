import { ClientEvents } from "discord.js";
import type { AllowedClientEvents } from "./AllowedEvents";

/**
 * Register a function to be called on a specified event.
 *
 * @example
 * ```
 * export const myEventListener = new EventListener(
 *   Events.MessageDelete,
 *   (message) => console.log(`A message was deleted: ${message}`)
 * );
 * ```
 *
 * **Note that you CANNOT listen to the `interactionCreate` event. Use
 * interaction listeners instead.**
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
