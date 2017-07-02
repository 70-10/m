const fs = require("fs");
const { configFilePath } = require("../constants");
const { getJSON, getMemoDir, searchFile } = require("../util");

module.exports = async () => {
  const config = await getJSON(configFilePath);
  const memoDir = await getMemoDir(config);
  const filePath = searchFile(memoDir);

  console.log(fs.readFileSync(filePath).toString());
};
