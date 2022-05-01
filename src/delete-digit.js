const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const nArr = String(n).split("");
  let arrOfNums = [];
  for (let i = 0; i < nArr.length; i++) {
    const currentItem = nArr[i];
    nArr[i] = "";
    arrOfNums.push(Number(nArr.join("")));
    nArr[i] = currentItem;
  }

  return Math.max(...arrOfNums);
}

module.exports = {
  deleteDigit,
};
