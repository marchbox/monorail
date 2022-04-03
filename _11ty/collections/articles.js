module.exports = function(api) {
  return api
      .getFilteredByGlob('articles/**/*.md')
      .filter(item => !item.data.draft);
}
