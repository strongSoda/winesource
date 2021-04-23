import Button from 'components/Button';
import Chat from 'components/Chat';
import Navbar from 'components/Navbar';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/css/variables';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import { useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { BuyerOrdersWrapper } from './BuyerOrders.styles';
import ROUTES from 'global/constants/routes';
import Footer from 'components/Footer';

declare interface IBuyerRequestsProps {}

const BuyerOrders: React.FC = (props: IBuyerRequestsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [orders, setOrders] = useState<any []>([])
  const [order, setOrder] = useState<any>({})
  const [custom_request, setRequest] = useState<any>({})
  const [cancelling, setCancelling] = useState<boolean>(false)

  async function getRequests() {      
    setLoading(true)
    const response = await fetch(API + ENDPOINTS.BUYER_ORDERS, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
        },
    })

    const result = await response.json()
    setOrders(result.body.orders)
    setLoading(false)
  }

  useEffect(() => {
    getRequests()
  }, [])
  
  const cancel = async (id: number) => {
    setCancelling(true)
    const response = await fetch(API + ENDPOINTS.BUYER_CANCEL_CUSTOM_REQUEST, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"custom_request_id": id})
    })

    const result = await response.json()
    setCancelling(false)
    // alert("Request Cancelled")
    getRequests()
  }
  
  return (
    <BuyerOrdersWrapper data-testid="BuyerRequests">
      <Navbar />
      <section className="content">
        <h1>My Orders</h1>
        {!loading ?
        <section className="requests">
            {orders.map(order => (
              <div className="request" key={order.id}>
                <img src={order.product_img} alt={order.product_name}/>
                <p><strong>{order.product_name}</strong></p>
                <section className="details">
                  <p>Date Ordered: <span className="value">{moment(order.date_created).format('MMM DD, YYYY hh:mm a')}</span></p>
                  <p>Cases: <span className="value">{order.number_of_cases}</span></p>
                  <p>Status: <span className="value">{order.status}</span></p>
                  {(order.status === 'CANCELLED') && order?.admin_cancellation_reason && 
                    <p>Reason: <em>{order.admin_cancellation_reason}</em></p>
                  }
                </section>
                <section className="actions">
                    {(order.status === 'PLACED' || order.status === 'ACCEPTED') && 
                  <section className="inline">
                      <Button text="Customer Chat" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => {
                        setOrder(order)
                        setShowChat(true)
                      }}
                      />
                      {/* <Button text="Cancel Request" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cancel(order.id)}/> */}
                  </section>
                    }
                  {/* {(order.status === 'FULFILLED') &&
                    <a href={ROUTES.PRODUCT + '/1'}><Button text="See Quotation" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} /></a>
                  } */}
                  </section>

              </div>
            ))}

            {showChat && <Chat owner={order} showChat={setShowChat} sender="BUYER" ownerType="order"/>}
        </section>
        :
        'loading...'
        }
      </section>
      <Footer />
    </BuyerOrdersWrapper>
  )
};

export default BuyerOrders;
