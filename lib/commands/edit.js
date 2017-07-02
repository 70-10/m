const { configFilePath } = require("../constants");
const { getJSON, getMemoDir, editFile, searchFile } = require("../util");
const fs = require("fs");
const debug = require("debug")("m:command:edit");

module.exports = async () => {
  const config = await getJSON(configFilePath);
  const memoDir = await getMemoDir(config);

  const filePath = searchFile(memoDir);
  if (fs.statSync(filePath).isDirectory()) {
    debug(`${filePath} is directory`);
    return;
  }
  editFile(config, filePath);
};
