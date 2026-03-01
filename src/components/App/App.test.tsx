import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '.';

describe('App component', () => {
  it('renders markdown editor', () => {
    render(<App />);

    const editor = screen.getByRole('textbox', { name: /markdown editor/i });
    expect(editor).toBeInTheDocument();
  });

  it('user can type in the editor', async () => {
    const user = userEvent.setup();
    render(<App />);

    const editor = screen.getByRole('textbox', { name: /markdown editor/i });
    await user.type(editor, 'Hello');

    expect(editor).toHaveValue('Hello');
  });
});
