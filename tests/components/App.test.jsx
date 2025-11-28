import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';

const sampleArticles = [
  {
    title: 'First story',
    description: 'First description',
    url: 'https://example.com/1',
    urlToImage: 'https://example.com/1.jpg',
  },
  {
    title: 'Second story',
    description: 'Second description',
    url: 'https://example.com/2',
    urlToImage: 'https://example.com/2.jpg',
  },
];

describe('App integration', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_KEY', 'test-api-key');
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', articles: sampleArticles }),
    });
  });

  it('loads and displays articles on mount', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('First story')).toBeInTheDocument();
    });
    expect(screen.getByText('Second story')).toBeInTheDocument();
  });

  it('refetches when category changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => expect(screen.getByText('First story')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Technology' }));

    await waitFor(() => {
      const lastCall = fetch.mock.calls.at(-1)[0];
      expect(lastCall).toContain('category=technology');
    });
  });

  it('shows error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('network down'));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load news/i)).toBeInTheDocument();
    });
  });

  it('shows empty message when api returns no articles', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'ok', articles: [] }),
    });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/No headlines for this category/i)).toBeInTheDocument();
    });
  });
});
