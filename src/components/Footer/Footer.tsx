import React from 'react';

import { FooterWrapper } from './Footer.styles';

declare interface IFooterProps {}

const Footer: React.FC = (props: IFooterProps) => {
  return (
    <FooterWrapper data-testid="Footer">
      <p>Copyright &copy; {new Date().getFullYear()} WineSource. All rights reserved.</p>
    </FooterWrapper>
  )
};

export default Footer;
