const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

exports.deleteFile = async (filePath) => {
  await unlinkAsync(filePath);
};
