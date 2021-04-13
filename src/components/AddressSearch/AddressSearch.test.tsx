import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import AddressSearch from './AddressSearch';

test('renders AddressSearch', () => {
  render(<AddressSearch />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
