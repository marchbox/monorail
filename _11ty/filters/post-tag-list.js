const EXCLUDING_TAGS = require('../common/excluding-tags');

module.exports = function(list) {
  return list?.length ? list.filter(tag => !EXCLUDING_TAGS.includes(tag)) : [];
};
