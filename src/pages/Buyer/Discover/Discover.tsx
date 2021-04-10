import React from 'react';

import { Helmet } from 'react-helmet-async';

import Discover from 'components/Discover';

const Discovery: React.FC = () => (
  <>
    <Helmet>
      <title>Discover</title>
    </Helmet>
    <Discover />
  </>
);
export default Discovery;
