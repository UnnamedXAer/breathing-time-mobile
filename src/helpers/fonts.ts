/* eslint-disable @typescript-eslint/no-var-requires */
import { FontSource } from 'expo-font';
import { LatoFont } from '../constants/fonts';

// @todo: remove unnecessary entires
export const latoFontsMap = {
  [LatoFont.Lato]: require('../assets/fonts/lato/Lato.ttf') as FontSource,
  [LatoFont.LatoBoldItalic]:
    require('../assets/fonts/lato/Lato_bold_italic.ttf') as FontSource,
  [LatoFont.LatoBolderItalic]:
    require('../assets/fonts/lato/Lato_bolder_italic.ttf') as FontSource,
  [LatoFont.LatoLight]: require('../assets/fonts/lato/Lato_light.ttf') as FontSource,
  [LatoFont.LatoThin]: require('../assets/fonts/lato/Lato_thin.ttf') as FontSource,
  [LatoFont.LatoBold]: require('../assets/fonts/lato/Lato_bold.ttf') as FontSource,
  [LatoFont.LatoBolder]: require('../assets/fonts/lato/Lato_bolder.ttf') as FontSource,
  [LatoFont.LatoItalic]: require('../assets/fonts/lato/Lato_italic.ttf') as FontSource,
  [LatoFont.LatoLightItalic]:
    require('../assets/fonts/lato/Lato_light_italic.ttf') as FontSource,
  [LatoFont.LatoThinItalic]:
    require('../assets/fonts/lato/Lato_thin_italic.ttf') as FontSource,
};
