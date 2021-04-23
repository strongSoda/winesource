import Navbar from 'components/Navbar';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { cancel, create, changeNumberOfCases } from 'features/orderSlice';

import Button from 'components/Button';
import CSSVARIABLES from 'global/constants/css/variables';
import ROUTES from 'global/constants/routes';


import { OrderDetailsWrapper } from './OrderDetails.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import Footer from 'components/Footer';

declare interface IOrderDetailsProps {}

const OrderDetails: React.FC = (props: IOrderDetailsProps) => {
    const order = useAppSelector(state => state.order)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const caseMutation: any [] = []
  const cases: any[] = []
  const [subtotal, setSubtotal] = useState<number>(0)
  const shipping_price = 2;

  useEffect(() => {
    // let i: any;
    // for (i in order.items) {      
    //   cases.push(order.items[i].number_of_cases)
    // }
    // console.log(cases);
    calcSubtotal()
  }, [order])

  // const setCases = (num_cases: number, item_index: number) => {
  //   // caseMutation.push({
  //   //   item_index,
  //   //   num_cases
  //   // })

  //   // console.log(caseMutation);
  //   cases[item_index] = num_cases
  //   console.log(cases);
    
  // }

  // const payment = () => {
  //   let i: any;
  //   for (i in cases) {
  //     if (!cases[i] || cases[i]<1 || cases[i]===NaN) {
  //       alert('Invalid Number of Cases for wine: ' + order.items[i].product_name)
  //       return
  //     }

  //     dispatch(changeNumberOfCases({ "item_index": i, "num_cases": cases[i] }))
  //     history.push(ROUTES.ORDER_PAYMENT_INFO)
  //   }
  // }

  const calcSubtotal = () => {
    let i: any;
    let subtotal = 0;
    for (i in order.items) {
      // console.log(order.items[i].winesource_price, order.items[i].case_size, order.items[i].number_of_cases);
      
      subtotal += (order.items[i].winesource_price*order.items[i].case_size*order.items[i].number_of_cases)
    }
    setSubtotal(subtotal)
  }

  return (
    <OrderDetailsWrapper data-testid="OrderDetails">
      <Navbar />
      <section className="content">
        <h1>Order Summary</h1>
        <section className="items">
          {order.items.map((item, index) => (
            <div key={index} className="item">
              <div>
                <img src={item.product_img} alt={item.product_name} />
                <div className="info">
                  <p className="name">{item.product_name}</p>
                  <p>Case size: {item.case_size}</p>
                  <p>No. of cases:
                   <FontAwesomeIcon className="icon__plus" icon={faPlusSquare}
                        onClick={() => dispatch(changeNumberOfCases({ "item_index": index, "num_cases": item.number_of_cases + 1 }))}
                      /> <span>{item.number_of_cases}</span>
                      <FontAwesomeIcon className="icon__minus" icon={faMinusSquare}
                        onClick={() => {
                          if (!(item.number_of_cases - 1)) return
                          dispatch(changeNumberOfCases({ "item_index": index, "num_cases": item.number_of_cases - 1 }))
                        }}
                      />
                  </p>
                </div>
              </div>
              <div>
                <p className="price">${item.winesource_price}</p>
              </div>
            </div>
          ))}

        </section>
        <section className="summary">
          <p><span>Subtotal:</span> <span>${subtotal}</span></p>
          <p><span>Shipping:</span> <span>${shipping_price}</span></p>
          <p><span>Total:</span> <span className="total_price">${subtotal + shipping_price}</span></p>
          <section className="actions">
            <Button text="Cancel" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => {
              dispatch(cancel())
              window.history.back()
            }} />
            <Button text="Next: Shipping Info" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground} onClick={() => history.push(ROUTES.ORDER_SHIPPING_INFO)}/>
          </section>
        </section>
      </section>
      <Footer />
    </OrderDetailsWrapper>
  )
};

export default OrderDetails;
