import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/app/type';


const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  user: null,
  errMess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.errMess = '';
      state.token = action.payload;

    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.errMess = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  setUser
} = authSlice.actions;
export default authSlice.reducer;
