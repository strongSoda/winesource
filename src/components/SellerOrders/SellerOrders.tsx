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

import { SellerOrdersWrapper } from './SellerOrders.styles';
import ROUTES from 'global/constants/routes';

declare interface IBuyerRequestsProps {}

const SellerOrders: React.FC = (props: IBuyerRequestsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [orders, setOrders] = useState<any []>([])
  const [order, setOrder] = useState<any>({})
  const [custom_request, setRequest] = useState<any>({})
  const [cancelling, setCancelling] = useState<boolean>(false)
  const [accepting, setAccepting] = useState<boolean>(false)

  const [Filter, setFilter] = useState('PLACED')

  async function getRequests() {      
    setLoading(true)
    const response = await fetch(API + ENDPOINTS.SELLER_ORDERS, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
        },
    })

    const result = await response.json()
    const data = result.body.orders.filter((order: any) => {
      if (order.status == Filter) {
        return order
      }
    }) 
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    
    getRequests()
  }, [Filter])
  
  const cancel = async (id: number) => {
    setCancelling(true)
    let reason = prompt("Reason for cancellation:")
    if(!reason) return
    const response = await fetch(API + ENDPOINTS.SELLER_CANCEL_ORDER, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"order_id": id, "admin_cancellation_reason": reason})
    })

    const result = await response.json()
    setCancelling(false)
    alert("Order Cancelled")
    getRequests()
  }
  
  const accept = async (id: number) => {
    setAccepting(true)
    const response = await fetch(API + ENDPOINTS.SELLER_ACCEPT_ORDER, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"order_id": id})
    })

    const result = await response.json()
    setAccepting(false)
    alert("Order Accepted")
    getRequests()
  }

  const complete = async (id: number) => {
    setAccepting(true)
    const response = await fetch(API + ENDPOINTS.SELLER_COMPLETE_ORDER, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"order_id": id})
    })

    const result = await response.json()
    setAccepting(false)
    alert("Order Completed")
    getRequests()
  }
  
  return (
    <SellerOrdersWrapper data-testid="BuyerRequests">
      <Navbar />
      <section className="content">
        <h1>My Orders</h1>
        <select name="status" value={Filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="PLACED">PLACED</option>
          <option value="ACCEPTED">ACCEPTED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
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
                  <p>Shipping Address: <span className="value"><em>{order.line1}, {order.line2}, {order.city}, {order.state}, {order.country}, {order.postal_code}</em></span></p>
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
                      <Button text="Cancel Order" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cancel(order.id)}/>
                  </section>
                    }
                  {(order.status === 'PLACED') &&
                    <Button text="Accept Order" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => accept(order.id)}/>
                  }
                  {(order.status === 'ACCEPTED') &&
                    <Button text="Complete Order" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => complete(order.id)}/>
                  }
                  </section>

              </div>
            ))}

            {showChat && <Chat owner={order} showChat={setShowChat} sender="SELLER" ownerType="order"/>}
        </section>
        :
        'loading...'
        }
      </section>
    </SellerOrdersWrapper>
  )
};

export default SellerOrders;
