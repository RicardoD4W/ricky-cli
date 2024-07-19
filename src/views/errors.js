import chalk from "chalk";

export function microfrontendFrameworkNotSupportedMsg(framework) {
  console.log(
    chalk.red.bold(`\n>> ${framework} is not supported yet for microfrontend\n`)
  );
}
