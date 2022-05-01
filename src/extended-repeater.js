const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(
  str,
  {
    repeatTimes = 1,
    separator = "+",
    addition = "",
    additionRepeatTimes = 1,
    additionSeparator = `|`,
  }
) {
  let Additions = [];
  for (let i = 0; i < additionRepeatTimes; i++) {
    Additions.push(String(addition));
  }
  Additions = Additions.join(`${additionSeparator}`);
  let repeatedArr = [];
  for (let i = 0; i < repeatTimes; i++) {
    repeatedArr.push(String(str) + String(Additions));
  }
  return repeatedArr.join(`${String(separator)}`);
}

module.exports = {
  repeater,
};
