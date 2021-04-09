import React from 'react';
import {  StyledWrapper } from './App.styles';

import { Link } from 'react-router-dom';
import ROUTES from 'global/constants/routes';

const App: React.FC = () => {
  return (
    <StyledWrapper>
      <h1>Hello</h1>
          {ROUTES.map((route) => (
      <div style={{marginTop: '20px'}}>
        <Link to={route.link}>
          {route.name}
        </Link>
      </div>
    ))}
    </StyledWrapper>
  );
};

export default App;
