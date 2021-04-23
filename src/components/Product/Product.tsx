import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import Navbar from 'components/Navbar';
import { add } from 'features/cartSlice';
import { cancel, create, setOrder } from 'features/orderSlice';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/css/variables';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import ROUTES from 'global/constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { ProductWrapper } from './Product.styles';

declare interface IProductProps {}

const Product: React.FC = (props: IProductProps) => {
  const productId = window.location.pathname.split('/').pop()
  const user = useAppSelector(state => state.user)
  const token = useAppSelector(state => state.user.token)
  const [product, setProduct] = useState<any>({})
  const [cases, setCases] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const CART = useAppSelector(state => state.cart);

  useEffect(() => {
              
    async function getProduct() {
      setLoading(true)
      const response = await fetch(API + ENDPOINTS.PRODUCT + '/' + productId, {
            method: METHODS.GET,
            headers: {
              Authorization: 'Bearer ' + token
            },
          })
      const data = await response.json()
      setProduct(data.body.product)
      setLoading(false)
    }

    getProduct()

    console.log(isCarted(product, CART.items));
    
  }, [])
  
  const order = () => {
    if (!cases) {
      alert("Order must have at least 1 case.")
      return
    }
    dispatch(setOrder({
      stripe_customer_id: user.profile.stripe_customer_id,
      customer_name: user.profile.fname + ' ' + user.profile.lname,
      payment_method_id: '',
      items: [{
        product_id: parseInt(product.id),
        product_name: product.name,
        product_img: product.img_url,
        number_of_cases: cases,
        case_size: parseInt(product.case_size),
        winesource_price: parseInt(product.winesource_price),
        seller_id: parseInt(product.seller_id)
      }]
    }))
    history.push(ROUTES.ORDER_DETAILS)
  }

  const cart = () => {    
    dispatch(add({
        product_id: parseInt(product.id),
        product_name: product.name,
        product_img: product.img_url,
        number_of_cases: cases,
        case_size: parseInt(product.case_size),
        winesource_price: parseInt(product.winesource_price),
        seller_id: parseInt(product.seller_id)
    }))
    alert('Added to Cart!')
  }

  function isCarted(obj: any, list: any[]) {
    console.log(obj, list);
    
    let i;
    for (i = 0; i < list.length; i++) {
      console.log(list[i]);
      
        if (list[i].product_id == obj.id) {
            return true;
        }
    }
    return false;
  }
  
  return (
    <ProductWrapper data-testid="Product">
      <Navbar />
      <section className="content">
        {!loading ?
          <section className="product">
            <div>
              <img src={product.img_url} alt={product.name}/>
            </div>
            <div className="details">
              <h1>{product.name}</h1>
              <h3 className="prices">
                Price:
                  <span className="price">${parseFloat(product.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(product.average_price).toFixed(2)}</span>
              </h3>
              <h3>Case Size: {product.case_size}</h3>
              <h3>No. of Cases: <input className="cases_input" type="number" value={cases} min="1" onChange={e => setCases(parseInt(e.target.value))}/></h3>
              
              <Button text="Buy Now" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => order()} />
              {
                isCarted(product, CART.items) ? 
                <p className="in_cart" onClick={() => history.push(ROUTES.CART)}><FontAwesomeIcon className="icon__back" icon={faCheck} /> In Cart</p>
                :
                <Button text="Add to Cart" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cart()} />
              }
              
            </div>
          </section>
        : 'loading...'}
      </section>
    </ProductWrapper>
  )
};

export default Product;
