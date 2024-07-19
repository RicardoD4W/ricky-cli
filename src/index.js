import chalk from "chalk";
import inquirer from "inquirer";

import { createComponent } from "./actions/createComponent.js";
import { createMicroFrontend } from "./actions/createMicroFrontend.js";

export async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        { name: "Create Base Component", value: "createComponent" },
        { name: "Create Micro Frontend", value: "createMicroFrontend" },
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

    default:
      console.log(chalk.red("Unknown action!"));
  }
}
