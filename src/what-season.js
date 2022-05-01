const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date = "no value") {
  if (date === "no value") return "Unable to determine the time of year!";
  if (!(date instanceof Date) || Object.getOwnPropertyNames(date).length > 0)
    throw new Error("Invalid date!");
  if (Object.prototype.toString.call(date) !== "[object Date]") {
    throw new Error("Invalid date!");
  }
  let result = "Invalid date!";
  const winter = ["winter", 11, 0, 1];
  const spring = ["spring", 2, 3, 4];
  const summer = ["summer", 5, 6, 7];
  const autumn = ["autumn", 8, 9, 10];
  const seasons = [winter, spring, summer, autumn];
  const month = date.getMonth();

  seasons.forEach((item) => {
    if (item.includes(month)) {
      result = item[0];
    }
  });
  return result;
}

module.exports = {
  getSeason,
};
