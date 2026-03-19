import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isProfileComplete: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isProfileComplete = action.payload?.isProfileComplete || false;
    },
    updateUserProfile: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
      if (action.payload.isProfileComplete) {
        state.isProfileComplete = true;
      }
    },
    clearUserData: (state) => {
      state.userData = null;
      state.isProfileComplete = false;
    },
  },
});

export const { setUserData, updateUserProfile, clearUserData } = userSlice.actions;
export default userSlice.reducer;
