import { microfrontendFrameworkNotSupportedMsg } from "../views/errors.js";
import {
  selectFramework,
  selectLanguaje,
  selectName,
} from "./common-actions/prompts.js";
import { createMicrofrontendLitComponent } from "./lit/createMicrofrontendLitComponent.js";

export async function createMicroFrontend() {
  let framework = await selectFramework();
  let componentName = await selectName();
  let ext = await selectLanguaje();

  switch (framework) {
    case "Lit":
      createMicrofrontendLitComponent(componentName, ext);
      break;

    default:
      microfrontendFrameworkNotSupportedMsg(framework);
      break;
  }
}
