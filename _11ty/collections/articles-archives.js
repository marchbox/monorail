module.exports = function(api) {
  const archives = new Map();

  api.getFilteredByGlob('articles/**/*.md').forEach(article => {
    const date = article.date;
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const key = `${year}-${month}`;

    if (archives.has(key)) {
      archives.get(key).articles.push(article);
    } else {
      const archiveDate = new Date(date);
      archiveDate.setUTCDate(1);
      archives.set(key, {
        href: `/articles/${year}-${(month + 1).toString().padStart(2, '0')}/`,
        date: archiveDate,
        articles: [article],
      });
    }
  });

  return Array.from(archives.values()).sort((a, b) => {
    a = a.date;
    b = b.date;
    if (a.getUTCFullYear() === b.getUTCFullYear()) {
      return a.getUTCMonth() - b.getUTCMonth();
    } else {
      return a.getUTCFullYear() - b.getUTCFullYear();
    }
  }).reverse();
};
