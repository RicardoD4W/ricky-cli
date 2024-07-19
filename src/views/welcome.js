import chalk from "chalk";
import figlet from "figlet";

export function welcomeMsg() {
  console.log(chalk.cyan.bold(figlet.textSync("Ricky - CLI")));
}
