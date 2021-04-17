import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import { SellerUnAuthenticatedRouteWrapper } from './SellerUnAuthenticatedRoute.styles';

declare interface IAuthenticatedRouteProps {
  component: React.FC,
  isAuthenticated: boolean,
  isAdmin: string,
  componentProps?: any,
  path: string
}

const SellerUnAuthenticatedRoute: React.FC<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const C = props.component;
  const isAuthenticated = props.isAuthenticated
  const componentProps = props.componentProps
  const isAdmin = props.isAdmin

  return (
    <SellerUnAuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route
        {...componentProps}
        render={() =>
          isAuthenticated && isAdmin === 'True'
            ? <Redirect to={ROUTES.ADMIN_HOME} />
            : <C {...props} {...componentProps} />}
      />
    </SellerUnAuthenticatedRouteWrapper>
  )
};

export default SellerUnAuthenticatedRoute;
