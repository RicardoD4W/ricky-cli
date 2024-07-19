import chalk from "chalk";
import figlet from "figlet";

export function versionMsg(version) {
  console.log(
    chalk.yellow.dim(
      figlet.textSync(`v ${version}`, {
        font: "Small",
      })
    )
  );
}
