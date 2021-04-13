import { logoutUser } from 'features/counter/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import React from 'react';

import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div data-testid="Dashboard">
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
        <h3>Username: {profile?.username}</h3>
        <p>Email: {profile?.email}</p>
        <p>Name: {profile?.fname} {profile?.lname}</p>
        <p>Date of birth: {profile?.dob}</p>
        <p>Phone: {profile?.phone}</p>
      </div>
    </>
  )
};

export default Dashboard;
