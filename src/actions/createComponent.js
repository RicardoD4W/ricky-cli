import inquirer from "inquirer";
import { createLitComponent } from "./lit/createLitComponent.js";
import { createReactComponent } from "./react/createReactComponent.js";

export async function createComponent() {
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
      choices: ["Lit", "React"],
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
      createLitComponent(componentName, ext);
      break;

    case "React":
      createReactComponent(componentName, ext);
      break;
  }
}
