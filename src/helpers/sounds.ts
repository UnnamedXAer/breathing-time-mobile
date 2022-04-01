/* eslint-disable @typescript-eslint/no-var-requires */
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { t } from 'i18n-js';
import { ToastAndroid } from 'react-native';
import { BreathPace, SoundName } from '../constants/breathing';
import {
  SoundData,
  SoundsContextState,
} from '../navigation/exerciseBottomTab/SoundsContext';
import { AVPlaybackStatusLoaded } from '../types/sounds';
import { allSettled } from './promise';

type RequiredSounds = {
  [K in typeof SoundName[keyof typeof SoundName]]: Asset;
};

const Sounds: RequiredSounds = {
  [SoundName.DebugBreathSound]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,

  [SoundName.breathSoundFast]: require('../assets/sounds/breath_1400.wav') as Asset,
  [SoundName.breathSoundNormal]: require('../assets/sounds/breath_2000.wav') as Asset,
  [SoundName.breathSoundSlow]: require('../assets/sounds/breath_2600.wav') as Asset,
  // @TODO: replace/add sounds
  [SoundName.breathIn]: require('../assets/sounds/breath_2000.wav') as Asset,
  [SoundName.breathOut]: require('../assets/sounds/breath_2000.wav') as Asset,

  // @TODO  comment following lines
  //   [SoundName.breathSoundFast]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
  //   [SoundName.breathSoundNormal]: require('../assets/sounds/oneTwo_2000.mp3') as Asset,
  //   [SoundName.breathSoundSlow]: require('../assets/sounds/oneTwo_2600.mp3') as Asset,
  //   [SoundName.breathIn]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
  //   [SoundName.breathOut]: require('../assets/sounds/oneTwo_1400.mp3') as Asset,
};

export function createSoundsAsync(breathTime: BreathPace) {
  __DEV__ && console.log('createSoundsAsync: creating...');

  return Promise.all([
    Audio.Sound.createAsync(Sounds[breathTime]),
    Audio.Sound.createAsync(Sounds[SoundName.breathIn]),
    Audio.Sound.createAsync(Sounds[SoundName.breathOut]),
  ])
    .then((createdSounds) => {
      __DEV__ && console.log('createSoundsAsync: ✔ created');
      return createdSounds;
    })
    .catch((err) => {
      ToastAndroid.show(t('sounds.load_fail'), ToastAndroid.SHORT);
      __DEV__ && console.log('createSoundsAsync: ⭕:', err);
      return null;
    });
}

export async function unloadSoundsAsync(soundsData: SoundsContextState['sounds']) {
  const sounds = Object.values(soundsData);
  const soundsPromises = sounds.map((s) => (!s ? void 0 : s.sound.unloadAsync()));

  __DEV__ && console.log('unloadSoundsAsync: unloading...');
  try {
    const results = await allSettled(soundsPromises);

    if (results.some((x) => x && (x as { status: string }).status === 'rejected')) {
      throw new Error('unable to unload some/all sounds');
    }

    __DEV__ && console.log('unloadSoundsAsync: ✔ unloaded');
  } catch (err) {
    __DEV__ && console.log('unloadSoundsAsync: ⭕:' + (err as Error).toString());
  }
}

export const playSound = async (soundData: SoundData | null) => {
  if (soundData !== null) {
    try {
      await soundData.sound.replayAsync();
    } catch (err) {
      __DEV__ && console.log('playSound: ⭕:', err as Error);
    }
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

export async function toggleSoundsMutedAsync(soundsData: SoundsContextState['sounds']) {
  const sounds = Object.values(soundsData).filter((s) => s != null);
  if (sounds.length === 0) {
    return false;
  }

  try {
    const status = (await sounds[0]!.sound.getStatusAsync()) as AVPlaybackStatusLoaded;

    const soundsPromises = sounds.map((s) =>
      !s ? void 0 : s.sound.setIsMutedAsync(!status.isMuted),
    );

    const results = await allSettled(soundsPromises);
    if (results.some((x) => x && (x as { status: string }).status === 'rejected')) {
      throw new Error('some sounds were not ' + (status.isMuted ? 'unmuted' : 'muted'));
    }
    return true;
  } catch (err) {
    __DEV__ && console.log('toggleSoundsMutedAsync: ⭕:', err);
    ToastAndroid.show(t('sounds.toggle_muted_fail'), ToastAndroid.SHORT);
  }
  return false;
}
