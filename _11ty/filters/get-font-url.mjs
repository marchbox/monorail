const FAMILY_PARAM = 'family={name}:wght@{weights}';
const BASE_URL = 'https://fonts.googleapis.com/css2?{fonts}&display=swap';

export default function(config) {
  const fonts = [];

  for (const family of config) {
    fonts.push(
      FAMILY_PARAM
        .replace('{name}', family.name.replace(/\s/g, '+'))
        .replace('{weights}', family.weights.join(';'))
    );
  };

  return BASE_URL.replace('{fonts}', fonts.join('&'));
};
