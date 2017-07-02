const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
const expandHomeDir = require("expand-home-dir");
const { spawnSync } = require("child_process");

const debug = require("debug")("m:util");

module.exports = {
  getJSON,
  getMemoDir,
  editFile,
  searchFile,
};

async function getJSON(filePath) {
  await initialize(filePath);
  return require(filePath);
}

async function initialize(filePath) {
  if (fs.existsSync(filePath)) {
    debug(`${filePath} is exist.`);
    return;
  }
  await makeDir(path.dirname(filePath));
  const configJSON = createConfigJSON();
  fs.writeFileSync(filePath, JSON.stringify(configJSON, null, 2));
}

function createConfigJSON() {
  return {
    directory: "~/memo",
    editor: "",
  };
}

async function getMemoDir(config) {
  if (!config.directory) {
    console.error("Please set memo directory path.");
    process.exit(1);
  }

  const memoDir = expandHomeDir(config.directory);
  if (!fs.existsSync(memoDir)) {
    debug(`${memoDir} is not exist.`);
    await makeDir(memoDir);
  }
  return memoDir;
}

function editFile(config, filePath) {
  const editor = config.editor || "vim";
  debug(`editor is ${editor}`);
  spawnSync(editor, [filePath], {
    stdio: "inherit",
  });
}

function searchFile(dir) {
  const ls = spawnSync("ls", [dir]);
  const peco = spawnSync("peco", {
    input: ls.stdout,
  });

  return path.join(dir, peco.stdout.toString().trim());
}
