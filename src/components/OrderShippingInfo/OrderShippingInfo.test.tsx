import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import OrderShippingInfo from './OrderShippingInfo';

test('renders OrderShippingInfo', () => {
  render(<OrderShippingInfo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
