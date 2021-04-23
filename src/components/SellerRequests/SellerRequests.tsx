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

import { SellerRequestsWrapper } from './SellerRequests.styles';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Searchview from 'components/Searchview';

declare interface ISellerRequestsProps {}

const SellerRequests: React.FC = (props: ISellerRequestsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [sendQuote, setSendQuote] = useState<boolean>(false)
  const [cancelling, setCancelling] = useState<boolean>(false)
  const [quoting, setQuoting] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [requests, setRequests] = useState<any []>([])
  const [custom_request, setRequest] = useState<any>({})
  const [query, setQuery] = useState<string>('')
  const [searching, setSearching] = useState<boolean>(false)
  const [rows, setRows] = useState<any []>([])
  const [Filter, setFilter] = useState('PLACED')
  
  async function getRequests() {
    setLoading(true)
    const response = await fetch(API + ENDPOINTS.SELLER_CUSTOM_REQUEST, {
        method: METHODS.GET,
        headers: {
          Authorization: 'Bearer ' + token
          },
      })

    const result = await response.json()
    const data = result.body.requests.filter((request: any) => {
      if (request.status == Filter) {
        return request
      }
    })    
    setRequests(data)
    setLoading(false)
  }
  
  useEffect(() => {
    getRequests()
  }, [Filter])

  const cancel = async (id: number) => {
    setCancelling(true)
    let reason = prompt("Reason for cancellation:")
    if(!reason) return
    const response = await fetch(API + ENDPOINTS.SELLER_CANCEL_CUSTOM_REQUEST, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"custom_request_id": id, admin_cancellation_reason: reason})
    })

    const result = await response.json()
    setCancelling(false)
    alert("Request Cancelled")
    getRequests()
  }

  const search = async () => {
    if (!query) return
    setSearching(true)
    const response = await fetch(API + ENDPOINTS.PRODUCTS + '?query=' + query, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
      },
    })
    const result = await response.json()
    setRows(result.body.products);
    setSearching(false)
  }
  
  const quote = async (id: number) => {
    setQuoting(true)
    const response = await fetch(API + ENDPOINTS.QUOTATION, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({"custom_request_id": custom_request.id, product_id: id})
    })

    const result = await response.json()
    setQuoting(false)
    alert("Quote Sent")
    setSendQuote(false)
    getRequests()
  }

  return (
    <SellerRequestsWrapper data-testid="SellerRequests">
      <Navbar />
      
      <section className="content">
        {!sendQuote ?
        <>
            <h1>My Requests</h1>
        <select name="status" value={Filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="PLACED">PLACED</option>
          <option value="FULFILLED">FULFILLED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        {!loading ?
        <section className="requests">
            {requests.map(request => (
              <div className="request" key={request.id}>
                <img src={request.request_img_url} alt={request.name}/>
                <p><strong>{request.name}</strong></p>
                <section className="details">
                  <p>Date Requested: <span className="value">{moment(request.date_created).format('MMM DD, YYYY hh:mm a')}</span></p>
                </section>

                {request.status === 'PLACED' && 
                  <section className="actions">
                    <section className="inline">
                      <Button text="Customer Chat" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => {
                        setRequest(request)
                        setShowChat(true)
                      }} />
                      <Button text="Cancel Request" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cancel(request.id)}/>
                    </section>
                    <Button text="Send Quote" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => {
                      setQuery(request.name)
                      setSendQuote(true)
                      setRequest(request)
                    }} />
                  </section>
                }
              </div>
            ))}

            {showChat && <Chat owner={custom_request} showChat={setShowChat} sender="SELLER" ownerType="custom_request"/>}
        </section>
        :
        'loading...'
            }
          </>
          :
          <section className="quotation">
            <h1><FontAwesomeIcon className="icon__back" icon={faArrowLeft} onClick={() => setSendQuote(false)} /> Quotation</h1>
            <div className="search__container">
              <input type="text" placeholder="What are you looking for?" value={query} onChange={(e) => setQuery(e.target.value)} />
              <button onClick={search}>{searching?'Searching...':'Search'}</button>
            </div>
            
          {rows?.length ?
            <section className="search_result">
              <section className="wines">
                {rows.map(row => (
                  <div className="wine" key={row.id}>
                    <img src={row.img_url} alt={row.name} />
                    <p>{row.name}</p>
                    <div className="prices">
                      <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                      <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                    </div>
                    <Button text="Send in quotation" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => quote(row.id)} />
                  </div>
                ))}
              </section>
            </section>
            :
            <section>
              <p>Search Wines in Inventory</p>
            </section>
          }
          </section>
        }
      </section>
    </SellerRequestsWrapper>
  )
};

export default SellerRequests;
