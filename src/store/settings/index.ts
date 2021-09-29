import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../types';
import { productionSettingsDefaultState } from './defaultState';
import {
  Locales,
  SavedSettings,
  SettingsState,
  SettingsStateProps,
  Themes,
  UpdateSettingsPayload,
} from './types';

const devInitialState: SettingsState = {
  theme: Themes.System,
  locale: Locales.Default,
};
const initialState = __DEV__ ? devInitialState : productionSettingsDefaultState;

export const sliceName = 'settings' as const;

export const updateSettings = createAsyncThunk<
  void,
  UpdateSettingsPayload,
  { state: RootState }
>(sliceName + '/updateSettings', (payload, { dispatch, getState }) => {
  dispatch(settingsSlice.actions.setSettingsProp(payload));

  const { settings: state } = getState();

  const settings = {} as SettingsState;
  (<SettingsStateProps[]>Object.keys(state)).forEach(
    <K extends SettingsStateProps>(prop: K) => {
      settings[prop] = state[prop];
    },
  );

  void saveSettings(settings);
});

export const saveSettings = async (settings: SettingsState) => {
  try {
    await AsyncStorage.setItem(sliceName, JSON.stringify(settings));
  } catch (err) {
    __DEV__ && console.log('Could note save settings due to:', err);
  }
};

export const getSavedSettings = createAsyncThunk<SavedSettings>(
  sliceName + '/getSavedSettings',
  async () => {
    try {
      const settingsString = await AsyncStorage.getItem(sliceName);
      if (settingsString === null) {
        return null;
      }
      const settings = JSON.parse(settingsString) as SavedSettings;
      return settings;
    } catch (err) {
      __DEV__ && console.log('Could note read settings due to:', err);
      throw err;
    }
  },
);

export const restoreDefaultSettings = createAsyncThunk(
  sliceName + '/restoreDefaultSettings',
  async (_, { dispatch }) => {
    dispatch(settingsSlice.actions.restoreDefault());
    try {
      await AsyncStorage.removeItem(sliceName);
    } catch (err) {
      __DEV__ && console.log('Could not remove settings due to:', err);
    }
  },
);

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

    restoreDefault: (state) => {
      (<SettingsStateProps[]>Object.keys(state)).forEach(
        <K extends SettingsStateProps>(prop: K) => {
          state[prop] = initialState[prop];
        },
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSavedSettings.fulfilled, (state, { payload: settings }) => {
      if (settings === null) {
        return;
      }

      (<SettingsStateProps[]>Object.keys(state)).forEach(
        <K extends SettingsStateProps>(prop: K) => {
          if (prop in settings) {
            state[prop] = (settings as SettingsState)[prop]!;
          }
        },
      );
    });
  },
});

export const { setSettingsProp } = settingsSlice.actions;

export default settingsSlice.reducer;
