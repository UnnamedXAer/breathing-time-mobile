/* eslint-disable @typescript-eslint/no-var-requires */
import { FontSource } from 'expo-font';
import { Fonts } from '../constants/fonts';

export const fontsMap = {
  [Fonts.Lato]:
    require('../assets/fonts/lato/lato-v20-latin-ext-regular.ttf') as FontSource,
  [Fonts.LatoItalic]:
    require('../assets/fonts/lato/lato-v20-latin-ext-italic.ttf') as FontSource,
  [Fonts.LatoLight]:
    require('../assets/fonts/lato/lato-v20-latin-ext-300.ttf') as FontSource,
  [Fonts.LatoBold]:
    require('../assets/fonts/lato/lato-v20-latin-ext-700.ttf') as FontSource,
  [Fonts.LatoBoldItalic]:
    require('../assets/fonts/lato/lato-v20-latin-ext-700italic.ttf') as FontSource,
  [Fonts.LatoBolder]:
    require('../assets/fonts/lato/lato-v20-latin-ext-900.ttf') as FontSource,
};
