import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Profile from './Profile';

test('renders Profile', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
