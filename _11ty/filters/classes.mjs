export default function(obj) {
  return Object
    .entries(obj)
    .filter(c => Boolean(c[1]))
    .map(c => c[0])
    .join(' ');
};
