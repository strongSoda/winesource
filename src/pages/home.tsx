import React from 'react';

import { Helmet } from 'react-helmet';

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
