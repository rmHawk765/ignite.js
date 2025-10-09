import { BaseComponentOptions } from "../../../index.js";

export interface EventListenerComponentData extends BaseComponentOptions {
  /**
   * Whether to run this listener only once.
   */
  once?: boolean;
}
