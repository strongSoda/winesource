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
import Inventory from 'components/Inventory';
import Profile from 'components/Profile';
import CustomRequest from 'components/CustomRequest';
import BuyerRequests from 'components/BuyerRequests';
import SellerRequests from 'components/SellerRequests';
import Product from 'components/Product';
import OrderDetails from 'components/OrderDetails';
import OrderConfirm from 'components/OrderConfirm';
import OrderPaymentInfo from 'components/OrderPaymentInfo';
import Cart from 'components/Cart';
import OrderShippingInfo from 'components/OrderShippingInfo';
import OrderSuccess from 'components/OrderSuccess';
import BuyerOrders from 'components/BuyerOrders';
import SellerOrders from 'components/SellerOrders';

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

        <BuyerUnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.USER_SIGNUP} component={Register} />
        <BuyerUnAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.USER_LOGIN} component={Signin} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.VERIFY_OTP} component={Otp} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.DISCOVER} component={Discovery} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.PROFILE} component={Profile} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.USER_CUSTOM_REQUEST} component={CustomRequest} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.BUYER_REQUESTS} component={BuyerRequests} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.ORDER_DETAILS} component={OrderDetails} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.ORDER_CONFIRMATION} component={OrderConfirm} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.ORDER_SHIPPING_INFO} component={OrderShippingInfo} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.ORDER_PAYMENT_INFO} component={OrderPaymentInfo} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.ORDER_SUCCESS} component={OrderSuccess} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.BUYER_ORDERS} component={BuyerOrders} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path={ROUTES.CART} component={Cart} />
        <BuyerAuthenticatedRoute isAuthenticated={loggedin} path='/p/:id' component={Product} />

        <SellerUnAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_SIGNUP} component={AdminSignup} />
        <SellerUnAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_LOGIN} component={AdminLogin} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_VERIFY_OTP} component={Otp} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_DASHBOARD} component={Dashboard} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_INVENTORY} component={Inventory} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_PROFILE} component={Profile} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_HOME} component={PriceCheck} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.ADMIN_REQUESTS} component={SellerRequests} />
        <SellerAuthenticatedRoute isAuthenticated={loggedin} isAdmin={isAdmin} path={ROUTES.SELLER_ORDERS} component={SellerOrders} />

        <Redirect to={ROUTES.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default AppRouterSwitch;
