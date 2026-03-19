import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addSchedule,
  getSchedules,
  deleteSchedule,
  updateSchedule,
} from '../../../firebase/ScheduleData';

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (_, { getState }) => {
    const { userData } = getState().user;
    if (!userData?.email) {
      return;
    }
    const schedules = await getSchedules();
    return schedules;
  },
);

export const createSchedule = createAsyncThunk(
  'schedule/createSchedule',
  async (scheduleData) => {
    const id = await addSchedule(scheduleData);
    return { id, ...scheduleData };
  },
);

export const markScheduleAsDone = createAsyncThunk(
  'schedule/markAsDone',
  async (scheduleId, { getState }) => {
    const state = getState();
    const schedule = state.schedules.items.find(item => item.id === scheduleId);

    if (!schedule) {
      return;
    }

    const updatedSchedule = {
      ...schedule,
      id: scheduleId,
      completed: true,
      updatedAt: new Date().toISOString(),
    };

    await updateSchedule(updatedSchedule);
    return updatedSchedule;
  },
);

export const removeSchedule = createAsyncThunk(
  'schedule/removeSchedule',
  async (scheduleId, { rejectWithValue }) => {
    try {
      await deleteSchedule(scheduleId);
      return scheduleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createSchedule.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(markScheduleAsDone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markScheduleAsDone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(markScheduleAsDone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;

