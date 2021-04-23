import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from 'features/counter/counterSlice';
import userSlice from 'features/userSlice';
import orderSlice from 'features/orderSlice';
import cartSlice from 'features/cartSlice';

const rootReducer = combineReducers({ counter: counterReducer, user: userSlice.reducer, order: orderSlice.reducer, cart: cartSlice.reducer});

export default rootReducer;
