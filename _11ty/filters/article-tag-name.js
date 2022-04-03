const TagName = new Map([
  ['dumpling', 'Dumpling'],
  ['mouse', 'The Mouse'],
  ['pixel', 'Pixel'],
]);

module.exports = function(tag) {
  return TagName.get(tag) || '';
}
