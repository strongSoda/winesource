import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import OrderConfirm from './OrderConfirm';

test('renders OrderConfirm', () => {
  render(<OrderConfirm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
