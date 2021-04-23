import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Chat from './Chat';

test('renders Chat', () => {
  render(<Chat />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
