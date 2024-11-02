export default function(date) {
  return new Intl.DateTimeFormat('en', {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(date);
};
