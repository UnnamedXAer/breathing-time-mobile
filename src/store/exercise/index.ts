import { RoundState } from '../../types/breath';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ExerciseCustomizableProps,
  ExerciseState,
  UpdatePreferencesPayload,
} from './types';
import { productionExerciseDefaultState } from './defaultState';

const devInitialState: ExerciseState = {
  started: false,
  finished: false,
  disableAnimation: true,
  numberOfRounds: 3,
  breathsPerRound: 3,
  recoveryTime: 5,
  breathTime: 1.4 * 1000,
  currentRoundState: RoundState.Stopped,
  holdTimes: [] as number[],
};

const initialState = __DEV__ ? devInitialState : productionExerciseDefaultState;

export const customizableExerciseStateProps = [
  'numberOfRounds',
  'breathsPerRound',
  'recoveryTime',
  'breathTime',
  'disableAnimation',
] as ReadonlyArray<ExerciseCustomizableProps>;

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,

  reducers: {
    updatePreferences: (state, { payload }: PayloadAction<UpdatePreferencesPayload>) => {
      const { value, propName } = payload;

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

    addHoldTime: (state, { payload: time }: PayloadAction<number>) => {
      state.holdTimes.push(time);
    },
  },
});

export const { restoreDefault, updatePreferences, addHoldTime } = exerciseSlice.actions;

export default exerciseSlice.reducer;
