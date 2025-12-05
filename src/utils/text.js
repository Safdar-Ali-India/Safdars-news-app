export function truncateText(text, maxLength, fallback = '') {
  if (!text) return fallback;
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
