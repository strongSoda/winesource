import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import usePageViews from 'hooks/usePageViews';

import ROUTES from 'global/constants/routes';

import Counter from 'pages/counter';
import Home from 'pages/Home/Home.lazy';
import NotFoundPage from 'pages/NotFound/NotFound.lazy';
import Register from 'pages/Buyer/Signup/Register.lazy';
import Discovery from 'pages/Buyer/Discover/Discover.lazy';
import Signin from 'pages/Buyer/Signin/Signin.lazy';
import AdminSignup from 'pages/Seller/Signup/Register.lazy';
import AdminLogin from 'pages/Seller/Signin/Signin.lazy';
import Dashboard from 'pages/Seller/Dashboard/Dashboard.lazy';

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
        <Route exact path={ROUTES.ADMIN_DASHBOARD} component={Dashboard} />
        <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
        <Redirect to={ROUTES.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
