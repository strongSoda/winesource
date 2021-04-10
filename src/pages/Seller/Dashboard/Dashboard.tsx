import React from 'react';

import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => (
  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <div data-testid="Dashboard">
      <span>Dashboard Page</span>
    </div>
  </>
);

export default Dashboard;
