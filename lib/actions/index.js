const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const homeDir = require("os").homedir();

const configDir = path.join(homeDir, ".config", "m");
const configFile = path.join(configDir, "config.json");
const expandHomeDir = require("expand-home-dir");
const dateFormat = require("dateformat");

const { initialize } = require("../util");

module.exports = {
  memo,
};

const ErrorCode = {
  DirectoryNotExists: 1,
};

async function memo(text) {
  if (!fs.existsSync(configFile)) {
    await initialize();
  }

  const config = await getConfig();

  const memoFile = path.join(
    config.directory,
    `${dateFormat(Date.now(), "yyyy-mm-dd")}.md`
  );
  fs.appendFileSync(memoFile, `- ${text}\n`);
}

async function getConfig() {
  const config = require(configFile);
  if (!config.directory) {
    console.error("directory path is empty");
    process.exit(ErrorCode.DirectoryNotExists);
  }
  config.directory = expandHomeDir(config.directory);
  if (!fs.existsSync(config.directory)) {
    await makeDir(config.directory);
  }
  return config;
}
