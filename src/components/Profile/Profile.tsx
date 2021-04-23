import React from 'react';

import { ProfileWrapper } from './Profile.styles';

import { Redirect, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { logoutUser } from 'features/userSlice';
import ROUTES from 'global/constants/routes';
import Navbar from 'components/Navbar';
import Button from 'components/Button';
import CSSVARIABLES from 'global/constants/css/variables';
import Footer from 'components/Footer';

declare interface IProfileProps {}

const Profile: React.FC = (props: IProfileProps) => {
    const dispatch = useAppDispatch()
  const loggedin = useAppSelector(state => state.user.loggedin)
  const profile = useAppSelector(state => state.user.profile)

  return (
    <ProfileWrapper data-testid="Profile">
      <Navbar />
      <section className="content">
        <Button text="Logout" color={CSSVARIABLES.primaryColor2} bgColor={CSSVARIABLES.secondaryBackground2} onClick={() => dispatch(logoutUser())} />
        <h1>Profile</h1>

        <section className="profile">
          {/* <h3>Basic Information</h3> */}
          <p><span className="key">Username:</span> <span className="value">{profile?.username}</span></p>
          <p><span className="key">Email:</span> <span className="value">{profile?.email}</span></p>
          <p><span className="key">Name:</span> <span className="value">{profile?.fname} {profile?.lname}</span></p>
          <p><span className="key">Date of birth:</span> <span className="value">{profile?.date_of_birth}</span></p>
          <p><span className="key">Phone:</span> <span className="value">{profile?.phone}</span></p>
        </section>
      </section>
      <Footer />
    </ProfileWrapper>
  )
};

export default Profile;
