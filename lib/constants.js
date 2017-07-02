const path = require("path");
const homeDir = require("os").homedir();

const configDir = path.join(homeDir, ".config", "m");

module.exports = {
  configDir,
  configFilePath: path.join(configDir, "config.json"),
};
