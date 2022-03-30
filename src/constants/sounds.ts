/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2400,
}

export const BreathSounds = {
  [BreathPace.fast]: require('../assets/sounds/breath_1400.wav'),
  [BreathPace.normal]: require('../assets/sounds/breath_2000.wav'),
  [BreathPace.slow]: require('../assets/sounds/breath_2400.wav'),
} as const;
