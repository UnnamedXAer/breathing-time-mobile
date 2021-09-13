import { RoundState } from '../../types/breath';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseCustomizableProps, UpdatePreferencesPayload } from './types';

const initialState = {
  started: false,
  finished: false,
  disableAnimation: true,
  numberOfRounds: 3,
  breathsPerRound: 3,
  recoveryTime: 5,
  breathTime: 1.4 * 1000,
  currentRoundState: RoundState.Stopped,
  holdOutTime: 0,
  holdOutSeconds: 0,
  holdTimes: [] as number[],
};

export type ExerciseState = typeof initialState;

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
  },
});

export const { restoreDefault, updatePreferences } = exerciseSlice.actions;

export default exerciseSlice.reducer;
