const START_YEAR = 2022;

module.exports = function() {
  const currentYear = new Date().getFullYear();

  return currentYear > START_YEAR ?
      `${START_YEAR}–${currentYear}` : currentYear.toString();
};
