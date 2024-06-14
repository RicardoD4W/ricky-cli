import path from "path";
import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { __DIRNAME } from "../utils/path.js";
import { toNormalize, toPascalCase } from "../utils/util.js";

export async function createLitComponent(componentName, ext) {
  const framework = "Lit";
  const normalizeComponentName = toNormalize(componentName);
  const pascalCaseComponentName = toPascalCase(normalizeComponentName);
  let additionalOptions = [];

  const { selectedOptions } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedOptions",
      message: "Choose additional options:",
      choices: [
        "model",
        "event",
        "components",
        "shared",
        "templates",
        "service",
      ],
    },
  ]);
  additionalOptions = selectedOptions;

  const templateDir = path.resolve(
    __DIRNAME,
    `../templates/component/${framework.toLowerCase()}`
  );
  const destDir = path.resolve(process.cwd(), componentName);
  const cssDir = path.resolve(destDir, "css");
  const viewTemplatePath = path.resolve(templateDir, `component.view.${ext}`);
  const viewModelTemplatePath = path.resolve(
    templateDir,
    `component.viewmodel.${ext}`
  );

  const cssTemplatePath = path.resolve(
    templateDir,
    `component.theme.css.${ext}`
  );

  const viewDestPath = path.resolve(
    destDir,
    `${normalizeComponentName}.view.${ext}`
  );
  const viewModelDestPath = path.resolve(
    destDir,
    `${normalizeComponentName}.viewmodel.${ext}`
  );
  const cssFilePath = path.resolve(
    cssDir,
    `${normalizeComponentName}.theme.css.${ext}`
  );

  // Crear el directorio de destino si no existe
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Crear el directorio css si no existe
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir);
  }

  // Leer el contenido de los archivos de plantilla
  let viewTemplateContent = fs.readFileSync(viewTemplatePath, "utf-8");
  let viewModelTemplateContent = fs.readFileSync(
    viewModelTemplatePath,
    "utf-8"
  );
  let cssTemplateContent = fs.readFileSync(cssTemplatePath, "utf-8");

  // Reemplazar la marca de reemplazo con el nombre del componente en PascalCase
  viewTemplateContent = viewTemplateContent.replace(
    /\{COMPONENT_NAME\}/g,
    pascalCaseComponentName
  );
  viewTemplateContent = viewTemplateContent.replace(
    /\{camelCaseName\}/g,
    normalizeComponentName
  );
  viewModelTemplateContent = viewModelTemplateContent.replace(
    /\{COMPONENT_NAME\}/g,
    pascalCaseComponentName
  );
  cssTemplateContent = cssTemplateContent.replace(
    /\{COMPONENT_NAME\}/g,
    pascalCaseComponentName
  );

  // Escribir el contenido modificado en los archivos de destino
  fs.writeFileSync(viewDestPath, viewTemplateContent, "utf-8");
  fs.writeFileSync(viewModelDestPath, viewModelTemplateContent, "utf-8");
  fs.writeFileSync(cssFilePath, cssTemplateContent, "utf-8");

  // Crear carpetas adicionales y archivos dentro de cada carpeta según las opciones seleccionadas
  additionalOptions.forEach((option) => {
    const optionDir = path.resolve(destDir, option);
    const optionFilePath = path.resolve(
      optionDir,
      `${normalizeComponentName}.${option}.${ext}`
    );
    if (!fs.existsSync(optionDir)) {
      fs.mkdirSync(optionDir);
      fs.writeFileSync(optionFilePath, "", "utf-8");
      console.log(
        chalk.green(`Directory created for ${option} at ${optionDir}`)
      );
      console.log(
        chalk.green(
          `File created inside ${option} folder: ${normalizeComponentName}.${option}.${ext}`
        )
      );
    }
  });

  console.log(chalk.green(`Component ${normalizeComponentName} created!`));
  console.log(
    chalk.green(`Additional options selected: ${additionalOptions.join(", ")}`)
  );
}
