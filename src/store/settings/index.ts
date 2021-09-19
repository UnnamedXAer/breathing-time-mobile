import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productionSettingsDefaultState } from './defaultState';
import {
  SettingsState,
  SettingsStateProps,
  Theme,
  Themes,
  UpdateSettingsPayload,
} from './types';

const devInitialState: SettingsState = {
  theme: Themes.System as Theme,
};
const initialState = __DEV__ ? devInitialState : productionSettingsDefaultState;

export const sliceName = 'settings' as const;

const settingsSlice = createSlice({
  name: sliceName,
  initialState,

  reducers: {
    setSettingsProp: (
      state,
      { payload: { propName, value } }: PayloadAction<UpdateSettingsPayload>,
    ) => {
      (<K extends SettingsStateProps>(prop: K) => {
        state[prop] = value as SettingsState[K];
      })(propName);
    },
  },
});

export const { setSettingsProp } = settingsSlice.actions;

export default settingsSlice.reducer;
