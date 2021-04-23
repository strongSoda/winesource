import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import { AuthenticatedRouteWrapper } from './BuyerAuthenticatedRoute.styles';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

declare interface IAuthenticatedRouteProps {
  component: React.FC,
  isAuthenticated: boolean,
  componentProps?: any,
  path: string
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IgB8xJ5aachBmeqao5lSzyv4aHp8zsLEqfdxnOs0XlmLKMHWpHgrslykAAMGN7ilRlC3djzRWPHZ7258bwomACp00KwOkFZ0h');

const BuyerAuthenticatedRoute: React.FC<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const C = props.component;
  const isAuthenticated = props.isAuthenticated
  const componentProps = props.componentProps

  return (
    <AuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route
        {...componentProps}
        render={() =>
          isAuthenticated
            ?
          <Elements stripe={stripePromise}>
              <C {...props} {...componentProps} />
          </Elements>
            : <Redirect to={ROUTES.USER_LOGIN} />}
      />
    </AuthenticatedRouteWrapper>
  )
};

export default BuyerAuthenticatedRoute;
