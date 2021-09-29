/* eslint-disable @typescript-eslint/no-var-requires */
import { FontSource } from 'expo-font';
import { Fonts } from '../constants/fonts';

export const fontsMap = {
  [Fonts.Lato]: require('../assets/fonts/lato/lato-v20-latin-regular.otf') as FontSource,
  [Fonts.LatoItalic]:
    require('../assets/fonts/lato/lato-v20-latin-italic.otf') as FontSource,
  [Fonts.LatoLight]: require('../assets/fonts/lato/lato-v20-latin-300.otf') as FontSource,
  [Fonts.LatoBold]: require('../assets/fonts/lato/lato-v20-latin-700.otf') as FontSource,
  [Fonts.LatoBoldItalic]:
    require('../assets/fonts/lato/lato-v20-latin-700italic.otf') as FontSource,
  [Fonts.LatoBolder]:
    require('../assets/fonts/lato/lato-v20-latin-900.otf') as FontSource,
};
