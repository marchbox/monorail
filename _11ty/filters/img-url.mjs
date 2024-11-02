export default function(_url, page) {
  const url = _url.replace(/^\.\//, '');
  return `${page.url}/${url}`.replace(/\/\/+/g, '/');
};
