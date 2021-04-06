import React, { useEffect } from 'react';

import { DiscoverWrapper } from './Discover.styles';

import useLocalStorage from 'react-hook-uselocalstorage'
import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser, getUser } from 'features/counter/userSlice';
import isUserAuthenticated from 'global/constants/isUserAuthenticated';

declare interface IDiscoverProps {}

const Discover: React.FC = (props: IDiscoverProps) => {  
  const dispatch = useAppDispatch()
  let token =useAppSelector(state => state.user.token)
  
  useEffect(() => { 
      dispatch(getUser())
  }, [])
  
  return (
    <DiscoverWrapper data-testid="Discover">
      {token  ?
      <>
        <span>Discover Component</span>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </>
        :
      <Redirect to='/signin'/>
      }
    </DiscoverWrapper>
  )
};

export default Discover;
