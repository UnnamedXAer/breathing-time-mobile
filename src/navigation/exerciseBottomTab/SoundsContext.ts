import { Audio } from 'expo-av';
import React from 'react';

export const SoundContext = React.createContext<Audio.Sound | null>(null);
