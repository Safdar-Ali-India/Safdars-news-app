export function buildHeadlinesUrl(category, apiKey) {
  const params = new URLSearchParams({
    country: 'us',
    category,
    apiKey,
  });
  return `https://newsapi.org/v2/top-headlines?${params.toString()}`;
}

export function normalizeArticles(response) {
  if (!response || response.status === 'error') {
    throw new Error(response?.message || 'News API returned an error');
  }
  return Array.isArray(response.articles) ? response.articles : [];
}
