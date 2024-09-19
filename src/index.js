import chalk from "chalk";
import inquirer from "inquirer";

import { createComponent } from "./actions/createComponent.js";
import { createMicroFrontend } from "./actions/createMicroFrontend.js";
import { executeScripts } from "./actions/executeScripts.js";

export async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        { name: "Create Base Component", value: "createComponent" },
        { name: "Create Micro Frontend", value: "createMicroFrontend" },
        {
          name: "Execute scripts",
          value: "executeScripts",
        },
      ],
    },
  ]);

  switch (action) {
    case "createComponent":
      await createComponent();
      break;

    case "createMicroFrontend":
      await createMicroFrontend();
      break;

    case "executeScripts":
      await executeScripts();
      break;

    default:
      console.log(chalk.red("Unknown action!"));
  }
}
