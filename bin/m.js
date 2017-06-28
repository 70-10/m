#!/usr/bin/env node

const pkg = require("../package.json");
const prog = require("commander");

const actions = require("../lib/actions");

if (process.argv.length < 3) {
  process.argv.push("--help");
}

prog.version(pkg.version);

prog.command("config").alias("c").action(actions.config);
prog.command("view").alias("v").action(actions.view);
prog.command("edit").alias("e").action(actions.edit);
prog.command("list").alias("l").action(actions.list);

prog.arguments("<text>").action(actions.memo);
prog.parse(process.argv);
