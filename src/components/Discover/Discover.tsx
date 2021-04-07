import React, { useEffect } from 'react';

import { DiscoverWrapper } from './Discover.styles';

import useLocalStorage from 'react-hook-uselocalstorage'
import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/counter/userSlice';

declare interface IDiscoverProps {}

const Discover: React.FC = (props: IDiscoverProps) => {  
  const dispatch = useAppDispatch()
  let loggedin =useAppSelector(state => state.user.loggedin)
  
  return (
    <DiscoverWrapper data-testid="Discover">
      {loggedin  ?
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
