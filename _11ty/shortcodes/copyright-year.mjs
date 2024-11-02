const START_YEAR = 2022;

export default function() {
  const currentYear = new Date().getFullYear();

  return currentYear > START_YEAR ?
      `${START_YEAR}–${currentYear}` : currentYear.toString();
};
