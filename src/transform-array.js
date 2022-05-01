const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!(arr instanceof Array))
    throw new Error("'arr' parameter must be an instance of the Array!");
  if (!Array.isArray(arr))
    throw new Error("'arr' parameter must be an instance of the Array!");
  let arrCopy = [...arr];
  const empty = "empty";
  for (let i = 0; i < arrCopy.length; i++) {
    if (arrCopy[i] === "--discard-prev") {
      if (!arrCopy[i - 1] || arrCopy[i - 1] === empty) {
        continue;
      } else arrCopy.splice(i - 1, 1, empty);
    } else if (arrCopy[i] === "--discard-next") {
      if (!arrCopy[i + 1] || arrCopy[i + 1] === empty) {
        continue;
      } else arrCopy.splice(i + 1, 1, empty);
    } else if (arrCopy[i] === "--double-prev") {
      if (!arrCopy[i - 1] || arrCopy[i - 1] === empty) {
        continue;
      } else arrCopy.splice(i - 1, 2, arrCopy[i - 1], arrCopy[i - 1]);
    } else if (arrCopy[i] === "--double-next") {
      if (i + 1 >= arrCopy.length || arrCopy[i + 1] === empty) {
        continue;
      } else arrCopy.splice(i, 2, arrCopy[i + 1], arrCopy[i + 1]);
    }
  }
  return arrCopy.filter((item) => {
    return (
      item !== empty &&
      item !== "--discard-prev" &&
      item !== "--discard-next" &&
      item !== "--double-next" &&
      item !== "--double-prev"
    );
  });
}

module.exports = {
  transform,
};
