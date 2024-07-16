import path from "path";
import fs from "fs";
import chalk from "chalk";
import { __DIRNAME } from "../../utils/path.js";
import { toNormalize, toPascalCase } from "../../utils/util.js";

export async function createReactComponent(componentName, ext) {
  const framework = "React";
  const normalizeComponentName = toNormalize(componentName);
  const pascalCaseComponentName = toPascalCase(normalizeComponentName);

  const templateDir = path.resolve(
    __DIRNAME,
    `../templates/component/${framework.toLowerCase()}`
  );
  const destDir = path.resolve(process.cwd(), componentName);
  const cssDir = path.resolve(destDir, "css");

  const viewTemplatePath = path.resolve(templateDir, `component.view.${ext}x`);
  const viewModelTemplatePath = path.resolve(
    templateDir,
    `component.viewmodel.${ext}`
  );
  const cssTemplatePath = path.resolve(templateDir, `component.module.css`);
  const modelTemplatePath = path.resolve(templateDir, `component.model.${ext}`);

  const viewDestPath = path.resolve(
    destDir,
    `${normalizeComponentName}.view.${ext}x`
  );
  const viewModelDestPath = path.resolve(
    destDir,
    `${normalizeComponentName}.viewmodel.${ext}`
  );
  const cssFilePath = path.resolve(
    cssDir,
    `${normalizeComponentName}.module.css`
  );

  const modelPath = path.resolve(
    destDir,
    `${normalizeComponentName}.model.${ext}`
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

  let modelTemplateContent = fs.readFileSync(modelTemplatePath, "utf-8");

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
  viewModelTemplateContent = viewModelTemplateContent.replace(
    /\{camelCaseName\}/g,
    normalizeComponentName
  );

  cssTemplateContent = cssTemplateContent.replace(
    /\{COMPONENT_NAME\}/g,
    pascalCaseComponentName
  );

  modelTemplateContent = modelTemplateContent.replace(
    /\{COMPONENT_NAME\}/g,
    pascalCaseComponentName
  );

  // Escribir el contenido modificado en los archivos de destino
  fs.writeFileSync(viewDestPath, viewTemplateContent, "utf-8");
  fs.writeFileSync(viewModelDestPath, viewModelTemplateContent, "utf-8");
  fs.writeFileSync(modelPath, modelTemplateContent, "utf-8");
  fs.writeFileSync(cssFilePath, cssTemplateContent, "utf-8");

  console.log(chalk.green(`Component ${normalizeComponentName} created!`));
}
