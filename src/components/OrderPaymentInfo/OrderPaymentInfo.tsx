import Navbar from 'components/Navbar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { cancel, create, changeNumberOfCases, add_payment_method, chargeOrder, confirmIntent } from 'features/orderSlice';

import Button from 'components/Button';
import CSSVARIABLES from 'global/constants/css/variables';
import ROUTES from 'global/constants/routes';

import { OrderPaymentInfoWrapper } from './OrderPaymentInfo.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import METHODS from 'global/constants/restMethods';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

declare interface IOrderPaymentInfoProps { }

const OrderPaymentInfo: React.FC = (props: IOrderPaymentInfoProps) => {
  const stripe = useStripe();
  const token = useAppSelector(state => state.user.token)
  const profile = useAppSelector(state => state.user.profile)
  const [PaymentMethods, setPaymentMethods] = useState<any []>([])
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [Id, setID] = useState<string>('')
  const [Error, setError] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [placingOrder, setPlacingOrder] = useState<boolean>(false)
  const history = useHistory()
  const dispatch = useAppDispatch()

  const getPaymentMethods = async () => {
    setLoading(true)
    const response = await fetch(API + ENDPOINTS.PAYMENT_METHODS + "/" + profile.stripe_customer_id, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
      },
    })
    
    const data = await response.json()
    // console.log(data.body.payment_methods.data);
    setPaymentMethods(data.body.payment_methods.data)
    setLoading(false)
  }

  useEffect(() => {
    if (!showAdd) {
      getPaymentMethods()
    }
    }, [showAdd])
  
  const order = async () => {
    setError('')
    if (!stripe) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setPlacingOrder(false)
      return;
    }
    if (!Id) {
        alert('Select a payment method')
        return
    }
    setPlacingOrder(true)
    try {
      const response = await dispatch(chargeOrder(token))
      if (response?.payload?.status === 'FAILURE') {
        setPlacingOrder(false)
        setError(response?.payload.message)

        return
      }
      else if (response?.payload?.body.requiresAction) {
        // Use Stripe.js to handle required card action
        const result = await stripe.handleCardAction(
          response?.payload?.body.clientSecret
        )

        if (result.error) {
          setPlacingOrder(false)
          setError(result.error.message)
          return
        }
        else {
          const response = await dispatch(confirmIntent({"token": token, "payment_intent_id": result.paymentIntent.id}))
          if (response?.payload?.status === 'FAILURE') {
            setPlacingOrder(false)
            setError(response?.payload.message)
            return
          }    
        }
      }
      
      setPlacingOrder(false)
      history.push(ROUTES.ORDER_SUCCESS)
    }
    catch (e) {
      setError(e)
      console.log(e);
      setLoading(false)
    }
  }

  return (
    <OrderPaymentInfoWrapper data-testid="OrderPaymentInfo" id={Id}>
      <Navbar />
      <section className="content">
        {!loading ? 
          <>
            <h1>Select Payment Method</h1>
            {Error && <p className="error">{Error}</p>}
            {!showAdd ?
              <section className="payment_methods">
              {PaymentMethods?.length ?
                  <>{PaymentMethods?.map(method => (
                    <div key={method.id} className="method" onClick={() => {
                      console.log(method.id);
                      dispatch(add_payment_method(method.id))
                      setID(method.id)
                    }}>
                      <FontAwesomeIcon id={method.id} className="icon__selected" icon={faCircleNotch} onClick={() => {}}/>
                      <span>{method.card.brand} {'*'.repeat(13)}{method.card.last4}</span>
                  </div>
                  ))}
                    <div className="wrapper">
                    <Button text="Add Card" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
                      setShowAdd(true)
                    }} />
                    </div>
                  </>
              :
                <section className="zero_methods">              
                  <p>You haven't added any payment methods</p>
                  <Button text="Add Card" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
                    setShowAdd(true)
                  }} />
                </section>
              }
              {/* <p><FontAwesomeIcon className="icon__selected" icon={faCircleNotch} onClick={getAddress}/> {address.line1}, {address.line2}, {address.city}, {address.state}, {address.country}, {address.zip}</p> */}
              
                      <section className="actions">
          <Button text="Back" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
                window.history.back()
          }} />
          <Button text="Place Order" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={order} />
        </section>
              </section>
              :
              <CardForm setShowAdd={setShowAdd} setError={setError}/>
            }
          </>
        : 'loading...'}
        </section>
    </OrderPaymentInfoWrapper>
  )
};

interface CardFormProps {
  setShowAdd: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<string | undefined>) => void
}

const CardForm: React.FC<CardFormProps> = (props: CardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = useAppSelector(state => state.user.token)
  const profile = useAppSelector(state => state.user.profile)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    props.setError('')
    setLoading(true)
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setLoading(false)
      props.setError('Error. Try Again!')
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      "type": 'card',
      // @ts-ignore
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setLoading(false)
      props.setError(error.message)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    
    const response = await fetch(API + ENDPOINTS.ATTACH_PAYMENT_METHOD, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
      },
      // @ts-ignore
      body: JSON.stringify({"stripe_customer_id": profile.stripe_customer_id, "payment_method_id": paymentMethod.id})
    })
    
    const data = await response.json()
      console.log(data);
    
      if (data.status === "FAILURE") {
        props.setError(data.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)
    props.setShowAdd(false)
  };

  return (
    <section className="card_form">
      <h4>Add New Card</h4>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button className="addCard" type="submit" disabled={!stripe}>
            {!loading? 'Add Card' : 'loading...'}
        </button>
        
        </form>
        <button className="addCard" onClick={() => props.setShowAdd(false)}>
            Cancel
          </button>
    </section>
  )
} 

export default OrderPaymentInfo;
