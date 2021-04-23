import Button from 'components/Button';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import UploadImage from 'components/UploadImage';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/css/variables';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import { useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { CustomRequestWrapper } from './CustomRequest.styles';

declare interface ICustomRequestProps {}

const CustomRequest: React.FC = (props: ICustomRequestProps) => {
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [SellerId, setSellerId] = useState<string>('')
  const [Error, setError] = useState<string>('')
  const [sellers, setSellers] = useState<any []>([])

  const submit = async () => {
    setError('')
    setSuccess(false)
    if (!SellerId) {
      setError('Select Seller')
      return
    }
    if (!name) {
      setError('Enter Wine Name')
      return
    }
    setLoading(true)
      const response = await fetch(API + ENDPOINTS.CUSTOM_REQUEST, {
      method: METHODS.POST,
      headers: {
        Authorization: 'Bearer ' + token
        },
      body: JSON.stringify({name: name, request_img_url: imgUrl, seller_id: SellerId})
    })
    setLoading(false)
    setSuccess(true)
    setName('')
  }

  const getSellers = async () => {
    const response = await fetch(API + ENDPOINTS.SELLERS, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
        },
    })

    const data = await response.json()

    setSellers(data.body.sellers)
  }
  useEffect(() => {
    getSellers()
  }, [])

  return (
    <CustomRequestWrapper data-testid="CustomRequest" success={success}>
      <Navbar />
      <section className="content">
        {success && <p className="success">Request placed!</p>}
        {Error && <p className="error">{Error}!</p>}
        <h1>Make a wine request</h1>
        <select name="seller" value={SellerId} onChange={(e) => setSellerId(e.target.value)}>
          <option value={sellers[0]?.id}>Select Seller</option>
          {sellers.map(seller => (
            <option className="seller" key={seller.id} value={seller.id}>{seller.username}</option>
          ))}
        </select>
        <UploadImage setImgUrl={setImgUrl} dir="custom-requests"/>
        <input type="text" placeholder="Name of wine" value={name} onChange={(e) => setName(e.target.value)}/>
        <Button text="Place Request" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={submit}/>
        <Button text="Go Back" color={CSSVARIABLES.primaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => window.history.back()} />
      </section>
      <Footer />
    </CustomRequestWrapper>
  )
};

export default CustomRequest;
