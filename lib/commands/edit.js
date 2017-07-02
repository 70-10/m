const { configFilePath } = require("../constants");
const { getJSON, getMemoDir, editFile, searchFile } = require("../util");

module.exports = async () => {
  const config = await getJSON(configFilePath);
  const memoDir = await getMemoDir(config);

  const filePath = searchFile(memoDir);
  editFile(config, filePath);
};
