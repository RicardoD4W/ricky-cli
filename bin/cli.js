#!/usr/bin/env node
import { main } from "../src/index.js";
import updateNotifier from "update-notifier";
import packageJson from "../package.json" assert { type: "json" };
import { welcomeMsg } from "../src/views/welcome.js";
import { versionMsg } from "../src/views/version.js";

updateNotifier({
  pkg: packageJson,
  shouldNotifyInNpmScript,
  updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({
  isGlobal: true,
});

welcomeMsg();
versionMsg(packageJson.version);

main();
