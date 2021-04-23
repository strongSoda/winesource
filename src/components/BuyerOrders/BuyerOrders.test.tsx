import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import BuyerRequests from './BuyerOrders';

test('renders BuyerRequests', () => {
  render(<BuyerRequests />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
