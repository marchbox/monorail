const TagName = new Map([
  ['life', 'Life'],
  ['disney', 'Disney'],
  ['web-design', 'Web Design'],
]);

module.exports = function(tag) {
  return TagName.get(tag) || tag;
}
