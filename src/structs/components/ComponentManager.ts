import { Collection } from "discord.js";
import {
  IgniteClient,
  BaseComponent,
  ComponentType,
  BaseUsableComponentType,
} from "../../index.js";

export class ComponentManager<
  const componentType extends BaseUsableComponentType = BaseUsableComponentType,
> {
  constructor(
    readonly client: IgniteClient,
    readonly components: Collection<string, componentType> = new Collection()
  ) {}

  addComponents(...components: componentType[]) {
    for (const component of components) {
      this.components.set(component.options.id, component);
    }
  }

  removeComponent(id: string) {
    const logger = this.client.logger;
    const component = this.components.get(id);

    if (!component) {
      logger.error(
        `Component with ID ${id} not found when attempting to remove it.`
      );
      return;
    }
    if (component.options.pendingUse) {
      logger.error(
        `Component with ID ${id} is pending use and cannot be removed.`
      );
      return;
    }

    this.components.delete(id);
  }

  enableComponent(id: string) {
    const component = this.components.get(id);

    if (!component) {
      this.client.logger.error(
        `Component with ID ${id} not found when attempting to enable it.`
      );
      return;
    }

    component.options.enabled = true;
  }

  disableComponent(id: string) {
    const logger = this.client.logger;
    const component = this.components.get(id);

    if (!component) {
      logger.error(
        `Component with ID ${id} not found when attempting to disable it.`
      );
      return;
    }

    if (component.options.pendingUse) {
      logger.error(
        `Component with ID ${id} is pending use and cannot be disabled.`
      );
      return;
    }

    component.options.enabled = false;
  }
}
