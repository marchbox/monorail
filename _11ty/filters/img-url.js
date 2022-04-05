module.exports = function(url, page) {
  url = url.replace(/^\.\//, '');
  return `${page.url}/${url}`.replace(/\/\/+/g, '/');
};
