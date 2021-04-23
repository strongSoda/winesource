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

import { BuyerRequestsWrapper } from './BuyerRequests.styles';
import ROUTES from 'global/constants/routes';

declare interface IBuyerRequestsProps {}

const BuyerRequests: React.FC = (props: IBuyerRequestsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [requests, setRequests] = useState<any []>([])
  const [custom_request, setRequest] = useState<any>({})
  const [cancelling, setCancelling] = useState<boolean>(false)

  async function getRequests() {      
    setLoading(true)
    const response = await fetch(API + ENDPOINTS.BUYER_CUSTOM_REQUEST, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
        },
    })

    const result = await response.json()
    setRequests(result.body.requests)
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
    alert("Request Cancelled")
    getRequests()
  }
  
  return (
    <BuyerRequestsWrapper data-testid="BuyerRequests">
      <Navbar />
      <section className="content">
        <h1>My Requests</h1>
        {!loading ?
        <section className="requests">
            {requests.map(request => (
              <div className="request" key={request.id}>
                <img src={request.request_img_url} alt={request.name}/>
                <p><strong>{request.name}</strong></p>
                <section className="details">
                  <p>Date Requested: <span className="value">{moment(request.date_created).format('MMM DD, YYYY hh:mm a')}</span></p>
                  <p>Status: <span className="value">{request.status}</span></p>
                  {(request.status === 'CANCELLED') && request?.admin_cancellation_reason && 
                    <p>Reason: <em>{request.admin_cancellation_reason}</em></p>
                  }
                </section>
                <section className="actions">
                    {(request.status === 'PLACED') && 
                  <section className="inline">
                      <Button text="Customer Chat" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => {
                        setRequest(request)
                        setShowChat(true)
                      }}
                      />
                      <Button text="Cancel Request" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cancel(request.id)}/>
                  </section>
                    }
                  {(request.status === 'FULFILLED') &&
                    <a href={ROUTES.PRODUCT + '/' + request.quotation_id}><Button text="See Quotation" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} /></a>
                  }
                  </section>

              </div>
            ))}

            {showChat && <Chat owner={custom_request} showChat={setShowChat} sender="BUYER" ownerType="custom_request"/>}
        </section>
        :
        'loading...'
        }
      </section>
    </BuyerRequestsWrapper>
  )
};

export default BuyerRequests;
