import React from 'react';

import { render, screen } from 'global/utils/test-utils';

import UploadImage from './UploadImage';

test('renders UploadImage', () => {
  render(<UploadImage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
