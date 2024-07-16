import inquirer from "inquirer";
import { createMicrofrontendLitComponent } from "./lit/createMicrofrontendLitComponent.js";

export async function createMicroFrontend() {
  let componentName = "";

  // Validación del nombre del componente
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

  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["Lit"],
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose a language:",
      choices: ["TypeScript", "JavaScript"],
    },
  ]);

  const ext = language === "TypeScript" ? "ts" : "js";

  switch (framework) {
    case "Lit":
      createMicrofrontendLitComponent(componentName, ext);
      break;
  }
}
