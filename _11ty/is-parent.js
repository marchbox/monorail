module.exports = function(nav, page) {
  return nav.url !== '/' && page.url.includes(nav.url);
};
