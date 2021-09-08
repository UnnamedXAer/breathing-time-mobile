import { ExerciseState } from '.';

export type ExerciseCustomizableState = Pick<
  ExerciseState,
  | 'numberOfRounds'
  | 'breathsPerRound'
  | 'recoveryTime'
  | 'breathTime'
  | 'disableAnimation'
>;

export type ExerciseCustomizableProps = keyof ExerciseCustomizableState;

export type UpdateSettingsPayload = {
  propName: ExerciseCustomizableProps;
  value: ExerciseState[ExerciseCustomizableProps];
};
