import Button from 'components/Button';
import Navbar from 'components/Navbar';
import CSSVARIABLES from 'global/constants/css/variables';
import ROUTES from 'global/constants/routes';
import React from 'react';
import { useHistory } from 'react-router';

import { OrderSuccessWrapper } from './OrderSuccess.styles';

declare interface IOrderSuccessProps {}

const OrderSuccess: React.FC = (props: IOrderSuccessProps) => {
  const history = useHistory()
  
  return (
    <OrderSuccessWrapper data-testid="OrderSuccess">
      <Navbar />
      <section className="content">
        <h1>Order Successful</h1>
        <img src="https://www.liveabout.com/thmb/d7o0KXv8Zf-oaDVbcm25pv8lDGQ=/640x480/filters:no_upscale():max_bytes(150000):strip_icc()/amy-wine-5978e4b1d088c000105eb42e.gif"/>
      
        <section className="actions">
          <Button text="Continue Shopping" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
                history.push(ROUTES.DISCOVER)
          }} />
          <Button text="See Orders" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => history.push(ROUTES.BUYER_ORDERS)} />
        </section>
      </section>
    </OrderSuccessWrapper>
  )
};

export default OrderSuccess;
