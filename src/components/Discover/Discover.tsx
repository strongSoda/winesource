import React, { useEffect, useState } from 'react';

import { DiscoverWrapper } from './Discover.styles';

import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/userSlice';
import ROUTES from 'global/constants/routes';
import Navbar from 'components/Navbar';
import METHODS from 'global/constants/restMethods';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import Searchview from 'components/Searchview';
import DefaultView from 'components/DefaultView';

declare interface IDiscoverProps {}

const Discover: React.FC = (props: IDiscoverProps) => {    
  const token = useAppSelector(state => state.user.token)
  const [rows, setRows] = useState<any []>([])
  const [searchRows, setSearchRows] = useState<any []>([])
  const [query, setQuery] = useState<string>('')
  const [searching, setSearching] = useState<boolean>(false)
  const [searchView, setSearchView] = useState<boolean>(false)
    
  useEffect(() => {
              
    async function getRows() {
      const response = await fetch(API + ENDPOINTS.PRODUCTS, {
            method: METHODS.GET,
            headers: {
              Authorization: 'Bearer ' + token
            },
          })
      const data = await response.json()
      // console.log(data);
      
      setRows(data.body.products)
    }

    getRows()
    // setRows([])
  }, [])

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    setSearchView(false)
    setSearching(true)
    const response = await fetch(API + ENDPOINTS.PRODUCTS + '?query=' + query, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
      },
    })
    const result = await response.json()
    console.log(result);
    setSearchRows(result.body.products);
    setSearching(false)
    setSearchView(true)
  } 

  return (
    <DiscoverWrapper data-testid="Discover">
      <Navbar />
        <div className="search__container">
          
        <form onSubmit={(e) => search(e)}>
          <input type="text" placeholder="What are you looking for?" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">{searching?'Searching...':'Search'}</button>
        </form>
        </div>
      <section className="content">

        {searchView ? <Searchview query={query} rows={searchRows} setSearchView={setSearchView}/> : <DefaultView rows={rows}/>}

      </section>
    </DiscoverWrapper>
  )
};

export default Discover;
