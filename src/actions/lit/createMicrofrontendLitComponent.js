import path from "path";
import fs from "fs";
import chalk from "chalk";
import { __DIRNAME } from "../../utils/path.js";
import { toNormalize, toPascalCase } from "../../utils/util.js";

export async function createMicrofrontendLitComponent(componentName, ext) {
  const normalizeComponentName = toNormalize(componentName);
  const pascalComponentName = toPascalCase(normalizeComponentName);

  const projectDir = path.resolve(
    process.cwd(),
    `mf-${normalizeComponentName}`
  );

  const srcDir = path.resolve(projectDir, "src");
  const assetsDir = path.resolve(srcDir, "assets");

  // Crear los directorios necesarios
  const directories = [projectDir, srcDir, assetsDir];
  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(chalk.green(`Directory created: ${dir}`));
    }
  });

  // .gitignore content
  const gitignoreContent = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

`;

  // package.json content
  const packageJsonContent = `
{
  "name": "mf-${normalizeComponentName}",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve" : "vite preview --port 3000"
  },
  "dependencies": {
    "lit": "^3.1.4"
  },
  "devDependencies": {
  ${
    ext === "ts"
      ? `
    "@types/node": "^20.14.10",
    "typescript": "^5.2.2",`
      : ""
  }
    "vite": "^5.3.1"
  }
}
`;

  // tsconfig.json content
  const tsconfigJsonContent = `
{
  "compilerOptions": {
    "target": "ES2020",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

`;

  // vite.config.ts content
  const viteConfigContent = `
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.${ext}"),
      name: "${pascalComponentName}",
      fileName: "${normalizeComponentName}",
    },
    rollupOptions: {
      output:{
        format: "esm",
        dir: "dist",
        entryFileNames: "${normalizeComponentName}.js"
      }
    },
  },
});

`;

  // index.html content
  const indexHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mf-${normalizeComponentName}</title>
</head>
<body>
  <script type="module" src="/src/main.${ext}"></script>
</body>
</html>
`;

  // vite-env.d.ts content
  const viteEnvContent = `
/// <reference types="vite/client" />
`;

  // main.ts content
  const mainTsContent = `
// This is a Barrel File, please export your main component
// Ex: export * from './my-component/my-component.view.${ext}'
`;

  // Escribir los archivos
  const files =
    ext === "ts"
      ? [
          {
            path: path.resolve(projectDir, ".gitignore"),
            content: gitignoreContent,
          },
          {
            path: path.resolve(projectDir, "package.json"),
            content: packageJsonContent,
          },
          {
            path: path.resolve(projectDir, "tsconfig.json"),
            content: tsconfigJsonContent,
          },
          {
            path: path.resolve(projectDir, "vite.config.ts"),
            content: viteConfigContent,
          },
          {
            path: path.resolve(projectDir, "index.html"),
            content: indexHtmlContent,
          },
          {
            path: path.resolve(srcDir, "vite-env.d.ts"),
            content: viteEnvContent,
          },
          { path: path.resolve(srcDir, "main.ts"), content: mainTsContent },
        ]
      : [
          {
            path: path.resolve(projectDir, ".gitignore"),
            content: gitignoreContent,
          },
          {
            path: path.resolve(projectDir, "package.json"),
            content: packageJsonContent,
          },
          {
            path: path.resolve(projectDir, "vite.config.js"),
            content: viteConfigContent,
          },
          {
            path: path.resolve(projectDir, "index.html"),
            content: indexHtmlContent,
          },
          { path: path.resolve(srcDir, "main.js"), content: mainTsContent },
        ];

  files.forEach((file) => {
    fs.writeFileSync(file.path, file.content.trim(), "utf-8");
    console.log(chalk.green(`File created: ${file.path}`));
  });

  console.log(
    chalk.green(
      `Microfrontend project mf-${normalizeComponentName} created successfully!`
    )
  );
}
