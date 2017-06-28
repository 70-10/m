const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const homeDir = require("os").homedir();

const configDir = path.join(homeDir, ".config", "m");
const configFile = path.join(configDir, "config.json");
const { spawnSync } = require("child_process");
const expandHomeDir = require("expand-home-dir");
const dateFormat = require("dateformat");

module.exports = {
  config,
  memo,
  view,
  edit,
  list,
};

const ErrorCode = {
  DirectoryNotExists: 1,
};

async function config() {
  if (!fs.existsSync(configFile)) {
    await initialize();
  }

  const config = require(configFile);
  fileEdit(config, configFile);
}

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

async function initialize() {
  await makeDir(configDir);
  const config = {
    directory: "",
    editor: "",
  };
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
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

async function view() {
  const config = await getConfig();
  const memoFilePath = path.join(
    config.directory,
    `${dateFormat(Date.now(), "yyyy-mm-dd")}.md`
  );
  console.log(fs.readFileSync(memoFilePath).toString());
}

async function edit() {
  const config = await getConfig();
  const memoFilePath = path.join(
    config.directory,
    `${dateFormat(Date.now(), "yyyy-mm-dd")}.md`
  );
  fileEdit(config, memoFilePath);
}

function fileEdit(config, filePath) {
  const editor = config.editor || "vim";

  spawnSync(editor, [filePath], {
    stdio: "inherit",
  });
}

async function list() {
  const config = await getConfig();
  fs.readdirSync(config.directory).forEach(file => {
    console.log(file);
  });
}
