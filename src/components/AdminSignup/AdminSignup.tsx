import React, { useState } from 'react';

import { AdminSignupWrapper } from './AdminSignup.styles';

import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/storeHooks';
import * as Yup from 'yup';
import "yup-phone";
import { registerUser } from 'features/userSlice';
import ROUTES from 'global/constants/routes';
import AddressSearch from 'components/AddressSearch';
import { useHistory } from 'react-router';


declare interface IAdminSignupProps {}

const AdminSignup: React.FC = (props: IAdminSignupProps) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  
  const [Error, setCustomError] = useState('')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [astate, setAState] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
    const [line1, setLine1] = useState<string>('')
  const [line2, setLine2] = useState<string>('')
  const [zip, setZip] = useState<string>('')
  
  const setUserAddress = (line1: string, line2: string, lat: number, lng: number, city: string, state: string, country: string, zip: string ) => {
    // console.log(address, lat, lng, city, state, country);
    
    setLine1(line1)
    setLine2(line2)
    setLat(lat)
    setLng(lng)
    setCity(city)
    setAState(state)
    setCountry(country)
    setZip(zip)
  }
  
  const formik = useFormik({
        initialValues: {
          email: '',
          fname: '',
          lname: '',
          password: '',
          username: '',
          dob: '',
          phone: '',
          is_admin: true,
            line1: line1,
            line2: line2,
            zip: zip,
          lat: lat,
          lng: lng,
          city: city,
          astate: astate,
          country: country
        },
        validationSchema: Yup.object({
          username: Yup.string()
              .max(50, 'Must be 50 characters or less')
              .required('Required'),  
          fname: Yup.string()
              .max(50, 'Must be 50 characters or less')
              .required('Required'),
          lname: Yup.string()
              .max(50, 'Must be 50 characters or less')
              .required('Required'),
          email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          password: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
          dob: Yup.date()
              .max(new Date(), 'Invalid Birth Date')
              .required('Required'),
          phone: Yup.string()
            .phone('US', true, 'Not a valid US contact')
            .required()
        }),

    onSubmit: async values => {
                if (!address || !lat || !lng) {
        setCustomError('Please enter your address.')
        return
      }

      values.line1 = line1
      values.line2 = line2
      values.zip = zip
      values.astate = astate
      values.city = city
      values.country = country
      values.lat = lat
      values.lng = lng

      setCustomError('')
      
          setLoading(true)
          try {
            const response = await dispatch(registerUser(values))
            if (response?.payload?.status === 'FAILURE') {
              setCustomError(response.payload.message)
              setLoading(false)
              return
            }
            history.push(ROUTES.ADMIN_VERIFY_OTP)
          }
          catch (e) {
            setLoading(false)
          }
        },
    });
  
  return (
  <AdminSignupWrapper data-testid="AdminSignup">
      <div className="form__wrapper">
        <header>
          <h3 className="brand">wine source</h3>
          <a href={ROUTES.ADMIN_LOGIN}><button className="login_btn">log in</button></a>
        </header>
        <form onSubmit={formik.handleSubmit}>
        <h2>Create an account</h2>
          {
              formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
              ) : null
          }
          <div>{Error}</div>

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
          
          <br />
          
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
          
          <br />

          <AddressSearch setUserAddress={setUserAddress} setAddress={setAddress}/>

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
          <input type="submit" value={loading ? "loading..." : "Sign Up"} />
        <p>Already have an account? <a href={ROUTES.ADMIN_LOGIN}>Sign In!</a></p>
        </form >
      </div>
      <div className="banner">
        <h1>Welcome to WineSource</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem optio, error ratione saepe provident fugit nam dolorum temporibus iusto, id quas quo assumenda minus facere perspiciatis quaerat minima modi cum!</p>
      </div>
  </AdminSignupWrapper>
)};

export default AdminSignup;
