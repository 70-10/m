const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const path = require("path");
const dayjs = require("dayjs");
const { configFilePath } = require("../constants");
const { getJSON, getMemoDir } = require("../util");

module.exports = async () => {
  const config = await getJSON(configFilePath);
  const memoDir = await getMemoDir(config);
  const filePath = path.resolve(memoDir, `${dayjs().format("YYYY-MM-DD")}.md`);
  try {
    const memo = await readFile(filePath);
    console.log(memo.toString());
  } catch (e) {
    console.error(`${filePath} is not found`);
  }
};
