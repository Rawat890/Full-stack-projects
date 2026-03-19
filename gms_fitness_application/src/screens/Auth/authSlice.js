import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  expirationToken: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.expirationToken = action.payload.expirationToken;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.expirationToken = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
