import React from 'react';

import { OrderConfirmWrapper } from './OrderConfirm.styles';

declare interface IOrderConfirmProps {}

const OrderConfirm: React.FC = (props: IOrderConfirmProps) => {
  return (
    <OrderConfirmWrapper data-testid="OrderConfirm">
      <span>OrderConfirm Component</span>
    </OrderConfirmWrapper>
  )
};

export default OrderConfirm;
