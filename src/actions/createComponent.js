import { createComponentFiles } from "./common-actions/execute.js";
import {
  selectFramework,
  selectLanguaje,
  selectName,
  selectOptions,
} from "./common-actions/prompts.js";

export async function createComponent() {
  let framework = await selectFramework();
  let componentName = await selectName();
  let ext = await selectLanguaje();
  let additionalOptions = await selectOptions({ framework });

  await createComponentFiles({
    framework,
    componentName,
    ext,
    additionalOptions,
  });
}
