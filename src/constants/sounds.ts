/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Asset } from 'expo-asset';

export enum BreathPace {
  fast = 1400,
  normal = 2000,
  slow = 2400,
}

export const Sounds = {
  [BreathPace.fast]: require('../assets/sounds/breath_1400.wav') as Asset,
  [BreathPace.normal]: require('../assets/sounds/breath_2000.wav') as Asset,
  [BreathPace.slow]: require('../assets/sounds/breath_2600.wav') as Asset,
} as const;
