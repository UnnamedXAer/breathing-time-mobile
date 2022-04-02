import { Sound } from 'expo-av/build/Audio';
import React from 'react';

export type SoundData = {
  sound: Sound;
};

export type SoundsContextState = {
  loadSounds: () => Promise<void>;
  sounds: {
    breathing: SoundData | null;
    breathIn: SoundData | null;
    breathInOut: SoundData | null;
  };
};

export const SoundContext = React.createContext<SoundsContextState>(null!);
