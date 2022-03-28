/* eslint-disable @typescript-eslint/no-var-requires */
import { Audio } from 'expo-av';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BreathPace,
  ExerciseCustomizableProps,
  ExerciseCustomizableState,
  ExerciseState,
  SavedPreferences,
  SoundAndStatus,
  UpdatePreferencesPayload,
} from './types';
import { productionExerciseDefaultState } from './defaultState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../types';
import { ToastAndroid } from 'react-native';
import { Asset } from 'expo-asset';

const devInitialState: ExerciseState = {
  started: false,
  disableBreathing: true,
  disableAnimation: true,
  disableStartTips: true,
  numberOfRounds: 3,
  breathsPerRound: 31231231,
  recoveryTime: 5,
  breathTime: 2 * 1000,
  holdTimes: [] as number[],
  breathSoundFetched: false,
  breathSound: null,
};

export const sliceName = 'exercise' as const;

const initialState = __DEV__ ? devInitialState : productionExerciseDefaultState;

export const customizableExerciseStateProps = [
  'numberOfRounds',
  'breathsPerRound',
  'recoveryTime',
  'breathTime',
  'disableAnimation',
  'disableBreathing',
  'disableStartTips',
] as ReadonlyArray<ExerciseCustomizableProps>;

export const loadBreathSound = createAsyncThunk<
  SoundAndStatus | null,
  void,
  { state: RootState }
>(sliceName + '/loadBreathSound', async (payload, { getState }) => {
  const { exercise: state } = getState();
  //   if (state.breathSoundFetched) {
  //     return null;
  //   }

  const sounds = {
    [BreathPace.fast]: require('../../assets/sounds/breath_1400.wav') as Asset,
    [BreathPace.normal]: require('../../assets/sounds/breath_2000.wav') as Asset,
    [BreathPace.slow]: require('../../assets/sounds/breath_2600.wav') as Asset,
  };
  try {
    const sound = await Audio.Sound.createAsync(sounds[state.breathTime]);
    console.log('Is Loaded: ' + sound.status.isLoaded.toString());
    return sound;
  } catch (err) {
    __DEV__ && console.log(`loadBreathSound: ${(err as Error).toString()}`);
    throw err;
  }
});

export const updatePreferences = createAsyncThunk<
  void,
  UpdatePreferencesPayload,
  { state: RootState }
>(sliceName + '/updatePreferences', (payload, { dispatch, getState }) => {
  dispatch(exerciseSlice.actions.setPreferencesProp(payload));

  const { exercise: state } = getState();

  const preferences = {} as ExerciseCustomizableState;
  customizableExerciseStateProps.forEach(
    <K extends ExerciseCustomizableProps>(prop: K) => {
      preferences[prop] = state[prop];
    },
  );

  void savePreferences(preferences);
});

export const savePreferences = async (preferences: ExerciseCustomizableState) => {
  try {
    await AsyncStorage.setItem(sliceName, JSON.stringify(preferences));
  } catch (err) {
    __DEV__ && console.log('Could note save preferences due to:', err);
    ToastAndroid.show(
      "Preferences couldn't be saved\nYou may need to update them after app relaunch.",
      ToastAndroid.SHORT,
    );
  }
};

export const getSavedPreferences = createAsyncThunk<SavedPreferences>(
  sliceName + '/getSavedPreferences',
  async () => {
    try {
      const preferencesString = await AsyncStorage.getItem(sliceName);
      if (preferencesString === null) {
        return null;
      }
      const preferences = JSON.parse(preferencesString) as SavedPreferences;
      return preferences;
    } catch (err) {
      __DEV__ && console.log('Could note read preferences due to:', err);
      throw err;
    }
  },
);

export const restoreDefaultPreferences = createAsyncThunk(
  sliceName + '/restoreDefaultPreferences',
  async (_, { dispatch }) => {
    dispatch(exerciseSlice.actions.restoreDefault());
    try {
      await AsyncStorage.removeItem(sliceName);
    } catch (err) {
      __DEV__ && console.log('Could not remove preferences due to:', err);
    }
  },
);

const exerciseSlice = createSlice({
  name: sliceName,
  initialState,

  reducers: {
    startExercise: (state) => {
      state.started = true;
    },

    addHoldTime: (state, { payload: time }: PayloadAction<number>) => {
      state.holdTimes.push(time);
    },

    finishExercise: (state) => {
      state.started = false;
    },

    cleanExercise: (state) => {
      state.started = false;
      state.holdTimes = [];
    },

    setPreferencesProp: (
      state,
      { payload: { propName, value } }: PayloadAction<UpdatePreferencesPayload>,
    ) => {
      (<K extends ExerciseCustomizableProps>(prop: K) => {
        state[prop] = value as ExerciseState[K];
      })(propName);
    },

    restoreDefault: (state) => {
      customizableExerciseStateProps.forEach(
        <K extends ExerciseCustomizableProps>(prop: K) => {
          state[prop] = initialState[prop];
        },
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSavedPreferences.fulfilled, (state, { payload: preferences }) => {
      if (preferences === null) {
        return;
      }

      customizableExerciseStateProps.forEach(
        <K extends ExerciseCustomizableProps>(prop: K) => {
          if (prop in preferences) {
            state[prop] = (preferences as ExerciseState)[prop];
          }
        },
      );
    });

    builder.addCase(getSavedPreferences.rejected, () => {
      ToastAndroid.show(
        "Error. Couldn't load your preferences.\nPlease verify them.",
        ToastAndroid.LONG,
      );
    });

    builder.addCase(loadBreathSound.pending, (state) => {
      if (!state.breathSoundFetched) {
        state.breathSoundFetched = true;
      }
    });

    builder.addCase(loadBreathSound.fulfilled, (state, { payload: sound }) => {
      if (sound !== null) {
        state.breathSound = sound;
      }
    });

    builder.addCase(loadBreathSound.rejected, () => {
      ToastAndroid.show("Error. Couldn't load the breath sound.", ToastAndroid.SHORT);
    });
  },
});

export const { addHoldTime, finishExercise, startExercise, cleanExercise } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
