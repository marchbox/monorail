module.exports = function(api) {
  const refSet = new Set();
  const archives = [];

  api.getFilteredByGlob('articles/**/*.md').forEach(article => {
    const date = article.date;
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const refYearMonth = `${year}-${month}`;
    date.setUTCDate(1);

    if (!refSet.has(refYearMonth)) {
      refSet.add(refYearMonth);
      archives.push({
        href: `/article/${year}/${(month + 1).toString().padStart(2, '0')}`,
        date,
      });
    }
  });

  return archives.sort((a, b) => {
    a = a.date;
    b = b.date;
    if (a.getUTCFullYear() === b.getUTCFullYear()) {
      return a.getUTCMonth() - b.getUTCMonth();
    } else {
      return a.getUTCFullYear() - b.getUTCFullYear();
    }
  }).reverse();
};
