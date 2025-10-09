import { Collection } from "discord.js";
import { IgniteClient, BaseUsableComponentType } from "../../index.js";
export declare class ComponentManager<const componentType extends BaseUsableComponentType = BaseUsableComponentType> {
    readonly client: IgniteClient;
    readonly components: Collection<string, componentType>;
    constructor(client: IgniteClient, components?: Collection<string, componentType>);
    addComponents(...components: componentType[]): void;
    removeComponent(id: string): void;
    enableComponent(id: string): void;
    disableComponent(id: string): void;
}
