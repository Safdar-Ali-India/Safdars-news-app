import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Navbar from '../../src/Components/Navbar';

describe('Navbar', () => {
  it('renders all category options', () => {
    render(<Navbar setCategory={() => {}} />);
    expect(screen.getByRole('button', { name: 'General' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Technology' })).toBeInTheDocument();
  });

  it('calls setCategory with the clicked value', async () => {
    const user = userEvent.setup();
    const setCategory = vi.fn();
    render(<Navbar setCategory={setCategory} />);

    await user.click(screen.getByRole('button', { name: 'Sports' }));
    expect(setCategory).toHaveBeenCalledWith('sports');
  });
});
