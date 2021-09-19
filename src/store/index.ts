import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer, { sliceName as exerciseSliceName } from './exercise';
import settingsReducer, { sliceName as settingsSliceName } from './settings';

export const store = configureStore({
  reducer: {
    [settingsSliceName]: settingsReducer,
    [exerciseSliceName]: exerciseReducer,
  },
  devTools: true,
});
