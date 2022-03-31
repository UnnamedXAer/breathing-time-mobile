import { BreathPace } from '../../constants/breathing';

export const productionExerciseDefaultState = {
  started: false,
  disableBreathing: false,
  disableAnimation: false,
  disableStartTips: false,
  numberOfRounds: 3,
  breathsPerRound: 30,
  recoveryTime: 15,
  breathTime: BreathPace.normal,
  holdTimes: [] as number[],
};
