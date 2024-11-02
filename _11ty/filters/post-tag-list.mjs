import EXCLUDING_TAGS from '../common/excluding-tags.mjs';

export default function(list) {
  return list?.length ? list.filter(tag => !EXCLUDING_TAGS.includes(tag)) : [];
};
