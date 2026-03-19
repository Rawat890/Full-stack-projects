import { createSlice } from '@reduxjs/toolkit';

const bmiSlice = createSlice({
  name: 'bmi',
  initialState: {
    value: null,
    category: '',
  },
  reducers: {
    setBmiValue: (state, action) => {
      state.value = action.payload.value;
      state.category = action.payload.category;
    },
  },
});

export const { setBmiValue } = bmiSlice.actions;
export default bmiSlice.reducer;
