import {
  ApplicationCommandBaseComponentOptions,
  BaseComponent,
} from "../../../index.js";

export class ApplicationCommandBaseComponent extends BaseComponent {
  constructor(readonly options: ApplicationCommandBaseComponentOptions) {
    super(options);
  }
}
