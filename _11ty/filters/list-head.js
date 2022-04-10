module.exports = function(list, n) {
  return n < 0 ? list.slice(n) : list.slice(0, n);
};
