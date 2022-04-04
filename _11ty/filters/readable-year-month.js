module.exports = function(date) {
  return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(date);
};
