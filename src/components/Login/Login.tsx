import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/storeHooks';
import * as Yup from 'yup';
import "yup-phone";
import { loginUser } from 'features/userSlice';

import { LoginWrapper } from './Login.styles';
import ROUTES from 'global/constants/routes';
import { useHistory } from 'react-router';

declare interface ILoginProps {}

const Login: React.FC = (props: ILoginProps) => {
  const [Error, setCustomError] = useState('')
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const formik = useFormik({
        initialValues: {
            email: '',
            // fname: '',
            // lname: '',
            password: '',
            // username: '',
            // dob: '',
            // phone: '',
        },
        validationSchema: Yup.object({
          // username: Yup.string()
          //     .max(50, 'Must be 50 characters or less')
          //     .required('Required'),  
          email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          password: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
        }),

        onSubmit: async values => {
          setCustomError('')
          setLoading(true)
          try {
            const response = await dispatch(loginUser(values))
            if (response?.payload?.status === 'FAILURE') {
              setCustomError(response.payload.message)
              setLoading(false)
              return
            }
            history.push(ROUTES.DISCOVER)
          }
          catch (e) {
            setLoading(false)
          }
      },
    });
  
  return (
    <LoginWrapper data-testid="Login">
      <div className="form__wrapper">
        <header>
          <h3 className="brand">wine source</h3>
              <a href={ROUTES.USER_SIGNUP}><button className="login_btn">sign up</button></a>
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
          
        */}
          
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
    </LoginWrapper>
  )
}

export default Login;
