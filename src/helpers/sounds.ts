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
  [SoundName.breathSoundFast]:
    require('../assets/sounds/default_breath/breath1400.mp3') as Asset,
  [SoundName.breathSoundNormal]:
    require('../assets/sounds/default_breath/breath2000.mp3') as Asset,
  [SoundName.breathSoundSlow]:
    require('../assets/sounds/default_breath/breath2600.mp3') as Asset,
  [SoundName.breathIn]: require('../assets/sounds/default_breath/breath_in.mp3') as Asset,
};

export async function createSoundsAsync(breathTime: BreathPace) {
  __DEV__ && console.log('createSoundsAsync: creating...');
  const now_b = Date.now();

  try {
    const createdSounds = await Promise.all([
      Audio.Sound.createAsync(Sounds[breathTime]),
      Audio.Sound.createAsync(Sounds[SoundName.breathIn]),
      Audio.Sound.createAsync(Sounds[SoundName.breathSoundNormal]),
    ]);
    __DEV__ && console.log('createSoundsAsync: ✔ created');
    __DEV__ &&
      Date.now() - now_b > 500 &&
      console.log(`⚠⚠⚠ sounds creation took ${Date.now() - now_b}ms!`);
    return createdSounds;
  } catch (err) {
    ToastAndroid.show(t('sounds.load_fail'), ToastAndroid.SHORT);
    __DEV__ && console.log('createSoundsAsync: ⭕:', err);
    return null;
  }
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
      await soundData.sound.stopAsync();
    } catch (err) {
      __DEV__ && console.log('stopSound: ⭕:', err as Error);
    }
  }
};

export async function toggleSoundsMutedAsync(
  soundsData: SoundsContextState['sounds'],
): Promise<boolean> {
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
