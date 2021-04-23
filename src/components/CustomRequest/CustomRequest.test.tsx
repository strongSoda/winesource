import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import CustomRequest from './CustomRequest';

test('renders CustomRequest', () => {
  render(<CustomRequest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
