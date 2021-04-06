import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { Redirect, useHistory } from 'react-router';
import * as Yup from 'yup';
import "yup-phone";
import API from 'global/constants/api';
import useLocalStorage from 'react-hook-uselocalstorage'
import { loginUser, registerUser } from 'features/counter/userSlice';
import isUserAuthenticated from 'global/constants/isUserAuthenticated';

import { LoginWrapper } from './Login.styles';

declare interface ILoginProps {}

const Login: React.FC = (props: ILoginProps) => {
    const [Error, setCustomError] = useState('')
  const dispatch = useAppDispatch()
  const token =useAppSelector(state => state.user.token)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
        initialValues: {
            email: '',
            fname: '',
            lname: '',
            password: '',
            username: '',
            dob: '',
            phone: '',
        },
        validationSchema: Yup.object({
          // username: Yup.string()
          //     .max(50, 'Must be 50 characters or less')
          //     .required('Required'),  
          // fname: Yup.string()
          //     .max(50, 'Must be 50 characters or less')
          //     .required('Required'),
          // lname: Yup.string()
          //     .max(50, 'Must be 50 characters or less')
          //     .required('Required'),
          email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          password: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
          // dob: Yup.date()
          //     .max(new Date(), 'Invalid Birth Date')
          //     .required('Required'),
          // phone: Yup.string()
          //   .phone('US', true, 'Not a valid US contact')
          //   .required()
        }),

        onSubmit: async values => {
          setLoading(true)
          const response = await dispatch(loginUser(values))
          console.log('heyoooooooooooooooo',response);
          if (response.payload.status === 'FAILURE') {
            setCustomError(response.payload.message)
            setLoading(false)
          }
        },
    });
  
  return (
    <LoginWrapper data-testid="Signup">
        {!token ? 
      <>

      <div className="form__wrapper">
        <header>
          <h3 className="brand">wine source</h3>
          <a href="/signin"><button className="login_btn">log in</button></a>
        </header>
        <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
          {/* {
              formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
              ) : null
          }
          <input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="Username" />
          
          <br />
          
          {
            formik.touched.fname && formik.errors.fname ? (
                <div>{formik.errors.fname}</div>
            ) : null
          }

          <input
              type="text"
              name="fname"
              id="fname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
              placeholder="First Name" />
          <br />
          
          {
            formik.touched.lname && formik.errors.lname ? (
              <div>{formik.errors.lname}</div>
            ) : null
          }

          <input
              type="text"
              name="lname"
              id="lname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
              placeholder="Last Name" />
          
          <br />
          
          {
            formik.touched.dob && formik.errors.dob ? (
              <div>{formik.errors.dob}</div>
            ) : null
          }

          <input
            type="text" onFocus={(e) => e.target.type = 'date'} onBlurCapture={(e) => e.target.type = 'text'}
              name="dob"
              id="dob"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
              placeholder="Date of Birth" />
          
          <br /> */}
          
          <div>{Error}</div>
              
          {
            formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null
          }

          <input
              // type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email Address" />
          
          <br />
{/*           
                 
          {
            formik.touched.phone && formik.errors.phone ? (
              <div>{formik.errors.phone}</div>
            ) : null
          }

          <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            placeholder="Phone Number" />
          
          <br />   {
            formik.touched.phone && formik.errors.phone ? (
              <div>{formik.errors.phone}</div>
            ) : null
          }

          <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            placeholder="Phone Number" />
          
          <br /> */}

          {
            formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null
          }

          <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password" /><br/>
          <input type="submit" value={loading ? "loading..." : "Log In"} />
        <p>Don't have an account? <a href="/signup">Sign Up!</a></p>
        </form >
      </div>
      <div className="banner">
        <h1>Welcome to WineSource</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem optio, error ratione saepe provident fugit nam dolorum temporibus iusto, id quas quo assumenda minus facere perspiciatis quaerat minima modi cum!</p>
      </div>
        </>
        : 
        <Redirect to='/discover'/>
        }
    </LoginWrapper>
  )
}

export default Login;
