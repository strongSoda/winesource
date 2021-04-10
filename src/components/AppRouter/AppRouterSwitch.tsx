import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import usePageViews from 'hooks/usePageViews';
import Counter from 'pages/counter';
import Home from 'pages/home';
import NotFoundPage from 'pages/notfound';
import Register from 'pages/signup';
import Discovery from 'pages/discover';
import Signin from 'pages/signin';
import AdminSignup from 'components/AdminSignup';
import AdminLogin from 'components/AdminLogin';
import ROUTES from 'global/constants/routes';

const AppRouterSwitch: React.FC = () => {
  usePageViews();
  return (
    <div>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path={ROUTES.USER_SIGNUP} component={Register} />
        <Route exact path={ROUTES.USER_LOGIN} component={Signin} />
        <Route exact path={ROUTES.ADMIN_SIGNUP} component={AdminSignup} />
        <Route exact path={ROUTES.ADMIN_LOGIN} component={AdminLogin} />
        <Route exact path={ROUTES.DISCOVER} component={Discovery} />
        <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
        <Redirect to={ROUTES.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
