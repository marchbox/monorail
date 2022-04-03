module.exports = function(date) {
  return new Intl.DateTimeFormat('en', {dateStyle: 'long'}).format(date);
};
