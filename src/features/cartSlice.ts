import {  createAsyncThunk, PayloadAction, createSlice, Action } from '@reduxjs/toolkit';

import type { AppThunk, RootState } from 'store/';

import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';

// async thunk
// export const changeCart = createAsyncThunk(
//   'currentCart/changeCart',
//   async (token: string, {dispatch, getState}) => {    
//         const response = await fetch(API + ENDPOINTS.CHARGE_CUSTOMER, {
//             method: METHODS.POST,
//             headers: {
//                 Authorization: 'Bearer ' + token
//           },
//             // @ts-ignore
//             body: JSON.stringify({"items" : getState().order.items, stripe_customer_id: getState().order.stripe_customer_id, customer_name: getState().order.customer_name, payment_method_id: getState().order.payment_method_id}) 
//         })
//         const data = await response.json()
//         console.log(data);

//       if (data.status === 'FAILURE') return data

//         dispatch(add())
//         return data
//   }
// )

interface CartState {
    items: {
        product_id: number,
        product_name: string,
        product_img: string,
        number_of_cases: number,
        case_size: number,
        winesource_price: number
    } [],
}

const initialState: CartState = {
    items: [],
};

// slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
        add: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes      
          console.log(action.payload);
          
          state.items.push(action.payload)
            
        },
        empty: (state) => {
            state.items = []
      },
      remove: (state, action) => {
            state.items.splice(action.payload, 1)
      },
      changeNumberOfCases: (state, action) => {
          state.items[action.payload.item_index].number_of_cases = action.payload.num_cases
      }
    },
    // extraReducers: (builder) => {
    // }
});

export const { add, empty, changeNumberOfCases, remove } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState): boolean => state.currentUser.;

// export const setCart = (action: any): AppThunk => (dispatch) => {
//         dispatch(cancel())
//         dispatch(create(action.payload))
// };

export default cartSlice;
