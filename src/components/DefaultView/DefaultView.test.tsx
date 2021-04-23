import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import DefaultView from './DefaultView';

test('renders DefaultView', () => {
  render(<DefaultView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
