export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2600,
}

export const SoundName = {
  breathIn: 1,
  breathSoundFast: BreathPace.fast,
  breathSoundNormal: BreathPace.normal,
  breathSoundSlow: BreathPace.slow,
} as const;
