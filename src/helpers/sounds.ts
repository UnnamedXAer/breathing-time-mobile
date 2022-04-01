/* eslint-disable @typescript-eslint/no-var-requires */
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { ToastAndroid } from 'react-native';
import { BreathPace, SoundName } from '../constants/breathing';
import {
  SoundData,
  SoundsContextState,
} from '../navigation/exerciseBottomTab/SoundsContext';
import { allSettled } from './promise';

const Sounds = {
  [SoundName.breathSoundFast]: require('../assets/sounds/breath_1400.wav') as Asset,
  [SoundName.breathSoundNormal]: require('../assets/sounds/breath_2000.wav') as Asset,
  [SoundName.breathSoundSlow]: require('../assets/sounds/breath_2600.wav') as Asset,
  // @TODO: replace/add sounds
  [SoundName.breathIn]: require('../assets/sounds/breath_2000.wav') as Asset,
  [SoundName.breathOut]: require('../assets/sounds/breath_2000.wav') as Asset,

  // @TODO  comment following lines
  //   [SoundName.DebugBreathSound]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
  //   [SoundName.breathSoundFast]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
  //   [SoundName.breathSoundNormal]: require('../assets/sounds/oneTwo_2000.mp3') as Asset,
  //   [SoundName.breathSoundSlow]: require('../assets/sounds/oneTwo_2600.mp3') as Asset,
  //   [SoundName.breathIn]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
  //   [SoundName.breathOut]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
};

export function createSoundsAsync(breathTime: BreathPace) {
  __DEV__ && console.log('createSoundsAsync: creating...');

  return (
    Promise.all([
      Audio.Sound.createAsync(Sounds[breathTime]),
      Audio.Sound.createAsync(Sounds[SoundName.breathIn]),
      Audio.Sound.createAsync(Sounds[SoundName.breathOut]),
    ])
      //   return Promise.all([
      //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
      //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
      //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
      //   ])
      .then((v) => {
        __DEV__ && console.log('createSoundsAsync: ✔ created');
        return v;
      })
      .catch((err) => {
      ToastAndroid.show(t('ex.sound_load_fail'), ToastAndroid.SHORT);
      __DEV__ && console.log('createSoundsAsync: ⭕:', err);
      return null;
      })
  );
}

export async function unloadSoundsAsync(soundsData: SoundsContextState['sounds']) {
  const sounds = Object.values(soundsData);
  const soundsPromises = sounds.map((s) =>
    !s || !s.status.isLoaded ? void 0 : s.sound.unloadAsync(),
  );

  __DEV__ && console.log('unloadSoundsAsync: unloading...');
  try {
    await allSettled(soundsPromises);
    __DEV__ && console.log('unloadSoundsAsync: ✔ unloaded');
  } catch (err) {
    __DEV__ && console.log('unloadSoundsAsync: ⭕:' + (err as Error).toString());
  }
}

export const playSound = async (soundData: SoundData | null) => {
  if (soundData !== null && soundData.status.isLoaded) {
    try {
      __DEV__ && console.log('playSound: playing...');
      await soundData.sound.replayAsync();
      __DEV__ && console.log('playSound: ✔ ended');
    } catch (err) {
      __DEV__ && console.log('playSound: ⭕:', err as Error);
    }
  } else {
    __DEV__ && console.log('playSound: Sound is null');
  }
};
export const stopSound = async (soundData: SoundData | null) => {
  if (soundData !== null) {
    try {
      __DEV__ && console.log('stopSound: stopping...');
      await soundData.sound.stopAsync();
      __DEV__ && console.log('stopSound: ✔ stopped');
    } catch (err) {
      __DEV__ && console.log('stopSound: ⭕:', err as Error);
    }
  } else {
    __DEV__ && console.log('stopSound: Sound is null');
  }
};
