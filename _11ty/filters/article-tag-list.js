module.exports = function(list) {
  return list?.length ? list.filter(tag => tag !== 'article') : [];
};
