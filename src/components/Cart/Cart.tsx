import { faMinusSquare, faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import Navbar from 'components/Navbar';
import { changeNumberOfCases, remove } from 'features/cartSlice';
import { setOrder } from 'features/orderSlice';
import CSSVARIABLES from 'global/constants/css/variables';
import ROUTES from 'global/constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { CartWrapper } from './Cart.styles';

declare interface ICartProps {}

const Cart: React.FC = (props: ICartProps) => {
  const CART = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch()
  const cases: any[] = []
  const [subtotal, setSubtotal] = useState<number>(0)
  const user = useAppSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    let i: any;
    for (i in CART.items) {      
      cases.push(CART.items[i].number_of_cases)
    }
    // console.log(cases);

    calcSubtotal()
  }, [CART.items])

  const calcSubtotal = () => {
    let i: any;
    let subtotal = 0;
    for (i in CART.items) {
      // console.log(CART.items[i].winesource_price, CART.items[i].case_size, CART.items[i].number_of_cases);
      
      subtotal += (CART.items[i].winesource_price*CART.items[i].case_size*CART.items[i].number_of_cases)
    }
    setSubtotal(subtotal)
    }
  
  const order = () => {
    dispatch(setOrder({
      stripe_customer_id: user.profile.stripe_customer_id,
      customer_name: user.profile.fname + ' ' + user.profile.lname,
      payment_method_id: '',
      items: CART.items
    }))
    history.push(ROUTES.ORDER_DETAILS)
    }
  
  return (
    <CartWrapper data-testid="Cart">
      <Navbar />
      <section className="content">
        <h1>My Cart</h1>
        {/* <table className="items">
          <thead>
          <tr>
              <th>Wine</th>
              <th>Unit Price</th>
              <th>Case</th>
              <th>Final Price</th>
              <th>Remove</th>
            </tr>
          </thead> */}
        {/* <section className="cart_header">
          <p>Wine</p>
          <p className="unit_price">Unit Price</p>
          <p className="cases">Case</p>
          <p>Final Price</p>
        </section> */}
          {CART.items.length ?        
          <section className="items">
              
            <section className="summary">
              <h2>Cart Total: ${subtotal}</h2>
              <Button text="Place Order" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => order()} />
            </section>
              {CART.items.map((item, index) => (
                <div className="item" key={index}>
                  <img src={item.product_img} alt={item.product_name} />
                  <p><strong>{item.product_name}</strong></p>
                  <section className="details">
                    <p>Price per bottle: <span className="value">${item.winesource_price}</span></p>
                    <p>Cases: <span className="value">
                      <FontAwesomeIcon className="icon__plus" icon={faPlusSquare}
                        onClick={() => dispatch(changeNumberOfCases({ "item_index": index, "num_cases": item.number_of_cases + 1 }))}
                      /> <span>{item.number_of_cases}</span>
                      <FontAwesomeIcon className="icon__minus" icon={faMinusSquare}
                        onClick={() => {
                          if (!(item.number_of_cases - 1)) return
                          dispatch(changeNumberOfCases({ "item_index": index, "num_cases": item.number_of_cases - 1 }))
                        }}
                      />
                    </span></p>
                    <p>Total Price: <span className="value">${item.winesource_price * item.case_size * item.number_of_cases}</span></p>
                  </section>
                  <section className="actions">
                    {/* <section className="inline">
                      <Button text="Customer Chat" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => {
                        setRequest(request)
                        setShowChat(true)
                      }}
                      />
                      <Button text="Cancel Request" color={CSSVARIABLES.secondaryColor} bgColor={CSSVARIABLES.primaryBackground} onClick={() => cancel(request.id)}/>
                  </section> */}
                    <Button text="Remove" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={
                      () => {
                        dispatch(remove(index))
                      }
                    } />
                  </section>

                </div>
              ))}
            </section>
            : <h1>Cart Empty</h1>}
      </section>
    </CartWrapper>
  )
};

export default Cart;
