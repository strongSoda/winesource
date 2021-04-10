import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import { AuthenticatedRouteWrapper } from './SellerAuthenticatedRoute.styles';

declare interface IAuthenticatedRouteProps {
  component: React.FC,
  isAuthenticated: boolean,
  isAdmin: boolean,
  componentProps?: any,
  path: string
}

const SellerAuthenticatedRoute: React.FC<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const C = props.component;
  const isAuthenticated = props.isAuthenticated
  const componentProps = props.componentProps
  const isAdmin = props.isAdmin

  return (
    <AuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route
        {...componentProps}
        render={() =>
          isAuthenticated && isAdmin
            ? <C {...props} {...componentProps} />
            : <Redirect to={ROUTES.ADMIN_LOGIN} />}
      />
    </AuthenticatedRouteWrapper>
  )
};

export default SellerAuthenticatedRoute;
