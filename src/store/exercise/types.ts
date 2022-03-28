import { Audio, AVPlaybackStatus } from 'expo-av';
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

export type SoundAndStatus = {
  sound: Audio.Sound;
  status: AVPlaybackStatus;
} | null;

export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2400,
}
