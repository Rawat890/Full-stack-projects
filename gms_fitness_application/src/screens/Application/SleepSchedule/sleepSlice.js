import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addSleepSchedule, deleteSleepSchedule, getSleepSchedules } from '../../../firebase/SleepData';

export const fetchSleepSchedules = createAsyncThunk(
  'sleep/fetchSleepSchedules',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userData } = getState().user;
      if (!userData?.email) {
        return rejectWithValue('User not authenticated');
      }
      const schedules = await getSleepSchedules(userData.email);
      return schedules;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createSleepSchedule = createAsyncThunk(
  'sleep/createSleepSchedule',
  async (scheduleData) => {
    const id = await addSleepSchedule(scheduleData);
    return { id, ...scheduleData };
  },
);

export const removeSleepSchedule = createAsyncThunk(
  'sleep/removeSleepSchedule',
  async (scheduleId, { rejectWithValue }) => {
    try {
      await deleteSleepSchedule(scheduleId);
      return scheduleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const sleepSlice = createSlice({
  name: 'sleep',
  initialState: {
    records: [],
    schedules: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSleepSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSleepSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload || [];
        state.records = action.payload.slice(0, 5).map(item => ({
          id: item.id,
          bedtime: item.bedtime,
          wakeTime: item.wakeTime,
          duration: item.duration,
          date: item.date,
        }));
      })
      .addCase(fetchSleepSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSleepSchedule.fulfilled, (state, action) => {
        state.schedules.unshift(action.payload);
        if (state.records.length < 5) {
          state.records.unshift({
            id: action.payload.id,
            bedtime: action.payload.bedtime,
            wakeTime: action.payload.wakeTime,
            duration: action.payload.duration,
            date: action.payload.date,
          });
        }
      })
      .addCase(removeSleepSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter(
          schedule => schedule.id !== action.payload,
        );
        state.records = state.records.filter(
          record => record.id !== action.payload,
        );
      })
      .addCase(removeSleepSchedule.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default sleepSlice.reducer;


