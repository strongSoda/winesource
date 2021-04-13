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
import Otp from 'pages/Otp/Otp.lazy';
import BuyerAuthenticatedRoute from 'components/BuyerAuthenticatedRoute';
import { useAppSelector } from 'hooks/storeHooks';
import SellerAuthenticatedRoute from 'components/SellerAuthenticatedRoute';
import PriceCheck from 'components/PriceCheck';
import SellerUnAuthenticatedRoute from 'components/SellerUnAuthenticatedRoute';
import BuyerUnAuthenticatedRoute from 'components/BuyerUnAuthenticatedRoute';

const AppRouterSwitch: React.FC = () => {
  const loggedin = useAppSelector(state => state.user.loggedin)
  const isAdmin = useAppSelector(state => state.user?.profile?.is_admin)

  usePageViews();
  return (
    <div>
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.VERIFY_OTP} component={Otp} />

        <BuyerUnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.USER_SIGNUP} component={Register} />
        <BuyerUnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.USER_LOGIN} component={Signin} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.DISCOVER} component={Discovery} />

        <SellerUnAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_SIGNUP} component={AdminSignup} />
        <SellerUnAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_LOGIN} component={AdminLogin} />
        <Route exact path='/pricecheck' component={PriceCheck} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_DASHBOARD} component={Dashboard} />

        <Redirect to={ROUTES.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
