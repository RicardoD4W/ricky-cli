#!/usr/bin/env node
import { main } from "../src/index.js";
import updateNotifier from "update-notifier";
import pkg from "../package.json" assert { type: "json" };

const notifier = updateNotifier({ pkg });
if (notifier.update) {
  notifier.notify();
}

main();
