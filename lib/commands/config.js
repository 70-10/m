const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { configFilePath } = require("../constants");
const makeDir = require("make-dir");
const debug = require("debug")("m:commands:config");

module.exports = async () => {
  if (!fs.existsSync(configFilePath)) {
    debug("initialize config");
    await initialize(configFilePath);
  }

  const config = require(configFilePath);
  debug(config);
  fileEdit(config, configFilePath);
};

async function initialize(configFilePath) {
  await makeDir(path.dirname(configFilePath));
  const configJSON = createConfigJSON();
  fs.writeFileSync(configFilePath, JSON.stringify(configJSON, null, 2));
}

function createConfigJSON() {
  return {
    directory: "~/memo",
    editor: "",
  };
}

function fileEdit(config, filePath) {
  const editor = config.editor || "vim";
  debug(`editor is ${editor}`);
  spawnSync(editor, [filePath], {
    stdio: "inherit",
  });
}
