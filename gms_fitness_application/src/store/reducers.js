import { combineReducers } from '@reduxjs/toolkit';

import bmiReducer from '../screens/Application/BmiCalculator/bmiSlice';
import photoReducer from '../screens/Application/CameraTab/photoSlice';
import sessionReducer from '../screens/Application/ProfileTab/sessionSlice';
import userReducer from '../screens/Application/ProfileTab/userSlice';
import scheduleReducer from '../screens/Application/ScheduleWorkout/scheduleSlice';
import sleepReducer from '../screens/Application/SleepSchedule/sleepSlice';
import authReducer from '../screens/Auth/authSlice';

export const rootReducer = combineReducers({
  authUser: authReducer,
  user: userReducer,
  session: sessionReducer,
  schedules: scheduleReducer,
  sleep: sleepReducer,
  photos: photoReducer,
  bmi: bmiReducer,
});
