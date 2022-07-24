const EXCLUDING_TAGS = require('../common/excluding-tags');

module.exports = function(api) {
  const refSet = new Set();
  const tags = [];

  api.getFilteredByGlob('articles/**/*.md').forEach(article => {
    article.data.tags
      .filter(tag => !EXCLUDING_TAGS.includes(tag))
      .forEach(tag => {
        if (!refSet.has(tag)) {
          refSet.add(tag);
          tags.push({
            href: `/articles/tag/${tag}/`,
            tag,
          });
        }
      });
  });

  return tags.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    } else if (a.tag > b.tag) {
      return 1;
    }
    return 0;
  });
};
