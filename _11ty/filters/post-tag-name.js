const TagName = new Map([
  ['life', 'Life'],
  ['disney', 'Disney'],
  ['web-design', 'Web Design'],
  ['web-components', 'Web Components'],
]);

module.exports = function(tag) {
  return TagName.get(tag) || tag;
}
