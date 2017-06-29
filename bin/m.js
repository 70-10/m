#!/usr/bin/env node

const pkg = require("../package.json");
const prog = require("commander");
const debug = require("debug")("m:main");

const actions = require("../lib/actions");
const commands = require("../lib/commands");

if (process.argv.length < 3) {
  process.argv.push("--help");
}

// worst case....
process.on("unhandledRejection", (err, p) => {
  debug(err);
  debug(p);
});

prog.version(pkg.version);

prog.command("config").alias("c").action(commands.config);
prog.command("view").alias("v").action(actions.view);
prog.command("edit").alias("e").action(actions.edit);
prog.command("list").alias("l").action(actions.list);

prog.arguments("<text>").action(actions.memo);
prog.parse(process.argv);
