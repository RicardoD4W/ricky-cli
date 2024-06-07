import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

import { createMock } from "./actions/createMock.js";
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
      choices: [
        { name: "Create Component", value: "createComponent" },
        // { name: "Create Mock", value: "createMock" },
      ],
    },
  ]);

  switch (action) {
    case "createComponent":
      await createComponent();
      break;
    // case "createMock":
    //   await createMock();
    //   break;
    default:
      console.log(chalk.red("Unknown action!"));
  }
}
