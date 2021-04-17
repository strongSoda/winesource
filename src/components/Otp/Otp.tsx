import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import ROUTES from 'global/constants/routes';
import { useAppSelector } from 'hooks/storeHooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { OtpWrapper } from './Otp.styles';

declare interface IOtpProps {}

const OTP: React.FC = (props: IOtpProps) => {
  const [Input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [OtpSent, setOtpSent] = useState<boolean>(false)
  const [OtpVerified, setOtpVerified] = useState<boolean>(false)
  const profile = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.user.token)
  const [Error, setCustomError] = useState('')

  const history = useHistory()

  const sendOtp = async () => {
    setCustomError('')
    setLoading(true)
    try {
      const response = await fetch(API + ENDPOINTS.SEND_OTP, {
        method: METHODS.POST,
        headers: {
          // @ts-ignore
          Authorization: 'Bearer ' + token
        }
      })
      setLoading(false)
      const data = await response.json()
  
      if (data.status === 'SUCCESS') {
        setOtpSent(true)
      } else {
        setCustomError(data.message)
      }
    }
    catch (e) {
      setCustomError(e)
      console.error(e)
    }
  }

  const verifyOtp = async () => {
    setCustomError('')
    setLoading(true)

    try {
      const response = await fetch(API + ENDPOINTS.VERIFY_OTP, {
        method: METHODS.POST,
        headers: {
          // @ts-ignore
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({"otp": Input})
      })
  
      setLoading(false)
      const data = await response.json()
  
      if (data.status === 'SUCCESS') {
        setOtpVerified(true)
      } else {
        setOtpSent(false)
        setCustomError(data.message)
      }
    }
    catch (e) {
      // setCustomError(e.)
      console.error(e)
    }
  }

  return (
    <OtpWrapper data-testid="Otp">
      <div className="form__wrapper">
        <header>
          <h3 className="brand">wine source</h3>
        </header>
        <section>
          {OtpSent ?
            <>
              {!OtpVerified ?
                <section>
                  <h2>Verify Account</h2>
                  <div>{Error}</div>
                  <input
                  // type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setInput(e.target.value)}
                  value={Input}
                  placeholder="123456"
                  required
                  />
                  <button onClick={verifyOtp}>{!loading?'Verify':'loading...'}</button>
                </section>
                :
              <section>
                  <h2>OTP Verified</h2>
                  {profile.is_admin === 'True' ? 
                    <button onClick={() => history.push(ROUTES.ADMIN_DASHBOARD)}>Go to site</button>
                    :
                    <button onClick={() => history.push(ROUTES.DISCOVER)}>Go to site</button>
                  }
              </section>
              }
            </>
            :
            <section>
              <h2>Verify Account</h2>
              <div>{Error}</div>
              <p>Send OTP to {profile.phone}</p>
              <button onClick={sendOtp}>{!loading?'Send':'loading...'}</button>
            </section>
          }
        </section>
      </div>
      <div className="banner">
        <h1>Welcome to WineSource</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem optio, error ratione saepe provident fugit nam dolorum temporibus iusto, id quas quo assumenda minus facere perspiciatis quaerat minima modi cum!</p>
      </div>
    </OtpWrapper>
  )
};

export default OTP;
