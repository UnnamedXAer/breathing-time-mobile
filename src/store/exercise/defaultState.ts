import { BreathPace, SoundAndStatus } from './types';

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
  breathSoundFetched: false,
  // any as workaround for
  //Type '{ sound: Sound; status: AVPlaybackStatus; }' is not assignable to type 'WritableDraft<{ sound: Sound; status: AVPlaybackStatus; }>'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  breathSound: null as any | SoundAndStatus,
};
