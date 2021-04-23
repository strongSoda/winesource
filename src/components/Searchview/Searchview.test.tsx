import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import Searchview from './Searchview';

test('renders Searchview', () => {
  render(<Searchview />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
