import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSessionActive: false,
  sessionStartTime: null,
  sessionDuration: 0,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state) => {
      state.isSessionActive = true;
      state.sessionStartTime = new Date().toISOString();
    },
    endSession: (state) => {
      if (state.sessionStartTime) {
        const start = new Date(state.sessionStartTime);
        const end = new Date();
        state.sessionDuration = Math.round((end - start) / (1000 * 60));
      }
      state.isSessionActive = false;
      state.sessionStartTime = null;
    },
  },
});

export const { startSession, endSession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;

