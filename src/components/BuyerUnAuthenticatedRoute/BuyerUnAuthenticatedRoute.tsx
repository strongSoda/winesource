import ROUTES from 'global/constants/routes';
import React from 'react';
import { Redirect, Route } from 'react-router';

import { BuyerUnAuthenticatedRouteWrapper } from './BuyerUnAuthenticatedRoute.styles';

declare interface IAuthenticatedRouteProps {
  component: React.FC,
  isAuthenticated: boolean,
  componentProps?: any,
  path: string
}

const BuyerUnAuthenticatedRoute: React.FC<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const C = props.component;
  const isAuthenticated = props.isAuthenticated
  const componentProps = props.componentProps

  return (
    <BuyerUnAuthenticatedRouteWrapper data-testid="AuthenticatedRoute">
      <Route
        {...componentProps}
        render={() =>
          isAuthenticated
            ? <Redirect to={ROUTES.DISCOVER} />
            : <C {...props} {...componentProps} />}
      />
    </BuyerUnAuthenticatedRouteWrapper>
  )
};

export default BuyerUnAuthenticatedRoute;
