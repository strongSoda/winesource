import React, { useEffect, useState } from 'react';

import { DiscoverWrapper } from './Discover.styles';

import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/counter/userSlice';
import ROUTES from 'global/constants/routes';
import Navbar from 'components/Navbar';
import METHODS from 'global/constants/restMethods';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';

declare interface IDiscoverProps {}

const Discover: React.FC = (props: IDiscoverProps) => {    
  const token = useAppSelector(state => state.user.token)
  const [rows, setRows] = useState<any []>()
  const [query, setQuery] = useState<string>()

  useEffect(() => {
              
    async function getRows() {
      const response = await fetch(API + ENDPOINTS.PRODUCTS, {
            method: METHODS.GET,
            headers: {
              Authorization: 'Bearer ' + token
            },
          })
      const data = await response.json()
      console.log(data);
      
      setRows(data.body.products.slice(1,6))
    }

    getRows()
    // setRows([])
  }, [])

  return (
    <DiscoverWrapper data-testid="Discover">
      <Navbar />
      <section className="content">
        <input type="text" placeholder="What are you looking for?" />
        <button>Search</button>
        {rows?.length ?
          <>
        <section className="daily_deals">
            <h1>Daily Deals</h1>
            <section className="wines">
              {rows.map(row => (
                <div className="wine" key={row.id}>
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
          
          <section className="category_deals">
            <h1>Category Deals</h1>
            <section className="wines">
              {rows.map(row => (
                <div className="wine" key={row.id}>
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
          </>
       :
        <section>
            <h1>No results found for {query}</h1>
        </section>
       }
      </section>
    </DiscoverWrapper>
  )
};

export default Discover;
