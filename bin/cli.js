#!/usr/bin/env node
import { main } from "../src/index.js";
import updateNotifier from "update-notifier";
import packageJson from "../package.json" assert { type: "json" };

updateNotifier({ pkg: packageJson }).notify();

main();
