import { invalidGitBranchInput } from "../../views/errors.js";

export function validateExtensionFromFramework({ framework, ext }) {
  const extensionFromFramework =
    {
      "React": ext + "x",
    } || ext;

  return extensionFromFramework[framework] || ext;
}

export function validateAllowScripts() {
  const allowedScripts = ["getAllGitBranches.sh", "removeAllGitBranches.sh"];

  return allowedScripts;
}

export function validateAllowLanguages() {
  const allowedScripts = ["TypeScript", "JavaScript"];

  return allowedScripts;
}

export function validateAllowFrameworks() {
  const allowedScripts = ["Lit", "React"];

  return allowedScripts;
}

export function validateBashParamInput(input) {
  const branchRegex = /^[a-zA-Z0-9_\-\/]+$/;
  if (!branchRegex.test(input)) {
    invalidGitBranchInput(input);
  }
}
