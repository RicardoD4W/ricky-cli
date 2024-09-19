import { spawn } from "child_process";
import path from "path";
import { __DIRNAME } from "../utils/path.js";
import { selectRemoteBranch, selectScript } from "./common-actions/prompts.js";
import { LANGUAGE_MAPPER } from "../utils/mapper.js";

export async function executeScripts() {
  let scriptSelected = await selectScript();
  let remoteBranch = await selectRemoteBranch();

  let extensionScript = scriptSelected.split(".").at(-1);

  const scriptPath = path.resolve(
    __DIRNAME,
    `../templates/scripts/${LANGUAGE_MAPPER[extensionScript]}/${scriptSelected}`
  );

  spawn(scriptPath, [remoteBranch], { shell: true });
}
