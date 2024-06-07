import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

import { createComponent } from "./actions/createComponent.js";

export async function main() {
  console.log(
    chalk.green(
      figlet.textSync("Ricky - CLI", {
        horizontalLayout: "fitted",
        font: "Alpha",
        width: "150",
      })
    )
  );

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [{ name: "Create Component", value: "createComponent" }],
    },
  ]);

  switch (action) {
    case "createComponent":
      await createComponent();
      break;
    default:
      console.log(chalk.red("Unknown action!"));
  }
}
