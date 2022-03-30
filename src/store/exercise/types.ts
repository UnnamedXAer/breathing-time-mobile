import { productionExerciseDefaultState } from './defaultState';

export type ExerciseState = typeof productionExerciseDefaultState;

export type ExerciseCustomizableState = Pick<
  ExerciseState,
  | 'numberOfRounds'
  | 'breathsPerRound'
  | 'disableStartTips'
  | 'recoveryTime'
  | 'breathTime'
  | 'disableAnimation'
  | 'disableBreathing'
>;

export type ExerciseCustomizableProps = keyof ExerciseCustomizableState;

export type UpdatePreferencesPayload = {
  propName: ExerciseCustomizableProps;
  value: ExerciseState[ExerciseCustomizableProps];
};

export type SavedPreferences = Partial<ExerciseCustomizableState> | null;
