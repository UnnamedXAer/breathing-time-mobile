import { Audio } from 'expo-av';
import React from 'react';

export type SoundsContextState = {
  sounds: {
    breathing: Audio.Sound | null;
    breathIn: Audio.Sound | null;
    breathOut: Audio.Sound | null;
  };
};

export const SoundContext = React.createContext<SoundsContextState>({
  sounds: {
    breathing: null,
    breathIn: null,
    breathOut: null,
  },
});
