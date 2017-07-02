const path = require("path");
const fs = require("fs");
const dateFormat = require("dateformat");

const { configFilePath } = require("../constants");
const { getJSON, getMemoDir } = require("../util");

module.exports = async text => {
  const config = await getJSON(configFilePath);
  const memoDir = await getMemoDir(config);
  const memoFile = path.join(
    memoDir,
    `${dateFormat(Date.now(), "yyyy-mm-dd")}.md`
  );
  fs.appendFileSync(memoFile, `- ${text}\n`);
};
