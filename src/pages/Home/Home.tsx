import React from 'react';

import { Helmet } from 'react-helmet-async';

import App from 'components/App';

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <App />
  </>
);
export default Home;
