const { configFilePath } = require("../constants");
const { getJSON, editFile } = require("../util");
const debug = require("debug")("m:commands:config");

module.exports = async () => {
  const config = await getJSON(configFilePath);
  debug(config);
  editFile(config, configFilePath);
};
