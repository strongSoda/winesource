import {  createAsyncThunk, PayloadAction, createSlice, Action } from '@reduxjs/toolkit';

import type { AppThunk, RootState } from 'store/';

import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';

// async thunk
export const chargeOrder = createAsyncThunk(
  'currentOrder/chargeOrder',
  async (token: string | null, {dispatch, getState}) => {    
        const response = await fetch(API + ENDPOINTS.CHARGE_CUSTOMER, {
            method: METHODS.POST,
            headers: {
                Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
                // @ts-ignore
              "items": getState().order.items,
                // @ts-ignore
              stripe_customer_id: getState().order.stripe_customer_id,
                // @ts-ignore
              customer_name: getState().order.customer_name,
                // @ts-ignore
              payment_method_id: getState().order.payment_method_id,
                // @ts-ignore
              address: getState().order.address,

            })
        })
        const data = await response.json()
        console.log(data);

        if(data.status==='FAILURE') return data

    if (!data.body.requiresAction) {
      console.log(data.body.requiresAction);
      dispatch(cancel())
    }
    return data
  }
)

export const confirmIntent = createAsyncThunk(
  'currentOrder/confirmIntent',
  async ({token, payment_intent_id} : {token: string | null, payment_intent_id: string},  {dispatch, getState}) => {    
        const response = await fetch(API + ENDPOINTS.CHARGE_CUSTOMER, {
            method: METHODS.POST,
            headers: {
                Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
                // @ts-ignore
              "items": getState().order.items,
                // @ts-ignore
              payment_intent_id: payment_intent_id,
            })
        })
        const data = await response.json()
        console.log(data);

        if(data.status==='FAILURE') return data

        dispatch(cancel())
        return data
  }
)

interface OrderState {
    items: {
        product_id: number,
        product_name: string,
        product_img: string,
        number_of_cases: number,
        case_size: number,
        winesource_price: number
    } [],
    stripe_customer_id: string,
    customer_name: string,
    payment_method_id: string,
    address: {
    "line1": string,
    "line2": string,
    "postal_code": string,
    "city": string,
    "state": string,
    "country": string,
    }
}

const initialState: OrderState = {
    items: [],
    stripe_customer_id: '',
    payment_method_id: '',
    customer_name: '',
    address: {
    "line1": '',
    "line2": '',
    "postal_code": '',
    "city": '',
    "state": '',
    "country": '',
    }
};

// slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
        create: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes  
          
            state.items.push(...action.payload.items)
            state.stripe_customer_id =  action.payload.stripe_customer_id
            state.customer_name =  action.payload.customer_name
            state.payment_method_id =  action.payload.payment_method_id
            
        },
        cancel: (state) => {
            state.items = []
            state.stripe_customer_id = ''
            state.payment_method_id = ''
      },
      add_payment_method: (state, action) => {
            state.payment_method_id =  action.payload
      },
      add_shipping_address: (state, action) => {
            state.address =  action.payload
      },
      changeNumberOfCases: (state, action) => {
          state.items[action.payload.item_index].number_of_cases = action.payload.num_cases
      }
    },
    // extraReducers: (builder) => {
    // }
});

export const { create, cancel, changeNumberOfCases, add_payment_method, add_shipping_address } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState): boolean => state.currentUser.;

export const setOrder = (action: any): AppThunk => (dispatch) => {
        dispatch(cancel())
        dispatch(create(action))
};

export default orderSlice;
