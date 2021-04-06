import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import usePageViews from 'hooks/usePageViews';
import Counter from 'pages/counter';
import Home from 'pages/home';
import NotFoundPage from 'pages/notfound';
import Register from 'pages/signup';
import Discovery from 'pages/discover';
import Signin from 'pages/signin';

const AppRouterSwitch: React.FC = () => {
  usePageViews();
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/discover" component={Discovery} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
