import React, { useState } from 'react';

import Button from 'components/Button';
import CSSVARIABLES from 'global/constants/css/variables';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { useHistory } from 'react-router';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import Navbar from 'components/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PriceCheckWrapper } from './PriceCheck.styles';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

declare interface IPriceCheckProps { }

const PriceCheck: React.FC = (props: IPriceCheckProps) => {
  const [query, setQuery] = useState<string>('')
  const [ShowInventory, setShowInventory] = useState<boolean>(false)
  const [Error, setCustomError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()  
  const history = useHistory()
  const token = useAppSelector(state => state.user.token)

  const check = () => {
    if (!query) return
    
    let url1 = "https://www.vivino.com/search/wines?q="+query;
    let url2 = "https://www.totalwine.com/search/all?text="+query;
    let url3 = "https://www.wine.com/search/"+query;
    let url4 = "https://www.wine-searcher.com/find/"+query;
    window.open(url1, '_blank');
    window.open(url2, '_blank');
    window.open(url3, '_blank');
    window.open(url4, '_blank');

    setShowInventory(true)
  }

    const formik = useFormik({
        initialValues: {
            name: query,
            category: '',
            distributor: '',
            vintage: '',
            points: '',
            case_size: '',
            vivino_price: '',
            total_wine_price: '',
            wine_com_price: '',
            wine_searcher_price: '',
            average_price: '',
            winesource_price: '',
            winesource_cost: '',
            img_url: 'https://asset1.cxnmarksandspencer.com/is/image/mands/wineLP_hero_1200x1200?wid=900&qlt=70&fmt=pjpeg',
        },
        validationSchema: Yup.object({
          name: Yup.string()
              .max(250, 'Must be 250 characters or less')
              .required('Required'),  
          category: Yup.string()
              .max(120, 'Must be 100 characters or less')
              .required('Required'),
          distributor: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          img_url: Yup.string(),
          vintage: Yup.number()
              .required('Required'),
          case_size: Yup.number()
              .required('Required'),
          points: Yup.number()
              .required('Required'),
          vivino_price: Yup.number(),
          total_wines_price: Yup.number(),
          wine_com_price: Yup.number(),
          wine_searcher_price: Yup.number(),
          average_price: Yup.number()
            .required('Required'),
          winesource_price: Yup.number()
            .required('Required'),
          winesource_cost: Yup.number()
              .required('Required'),
        }),

      onSubmit: async (values: any) => {
        console.log('kkkkkkkkkkkkkkkkkkkkkkkk');
        
        values.name = query
        setCustomError('')
        setLoading(true)
        try {
          const response = await fetch(API + ENDPOINTS.PRODUCTS, {
            method: METHODS.POST,
            headers: {
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(values)
          })

          const data = await response.json()

          if (data.status === 'FAILURE') {
            setCustomError(data.message)
            setLoading(false)
            return
          } else {
            alert('Product added')
            setShowInventory(false)
          }
        }
        catch (e) {
          setLoading(false)
        }
      },
    });
  
  const submit = async (values: any) => {
        console.log('kkkkkkkkkkkkkkkkkkkkkkkk', values);
        
    values.name = query
    values.average_price = (values.total_wine_price + values.vivino_price + values.wine_com_price + values.wine_searcher_price)/4
        setCustomError('')
        setLoading(true)
    try {
          console.log('hhhhhhhhhhhhhhhhhhhhh', API + ENDPOINTS.PRODUCTS);
          
      const response = await fetch(API + ENDPOINTS.PRODUCTS, {
            method: METHODS.POST,
            headers: {
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(values)
          })

          const data = await response.json()

          if (data.status === 'FAILURE') {
            setCustomError(data.message)
            setLoading(false)
            return
          } else {
            alert('Product added')
            setShowInventory(false)
          }
        }
        catch (e) {
          setLoading(false)
        }
    }
  
  return (
    <PriceCheckWrapper data-testid="PriceCheck">
      <Navbar />
      {ShowInventory ?
        <section>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <h2><FontAwesomeIcon className="icon__back" icon={faArrowLeft} onClick={() => setShowInventory(false)} /> {query}</h2>
             <div>{Error}</div>
              
              <div className="form__wrapper">
                <div className="form_group">
   
                  <p>Vivino</p>
            {
                  formik.touched.vivino_price && formik.errors.vivino_price ? (
                      <div className="errors">{formik.errors.vivino_price}</div>
                  ) : null
              }
                  <input
                    type="number"
                    name="vivino_price"
                    id="vivino_price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vivino_price}
                    placeholder="" />
                </div>
                
              <div className="form_group">
                  <p>Total-Wines</p>
            {
                formik.touched.total_wine_price && formik.errors.total_wine_price ? (
                    <div className="errors">{formik.errors.total_wine_price}</div>
                ) : null
                  }

              <input
                  type="number"
                  name="total_wine_price"
                  id="total_wine_price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.total_wine_price}
                  placeholder="" />      
              </div>
            
              <div className="form_group">
                <p>Wine Searcher</p>
                {
                  formik.touched.wine_searcher_price && formik.errors.wine_searcher_price ? (
                    <div className="errors">{formik.errors.wine_searcher_price}</div>
                  ) : null
                }
                <input
                    type="number"
                    name="wine_searcher_price"
                    id="wine_searcher_price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.wine_searcher_price}
                    placeholder="" />
                  
              </div>
              
              <div className="form_group">
                <p>Wine.com</p>
                {
                  formik.touched.wine_com_price && formik.errors.wine_com_price ? (
                    <div>{formik.errors.wine_com_price}</div>
                  ) : null
                }
                <input
                    type="number"
                    name="wine_com_price"
                    id="wine_com_price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.wine_com_price}
                    placeholder="" />
                  
              </div>
              
                <div className="form_group">

                  <p>Vintage</p>
                  {
                  formik.touched.vintage && formik.errors.vintage ? (
                    <div className="errors">{formik.errors.vintage}</div>
                  ) : null
                }
                <input
                    type="number"
                    name="vintage"
                    id="vintage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vintage}
                    placeholder="" />                  
              </div>
              
                <div className="form_group">

                  <p>Case Size</p>
                              {
                  formik.touched.case_size && formik.errors.case_size ? (
                    <div className="errors">{formik.errors.case_size}</div>
                  ) : null
                }
                <input
                    type="number"
                    name="case_size"
                    id="case_size"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.case_size}
                    placeholder="" />

                </div>
              
                <div className="form_group">                  
                  <p>Points</p>
                  {formik.touched.points && formik.errors.points ? (
                    <div className="errors">{formik.errors.points}</div>
                  ) : null
                  }
                  <input
                    type="number"
                    name="points"
                    id="points"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.points}
                    placeholder="" />
                </div>

                <div className="form_group">
                <p>Category</p>
                  {
                  formik.touched.category && formik.errors.category ? (
                    <div className="errors">{formik.errors.category}</div>
                  ) : null
                }
                <input
                    type="text"
                    name="category"
                    id="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    placeholder="" />

                </div>
              <div className="form_group">
              <p>Winesource Cost</p>
                            {
                formik.touched.winesource_cost && formik.errors.winesource_cost ? (
                  <div className="errors">{formik.errors.winesource_cost}</div>
                ) : null
              }
              <input
                  type="number"
                  name="winesource_cost"
                  id="winesource_cost"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.winesource_cost}
                  placeholder="" />
              </div>
              
                <div className="form_group">
                <p>Winesource Price</p>
                  {
                  formik.touched.winesource_price && formik.errors.winesource_price ? (
                    <div className="errors">{formik.errors.winesource_price}</div>
                  ) : null
                }
                <input
                    type="number"
                    name="winesource_price"
                    id="winesource_price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.winesource_price}
                    placeholder="" />                  
              </div>
              
              <div className="form_group">
                <p>Distributor</p>
                {
                formik.touched.distributor && formik.errors.distributor ? (
                  <div className="errors">{formik.errors.distributor}</div>
                ) : null
                }
                <input
                  type="text"
                  name="distributor"
                  id="distributor"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.distributor}
                  placeholder="" />
                  
              </div>

                <input type="submit" value={loading ? "loading..." : "Save Data"} onClick={() => submit(formik.values)}/>
              </div>
            </form >
          </div>

        </section>
       :
        <section>
          <h1>Do a price check</h1>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" />
          <button onClick={check}>Search</button>          
        </section>
       }
    </PriceCheckWrapper>
  )
};

export default PriceCheck;
