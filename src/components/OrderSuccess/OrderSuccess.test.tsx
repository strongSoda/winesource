import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import OrderSuccess from './OrderSuccess';

test('renders OrderSuccess', () => {
  render(<OrderSuccess />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
