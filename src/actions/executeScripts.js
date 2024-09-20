import { spawn } from "child_process";
import path from "path";
import { __DIRNAME } from "../utils/path.js";
import { selectParameters, selectScript } from "./common-actions/prompts.js";
import { LANGUAGE_MAPPER } from "../utils/mapper.js";
import { scriptCompilerIsNotSupportedMsg } from "../views/errors.js";

export async function executeScripts() {
  let scriptSelected = await selectScript();
  let parameters = await selectParameters(scriptSelected);

  let extensionScript = scriptSelected.split(".").at(-1);

  const scriptPath = path.resolve(
    __DIRNAME,
    `../templates/scripts/${LANGUAGE_MAPPER[extensionScript]}/${scriptSelected}`
  );

  switch (extensionScript) {
    case "sh":
      spawn(scriptPath, [parameters], { shell: true });
      break;

    default:
      scriptCompilerIsNotSupportedMsg(extensionScript);
      break;
  }
}
