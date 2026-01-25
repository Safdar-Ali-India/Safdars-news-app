import { describe, expect, it } from 'vitest';
import { truncateText } from '../../src/utils/text';

describe('truncateText', () => {
  it('keeps short strings unchanged', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('truncates long strings with ellipsis', () => {
    const long = 'a'.repeat(60);
    expect(truncateText(long, 50)).toBe(`${'a'.repeat(50)}...`);
  });

  it('returns fallback for nullish values', () => {
    expect(truncateText(null, 50, 'fallback')).toBe('fallback');
    expect(truncateText(undefined, 50, 'fallback')).toBe('fallback');
  });
});
