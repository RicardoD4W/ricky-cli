import chalk from "chalk";

export function microfrontendFrameworkNotSupportedMsg(framework) {
  console.log(
    chalk.red.bold(
      `\n>> '${framework}' is not supported yet for microfrontend\n`
    )
  );
  process.exit(1);
}

export function scriptCompilerIsNotSupportedMsg(compiler) {
  console.log(
    chalk.red.bold(`\n>> '${compiler}' is not supported yet for scripts\n`)
  );
  process.exit(1);
}

export function invalidGitBranchInput(input) {
  console.log(
    chalk.red.bold(`\n>> The name for branch '${input}', is not a valid name`)
  );
  process.exit(1);
}
