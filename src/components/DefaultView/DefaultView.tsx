import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import ROUTES from 'global/constants/routes';
import { useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { DefaultViewWrapper } from './DefaultView.styles';

declare interface IDefaultViewProps {
  rows: any[]
}

const DefaultView: React.FC<IDefaultViewProps> = (props: IDefaultViewProps) => {
  const history = useHistory()
  const [daily_deals, setDailyDeals] = useState<any []>([])
  const [category_deals, setCategoryDeals] = useState<any []>([])
  const [personal_deals, setPersonalDeals] = useState<any []>([])
  const token = useAppSelector(state => state.user.token)
  
  async function getDailyDeals() {
    const response = await fetch(API + ENDPOINTS.DEALS + '?deal_type=' + 'DAILY', {
          method: METHODS.GET,
          headers: {
            Authorization: 'Bearer ' + token
        },
      })
    const data = await response.json()
    // console.log(data);
    
    setDailyDeals(data.body.deals)
  }

  async function getCategoryDeals() {
    const response = await fetch(API + ENDPOINTS.DEALS + '?deal_type=' + 'CATEGORY', {
          method: METHODS.GET,
          headers: {
            Authorization: 'Bearer ' + token
        },
      })
    const data = await response.json()
    // console.log(data);
    
    setCategoryDeals(data.body.deals)
  }

    async function getPersonalDeals() {
    const response = await fetch(API + ENDPOINTS.DEALS + '?deal_type=' + 'PERSONAL', {
          method: METHODS.GET,
          headers: {
            Authorization: 'Bearer ' + token
        },
      })
    const data = await response.json()
    // console.log(data);
    
    setPersonalDeals(data.body.deals)
    }
  
  useEffect(() => {            

    getDailyDeals()
    getCategoryDeals()
    getPersonalDeals()
    // setRows([])
  }, [])

  return (
    <DefaultViewWrapper data-testid="DefaultView">
      {daily_deals?.length ?
        <section className="daily_deals">
          <h1>Daily Deals</h1>
          <section className="wines">
            {daily_deals.map(row => (
              <div className="wine" key={row.id} onClick={() => history.push(ROUTES.PRODUCT + '/' + row.id)}>
                <img src={row.img_url} alt={row.name}/>
                <p>{row.name}</p>
                <div className="prices">
                  <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </section>
        </section>
        : ''
      }

      {category_deals?.length ?
        <section className="category_deals">
          <h1>Category Deals</h1>
          <section className="wines">
            {category_deals.map(row => (
              <div className="wine" key={row.id} onClick={() => history.push(ROUTES.PRODUCT + '/' + row.id)}>
                <img src={row.img_url} alt={row.name}/>
                <p>{row.name}</p>
                <div className="prices">
                  <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </section>
        </section>
        : ''
      }

      {personal_deals?.length ? 
        <section className="daily_deals">
          <h1>Personal Deals</h1>
          <section className="wines">
            {personal_deals.map(row => (
              <div className="wine" key={row.id} onClick={() => history.push(ROUTES.PRODUCT + '/' + row.id)}>
                <img src={row.img_url} alt={row.name}/>
                <p>{row.name}</p>
                <div className="prices">
                  <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                  <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </section>
        </section>
        : ''
      }

      <section className="daily_deals">
        <h1>Discover</h1>
        <section className="wines">
          {props.rows.map(row => (
            <div className="wine" key={row.id} onClick={() => history.push(ROUTES.PRODUCT + '/' + row.id)}>
              <img src={row.img_url} alt={row.name}/>
              <p>{row.name}</p>
              <div className="prices">
                <span className="price">${parseFloat(row.winesource_price).toFixed(2)}</span>
                <span className="avg_price">${parseFloat(row.average_price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </section>
      </section>
    </DefaultViewWrapper>
  )
};

export default DefaultView;
