import {  createAsyncThunk, PayloadAction, createSlice, Action } from '@reduxjs/toolkit';

import type { AppThunk, RootState } from 'store/';

import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';

interface registerProps {
    fname: string,
    lname: string,
    email: string,
    dob: string,
    phone: string,
    username: string,
    password: string
}

interface loginProps {
  email: string,
  password: string
}

// async thunk
export const registerUser = createAsyncThunk(
  'currentUser/registerUser',
  async (values: registerProps , thunkAPI) => {
    console.log(thunkAPI);
    
      const response = await fetch(API + ENDPOINTS.REGISTER, {
          method: METHODS.POST,
          body: JSON.stringify(values) 
    })
      const data = await response.json()
    
    console.log(data);

    if(data.status==='FAILURE') return data
    
    localStorage.setItem('token', data.auth_token)
    thunkAPI.dispatch(setUser(data.user))
    thunkAPI.dispatch(login())
    thunkAPI.dispatch(setToken())
  }
)

interface responseT {
  status: string,
  msg: string
}
// async thunk
export const loginUser = createAsyncThunk(
  'currentUser/loginUser',
  async (values: loginProps, thunkAPI) => {
      const response = await fetch(API + ENDPOINTS.LOGIN, {
          method: METHODS.POST,
          body: JSON.stringify(values) 
    })
    const data = await response.json()
    console.log(data);
    
    if(data.status==='FAILURE') return data

    localStorage.setItem('token', data.auth_token)
    thunkAPI.dispatch(setUser(data.user))
    thunkAPI.dispatch(login())
    thunkAPI.dispatch(setToken())
  }
)

// async thunk
export const logoutUser = createAsyncThunk(
  'currentUser/logoutUser',
  async (dummy, thunkAPI) => {
    const response = await fetch(API + ENDPOINTS.LOGOUT, {
        method: METHODS.POST,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    const data = await response.json()
    
    console.log(data);
    
    thunkAPI.dispatch(logout())
    localStorage.removeItem('token')
    thunkAPI.dispatch(resetToken())
  }
)

export const getUser = createAsyncThunk(
  'currentUser/getUser',
  async (dummy, thunkAPI) => {
    console.log(thunkAPI);
    
    const response = await fetch(API + ENDPOINTS.USER, {
        method: METHODS.GET,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })

    const data = await response.json()
    
    console.log('pppppppppppppppp',data.user);
    thunkAPI.dispatch(setUser(data.user))
    thunkAPI.dispatch(login())
    thunkAPI.dispatch(setToken())
  }
)

interface UserState {
    profile: any,
    loggedin: boolean,
    token: string | null
}

const initialState: UserState = {
    profile: null,
    loggedin: false,
    token: localStorage.getItem('token')
};

// slice
export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      
      state.loggedin = true;
      state.token = localStorage.getItem('token');
      console.log(localStorage.getItem('token'), 'here', state.token);
    },
      logout: (state) => {
      state.profile = null;
        state.loggedin = false;
        state.token = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload);
      
        state.profile = action.payload;
    },
    setToken: (state) => {
      state.token = localStorage.getItem('token')
    },
    resetToken: (state) => {
      state.token = null;
    }
    },
    // extraReducers: (builder) => {
    // }
});

export const { login, logout, setUser, setToken, resetToken } = userSlice.actions;

const PROCESSES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER'
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// const postProcess = (process: string, callback: Action<string>, token?: string, user?: UserState): AppThunk => (dispatch) => {
//     console.log(process, callback);
    
//     if (process === PROCESSES.LOGOUT) {
//         localStorage.removeItem('token')
//         dispatch(callback)
//     }
//     else {
//         if (token && user) {            
//             dispatch(setUser(user))
//             dispatch(login)
//         }
//     }
// };


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState): boolean => state.currentUser.;

export default userSlice;
