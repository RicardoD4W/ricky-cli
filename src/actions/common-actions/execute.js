import { toLowerCase, toNormalize, toPascalCase } from "../../utils/util.js";
import { __DIRNAME } from "../../utils/path.js";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { validateExtensionFromFramework } from "./validate.js";

export function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf-8");
}

export function readTemplate(templatePath) {
  return fs.readFileSync(templatePath, "utf-8");
}

export function replacePlaceholders(content, replacements) {
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return content;
}

export async function createComponentFiles({
  framework,
  componentName,
  ext,
  additionalOptions,
}) {
  const normalizeComponentName = toNormalize(componentName);
  const pascalCaseComponentName = toPascalCase(normalizeComponentName);
  const lowerCaseComponentName = toLowerCase(normalizeComponentName);

  const replacements = {
    COMPONENT_NAME: pascalCaseComponentName,
    camelCaseName: normalizeComponentName,
    lowerCaseComponentName: lowerCaseComponentName,
  };

  const templateDir = path.resolve(
    __DIRNAME,
    `../templates/component/${framework.toLowerCase()}`
  );
  const destDir = path.resolve(process.cwd(), componentName);
  const cssDir = path.resolve(destDir, "css");

  const filesToCreate = [
    {
      template: `component.view.${validateExtensionFromFramework({
        framework,
        ext,
      })}`,
      dest: `${normalizeComponentName}.view.${validateExtensionFromFramework({
        framework,
        ext,
      })}`,
    },
    {
      template: `component.viewmodel.${ext}`,
      dest: `${normalizeComponentName}.viewmodel.${ext}`,
    },
  ];

  if (framework === "Lit") {
    filesToCreate.push({
      template: `component.theme.css.${ext}`,
      dest: `css/${normalizeComponentName}.theme.css.${ext}`,
    });
  }

  if (framework === "React") {
    filesToCreate.push({
      template: `component.module.css`,
      dest: `css/${normalizeComponentName}.module.css`,
    });
    filesToCreate.push({
      template: `component.model.${ext}`,
      dest: `${normalizeComponentName}.model.${ext}`,
    });
  }

  createDirectory(destDir);
  createDirectory(cssDir);

  filesToCreate.forEach(({ template, dest }) => {
    const templatePath = path.resolve(templateDir, template);
    const destPath = path.resolve(destDir, dest);
    let content = readTemplate(templatePath);
    content = replacePlaceholders(content, replacements);
    createFile(destPath, content);
  });

  additionalOptions.forEach((option) => {
    const optionDir = path.resolve(destDir, option);
    const optionFilePath = path.resolve(
      optionDir,
      `${normalizeComponentName}.${option}.${ext}`
    );
    createDirectory(optionDir);
    createFile(optionFilePath, "");
    console.log(chalk.green(`Directory created for ${option} at ${optionDir}`));
    console.log(
      chalk.green(
        `File created inside ${option} folder: ${normalizeComponentName}.${option}.${ext}`
      )
    );
  });

  console.log(
    chalk.green(`Additional options selected: ${additionalOptions.join(", ")}`)
  );
  console.log(chalk.green(`Component ${normalizeComponentName} created!`));
}
