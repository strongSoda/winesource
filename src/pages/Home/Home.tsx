import React from 'react';

import { Helmet } from 'react-helmet-async';

import App from 'components/App';
import { Redirect } from 'react-router';

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Redirect to="/register"/>
    <App />
  </>
);
export default Home;
