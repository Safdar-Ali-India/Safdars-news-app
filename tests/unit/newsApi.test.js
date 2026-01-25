import { describe, expect, it } from 'vitest';
import { buildHeadlinesUrl, normalizeArticles } from '../../src/utils/newsApi';

describe('buildHeadlinesUrl', () => {
  it('builds the headlines endpoint with category and api key', () => {
    const url = buildHeadlinesUrl('technology', 'test-key');
    expect(url).toContain('newsapi.org/v2/top-headlines');
    expect(url).toContain('category=technology');
    expect(url).toContain('country=us');
    expect(url).toContain('apiKey=test-key');
  });
});

describe('normalizeArticles', () => {
  it('returns articles array from a valid response', () => {
    const payload = {
      status: 'ok',
      articles: [{ title: 'One' }, { title: 'Two' }],
    };
    expect(normalizeArticles(payload)).toHaveLength(2);
  });

  it('throws when api responds with error status', () => {
    expect(() => normalizeArticles({ status: 'error', message: 'Invalid key' })).toThrow(
      'Invalid key'
    );
  });

  it('returns empty list when articles key is missing', () => {
    expect(normalizeArticles({ status: 'ok' })).toEqual([]);
  });
});
