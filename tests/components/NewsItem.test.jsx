import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewsItem from '../../src/Components/NewsItem';

describe('NewsItem', () => {
  it('renders truncated title and description', () => {
    render(
      <NewsItem
        title={'A'.repeat(60)}
        description={'B'.repeat(100)}
        src="https://example.com/photo.jpg"
        url="https://example.com/story"
      />
    );

    expect(screen.getByRole('heading', { level: 5 }).textContent).toHaveLength(53);
    expect(screen.getByText(/B{90}\.\.\./)).toBeInTheDocument();
  });

  it('uses fallback title when headline is missing', () => {
    render(<NewsItem title={null} description="Short" src="" url="https://example.com" />);
    expect(screen.getByText('Untitled headline')).toBeInTheDocument();
  });

  it('links read more to the article url', () => {
    render(
      <NewsItem
        title="Sample"
        description="Sample body"
        src=""
        url="https://news.example/article"
      />
    );
    expect(screen.getByRole('link', { name: 'Read More' })).toHaveAttribute(
      'href',
      'https://news.example/article'
    );
  });
});
