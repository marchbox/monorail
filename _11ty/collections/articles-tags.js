module.exports = function(api) {
  const refSet = new Set();
  const tags = [];

  api.getFilteredByGlob('articles/**/*.md').forEach(article => {
    article.data.tags
      .filter(tag => tag !== 'article')
      .forEach(tag => {
        if (!refSet.has(tag)) {
          refSet.add(tag);
          tags.push({
            href: `/articles/tag/${tag}`,
            tag,
          });
        }
      });
  });

  return tags;
};
