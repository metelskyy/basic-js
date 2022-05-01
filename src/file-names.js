const { NotImplementedError } = require("../extensions/index.js");

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  let filteredNames = names.filter((item, index) => {
    return names.indexOf(item) !== names.lastIndexOf(item);
  });

  let count = 0;
  const numeredNames = names.map((item, index) => {
    if (item === filteredNames[0]) {
      count++;
      return item + `(${count - 1})`;
    } else return item;
  });
  const arr = numeredNames.map((item) => {
    if (item.endsWith("(0)")) {
      let str = item.split("");
      str.splice(item.length - 3);
      return str.join("");
    }
    return item;
  });
  if (filteredNames.length > 0) {
    filteredNames = [];
    return renameFiles(arr);
  } else return arr;
}

module.exports = {
  renameFiles,
};
