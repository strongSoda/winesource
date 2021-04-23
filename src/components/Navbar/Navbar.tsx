import ROUTES from 'global/constants/routes';
import React from 'react';

import Navbar from '@acto/react-navbar'

import { NavbarWrapper } from './Navbar.styles';
import { Link } from 'react-router-dom';
import CSSVARIABLES from 'global/constants/css/variables';
import { useAppSelector } from 'hooks/storeHooks';

declare interface INavbarProps {}

const navTheme = {
    mainColor: CSSVARIABLES.secondaryColor,
    backgroundColor: CSSVARIABLES.primaryBackground,
    height: '6vh',
    menuBgColor: '#fff'
}

const leftLinks = (
  <>
    {/* <a href='#'>Our Plans</a>
    <a href='#'>How It Works</a>
    <a href='#'>Our Menus</a> */}
  </>
)
 
// const rightLinks = (
//   <>
//     {/* <a href={ROUTES.ADMIN_HOME}>Home</a> */}
//     <a href={ROUTES.ADMIN_INVENTORY}>Inventory</a>
//     <a href={ROUTES.ADMIN_PROFILE}>Profile</a>
//   </>
// )

const CustomNavbar: React.FC = (props: INavbarProps) => {
  const profile = useAppSelector(state => state.user.profile)

  const navBrandLink = (() => {
    if (profile?.is_admin === 'True') {
      return ROUTES.ADMIN_HOME
      } else {
        return ROUTES.DISCOVER
    }
  })()

  const profileLink = (() => {
    if (profile?.is_admin === 'True') {
      return ROUTES.ADMIN_PROFILE
      } else {
        return ROUTES.PROFILE
    }
  })()


  const requestsLink = (() => {
    if (profile?.is_admin === 'True') {
      return ROUTES.ADMIN_REQUESTS
      } else {
        return ROUTES.BUYER_REQUESTS
    }
  })()

  const navBrand = <a href={navBrandLink} className = "brand" >WINE SOURCE</a>

  const rightLinks = (() => {
    if (profile?.is_admin === 'True') {
      return (
        <>
          <a href={ROUTES.SELLER_ORDERS}>Orders</a>
          <a href={requestsLink}>Custom Requests</a>
          <a href={ROUTES.ADMIN_INVENTORY}>Inventory</a>
          <a href={profileLink}>Profile</a>
        </>
      )
    } else {
      return (
        <>
          <a href={ROUTES.BUYER_ORDERS}>My Orders</a>
          <a href={requestsLink}>My Requests</a>
          <a href={ROUTES.CART}>My Cart</a>
          <a href={profileLink}>Profile</a>
        </>
      )
    }
  }
  )()

  const leftLinks = (() => {
    if (profile?.is_admin === 'True') {
      return (
        <>
          <a href={navBrandLink}>Home</a>
        </>
      )
    } else {
      return (
        <>
          <a href={navBrandLink}>Home</a>
        </>
      )
    }
  }
  )()

  return (
    <NavbarWrapper data-testid="Navbar">
<Navbar
        className="navbar" // style .navbar in your css
        menuClassName="navbar--menu" // style .navbar--menu in your css
        brand={navBrand}
        theme={navTheme}
        leftLinks={leftLinks}
        rightLinks={rightLinks}
        shouldHideOnScroll={false}
      />
    </NavbarWrapper>
  )
};

export default CustomNavbar;
