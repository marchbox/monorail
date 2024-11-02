export default function(api) {
  const archives = new Map();

  for (const article of api.getFilteredByGlob('articles/**/*.md')) {
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
  };

  return Array.from(archives.values()).sort((_a, _b) => {
    const a = _a.date;
    const b = _b.date;
    if (a.getUTCFullYear() === b.getUTCFullYear()) {
      return a.getUTCMonth() - b.getUTCMonth();
    }
    
    return a.getUTCFullYear() - b.getUTCFullYear();
  }).reverse();
};
