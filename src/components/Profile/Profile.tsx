import React from 'react';

import { ProfileWrapper } from './Profile.styles';

import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/userSlice';
import ROUTES from 'global/constants/routes';
import Navbar from 'components/Navbar';

declare interface IProfileProps {}

const Profile: React.FC = (props: IProfileProps) => {
    const dispatch = useAppDispatch()
  const loggedin = useAppSelector(state => state.user.loggedin)
  const profile = useAppSelector(state => state.user.profile)

  return (
    <ProfileWrapper data-testid="Profile">
      <Navbar />
      <section className="content">
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
        <h3>Username: {profile?.username}</h3>
        <p>Email: {profile?.email}</p>
        <p>Name: {profile?.fname} {profile?.lname}</p>
        <p>Date of birth: {profile?.dob}</p>
        <p>Phone: {profile?.phone}</p>
      </section>
    </ProfileWrapper>
  )
};

export default Profile;
