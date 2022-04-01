export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2400,
}

export const SoundName = {
  DebugBreathSound: -1,
  breathIn: 1,
  breathOut: 2,
  breathSoundFast: BreathPace.fast,
  breathSoundNormal: BreathPace.normal,
  breathSoundSlow: BreathPace.slow,
} as const;
