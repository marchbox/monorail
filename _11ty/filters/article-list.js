module.exports = function(list) {
  return list.filter(article => !article.inputPath.includes('index.njk'));
};
