import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import { AuthenticatedRouteWrapper } from './BuyerAuthenticatedRoute.styles';

declare interface IAuthenticatedRouteProps {
  component: React.FC,
  isAuthenticated: boolean,
  componentProps?: any,
  path: string
}

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
            ? <C {...props} {...componentProps} />
            : <Redirect to={ROUTES.USER_LOGIN} />}
      />
    </AuthenticatedRouteWrapper>
  )
};

export default BuyerAuthenticatedRoute;
