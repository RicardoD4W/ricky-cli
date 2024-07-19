import inquirer from "inquirer";

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

  return language === "TypeScript" ? "ts" : "js";
}
