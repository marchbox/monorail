module.exports = function(list, n) {
  return n < 0 ? list.slice(0, -n) : list.slice(-n);
};
