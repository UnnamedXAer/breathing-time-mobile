import { StatusBarStyle } from 'expo-status-bar';
import { ColorSchemeName } from '../hooks/useColorScheme';

const _colors = {
  placeholder: '#2f95dc',
  disabled: '#888',
  error: '#d00000',
  warning: '#ffba08',
  info: '#3a86ff',
} as const;

const light = {
  primary: 'rgb(0, 117, 117)',
  accent: '#019191',
  text: 'rgb(18, 18, 18)',
  textRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
  background: 'rgb(253, 253, 253)',
  backgroundRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
  statusBarStyle: 'dark' as StatusBarStyle,
} as const;

type ThemeType = {
  [key in keyof typeof light]: typeof light[key] extends string
    ? string
    : typeof light[key];
} & { statusBarStyle: Exclude<StatusBarStyle, 'auto' | 'inverted'> };

type ColorsType = { [key in ColorSchemeName]: ThemeType } & {
  colors: typeof _colors;
};

const Colors = {
  light,
  dark: {
    primary: 'rgb(12, 171, 171)',
    accent: '#019191',
    text: 'rgb(253, 253, 253)',
    textRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
    background: 'rgb(18, 18, 18)',
    backgroundRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
    statusBarStyle: 'light',
  },
  bluish: {
    primary: 'rgb(3, 119, 189)',
    accent: 'rgb(0, 161, 255)',
    text: 'rgb(13, 71, 161)',
    background: 'rgb(205, 235, 247)',
    textRGBA: (opacity: number) => `rgba(13, 71, 161, ${opacity})`,
    backgroundRGBA: (opacity: number) => `rgba(205, 235, 247, ${opacity})`,
    statusBarStyle: 'dark',
  },
  greenish: {
    primary: 'rgb(130, 170, 30)',
    accent: 'rgb(180,204,120)',
    text: 'rgb(90, 117, 21)',
    textRGBA: (opacity: number) => `rgba(90, 117, 21, ${opacity})`,
    background: 'rgb(249,251,244)',
    backgroundRGBA: (opacity: number) => `rgba(249,251,244, ${opacity})`,
    statusBarStyle: 'dark' as StatusBarStyle,
  },
  reddish: {
    primary: 'rgb(186, 17, 51)',
    accent: 'rgb(255, 186, 8)',
    text: 'rgb(125, 6, 30)',
    textRGBA: (opacity: number) => `rgba(125, 6, 30, ${opacity})`,
    background: 'rgb(255, 245, 219)',
    backgroundRGBA: (opacity: number) => `rgba(255, 245, 219, ${opacity})`,
    statusBarStyle: 'dark' as StatusBarStyle,
  },
  colors: _colors,
} as ColorsType;

export default Colors;
