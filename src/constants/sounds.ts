/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Asset } from 'expo-asset';

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

export const Sounds = {
  [SoundName.DebugBreathSound]:
    require('../assets/sounds/machin-gun-mg34-double-sound-effect-7-11005.mp3') as Asset, // @TODO  comment this line
  [SoundName.breathSoundFast]: require('../assets/sounds/breath_1400.wav') as Asset,
  [SoundName.breathSoundNormal]: require('../assets/sounds/breath_2000.wav') as Asset,
  [SoundName.breathSoundSlow]: require('../assets/sounds/breath_2600.wav') as Asset,
  // @TODO: replace add sounds
  [SoundName.breathIn]: require('../assets/sounds/breath_1400.wav') as Asset,
  [SoundName.breathOut]: require('../assets/sounds/breath_1400.wav') as Asset,
};

// if (__DEV__) {
//   Object.keys(Sounds).forEach((k) => (Sounds[+k] = Sounds[SoundName.DebugBreathSound]));
// }
