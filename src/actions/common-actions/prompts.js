import inquirer from "inquirer";
import { LANGUAGE_MAPPER } from "../../utils/mapper.js";

export async function selectOptions({ framework }) {
  let dirChoices = [];

  if (framework === "React") {
    dirChoices.push("shared", "templates", "service");
  }

  if (framework === "Lit") {
    dirChoices.push(
      "model",
      "event",
      "components",
      "shared",
      "templates",
      "service"
    );
  }

  const { selectedOptions } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedOptions",
      message: "Choose additional options:",
      choices: dirChoices,
    },
  ]);
  return selectedOptions;
}

export async function selectName() {
  let componentName = "";

  while (componentName.trim() === "") {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the component name:",
        validate: function (input) {
          if (input.trim() === "") {
            return "Component name cannot be empty.";
          }
          return true;
        },
      },
    ]);
    componentName = name.trim();
  }

  return componentName;
}

export async function selectFramework() {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["Lit", "React"],
    },
  ]);
  return framework;
}

export async function selectLanguaje() {
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose a language:",
      choices: ["TypeScript", "JavaScript"],
    },
  ]);

  return LANGUAGE_MAPPER[language];
}

export async function selectScript() {
  const { script } = await inquirer.prompt([
    {
      type: "list",
      name: "script",
      message: "Choose a script:",
      choices: ["getAllGitBranches.sh"],
    },
  ]);

  const allowedScripts = ["getAllGitBranches.sh"];
  if (!allowedScripts.includes(script)) {
    throw new Error("Invalid script selection");
  }

  return script;
}

export async function selectRemoteBranch() {
  const { remoteBranch } = await inquirer.prompt([
    {
      type: "input",
      name: "remoteBranch",
      message: "Enter the remote branch:",
      default: "origin",
    },
  ]);

  const branchRegex = /^[a-zA-Z0-9_\-\/]+$/;
  if (!branchRegex.test(remoteBranch)) {
    throw new Error("Invalid branch name");
  }

  return remoteBranch;
}
