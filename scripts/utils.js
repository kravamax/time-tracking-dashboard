export function slugify(str) {
  return str.toLowerCase().replace(/ /g, '-');
}

export function getTimeLabel(type) {
  switch (type) {
    case 'daily':
      return 'Yesterday';
    case 'weekly':
      return 'Last Week';
    case 'monthly':
      return 'Last Month';
    default:
      return '';
  }
}
