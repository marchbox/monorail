export default function(url, base) {
  try {
    return (new URL(url, base)).toString()
  } catch(e) {
    return url;
  }
};
