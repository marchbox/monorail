const EXCLUDING_TAGS = [
  'article',
  'drawing',
  'feed',
];

module.exports = function(list) {
  return list?.length ? list.filter(tag => !EXCLUDING_TAGS.includes(tag)) : [];
};
