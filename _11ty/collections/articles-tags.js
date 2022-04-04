module.exports = function(api) {
  const tags = new Set();

  api.getFilteredByGlob('articles/**/*.md').forEach(article => {
    article.data.tags
      .filter(tag => tag !== 'article')
      .forEach(tag => {
        tags.add(tag);
      });
  });

  return Array.from(tags);
};
