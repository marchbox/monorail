const TagName = new Map([
  ['life', 'Life'],
  ['disney', 'Disney'],
  ['web-design', 'Web Design'],
  ['web-components', 'Web Components'],
]);

export default function(tag) {
  return TagName.get(tag) || tag;
}
