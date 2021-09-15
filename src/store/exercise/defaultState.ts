import { RoundState } from '../../types/breath';

export const productionExerciseDefaultState = {
  started: false,
  disableAnimation: true,
  disableStartTips: false,
  numberOfRounds: 3,
  breathsPerRound: 30,
  recoveryTime: 15,
  breathTime: 2 * 1000,
  currentRoundState: RoundState.Stopped,
  holdTimes: [] as number[],
};
