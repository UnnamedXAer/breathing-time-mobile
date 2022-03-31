export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2400,
}

export enum SoundName {
  DebugBreathSound = -1,
  breathSoundFast = BreathPace.fast,
  breathSoundNormal = BreathPace.normal,
  breathSoundSlow = BreathPace.slow,
  breathIn = BreathPace.slow + 1,
  breathOut = BreathPace.slow + 2,
}
