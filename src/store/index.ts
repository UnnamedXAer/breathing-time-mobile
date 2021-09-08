import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './exercise';

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
  },
  devTools: true,
});
