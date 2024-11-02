import EXCLUDING_TAGS from '../common/excluding-tags.mjs';

export default function(api) {
  const refSet = new Set();
  const tags = [];

  for (const article of api.getFilteredByGlob('articles/**/*.md')) {
    const filteredTags = article.data.tags
        .filter(tag => !EXCLUDING_TAGS.includes(tag));
    for (const tag of filteredTags) {
      if (!refSet.has(tag)) {
        refSet.add(tag);
        tags.push({
          href: `/articles/tag/${tag}/`,
          tag,
        });
      }
    }
  };

  return tags.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    }
    if (a.tag > b.tag) {
      return 1;
    }
    return 0;
  });
};
