import React, { useEffect } from 'react';

import { DiscoverWrapper } from './Discover.styles';

import useLocalStorage from 'react-hook-uselocalstorage'
import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/counter/userSlice';
import ROUTES from 'global/constants/routes';

declare interface IDiscoverProps {}

const Discover: React.FC = (props: IDiscoverProps) => {  
  const dispatch = useAppDispatch()
  const loggedin = useAppSelector(state => state.user.loggedin)
  const profile = useAppSelector(state => state.user.profile)
  return (
    <DiscoverWrapper data-testid="Discover">
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      <h3>Username: {profile?.username}</h3>
      <p>Email: {profile?.email}</p>
      <p>Name: {profile?.fname} {profile?.lname}</p>
      <p>Date of birth: {profile?.dob}</p>
      <p>Phone: {profile?.phone}</p>
    </DiscoverWrapper>
  )
};

export default Discover;
