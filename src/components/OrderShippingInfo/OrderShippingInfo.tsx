import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddressSearch from 'components/AddressSearch';
import Button from 'components/Button';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { add_shipping_address } from 'features/orderSlice';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/css/variables';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import ROUTES from 'global/constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { OrderShippingInfoWrapper } from './OrderShippingInfo.styles';

declare interface IOrderShippingInfoProps {}

const OrderShippingInfo: React.FC = (props: IOrderShippingInfoProps) => {
  const profile = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.user.token)
  const [address, setAddress] = useState<any>({})
  const [shippingAddress, setShippingAddress] = useState<any>({})
  const [shipping, setShpping] = useState<boolean>(true)
  
  const [line1, setLine1] = useState<string>('')
  const [line2, setLine2] = useState<string>('')
  const [zip, setZip] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [astate, setAState] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const [addressString, setAddressString] = useState<any>({})
  const history = useHistory()
  const dispatch = useAppDispatch()

 
  const setUserAddress = (line1: string, line2: string, lat: number, lng: number, city: string, state: string, country: string, zip: string) => {
    // console.log(address, lat, lng, city, state, country);    
    setLine1(line1)
    setLine2(line1)
    setLat(lat)
    setLng(lng)
    setCity(city)
    setAState(state)
    setCountry(country)
    setZip(line1)

    
    setShippingAddress({
      "line1": line1,
      "line2": line2,
      "postal_code": zip,
      "city": city,
      "state": state,
      "country": country,
    })
    
    dispatch(add_shipping_address({
      "line1": line1,
      "line2": line2,
      "postal_code": zip,
      "city": city,
      "state": state,
      "country": country,
    }))
    setShpping(false)
  }
  
  const getAddress = async () => {

    const response = await fetch(API + ENDPOINTS.ADDRESS, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
      },
    })
    
    const data = await response.json()
    // console.log(data.body.address);
    setAddress(data.body.address)
    setShippingAddress(data.body.address)
    dispatch(add_shipping_address({
      "line1": data.body.address.line1,
      "line2": data.body.address.line2,
      "postal_code": data.body.address.postal_code,
      "city": data.body.address.city,
      "state": data.body.address.state,
      "country": data.body.address.country,
    }))
    setShpping(true)
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <OrderShippingInfoWrapper data-testid="OrderShippingInfo" shipping={shipping}>
      <Navbar />
      <section className="content">
        <h1>Shipping Details</h1>
        <section className="address" onClick={getAddress}>
          <p><FontAwesomeIcon className="icon__selected" icon={faCircleNotch}/> {address.line1}, {address.line2}, {address.city}, {address.state}, {address.country}, {address.zip}</p>
        </section>
        <section className="add" onClick={() => setShpping(false)}>
          <FontAwesomeIcon className="icon__selected_invert" icon={faCircleNotch}/>
          <AddressSearch setUserAddress={setUserAddress} setAddress={setAddressString}/>
        </section>
        <section className="actions">
          <Button text="Back" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
            window.history.back()
          }} />
          <Button text="Next: Payment Info" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => {
            history.push(ROUTES.ORDER_PAYMENT_INFO)
          }} />
        </section>
      </section>
      <Footer />
    </OrderShippingInfoWrapper>
  )
};

export default OrderShippingInfo;
