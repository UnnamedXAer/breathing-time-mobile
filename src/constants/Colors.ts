import { StatusBarStyle } from 'expo-status-bar';
import { ColorSchemeName } from '../hooks/useColorScheme';

const _colors = {
  placeholder: '#2f95dc',
  disabled: '#666',
  error: '#d00000',
  warning: '#ffba08',
  info: '#3a86ff',
} as const;

const light = {
  primary: 'rgb(1, 77, 77)',
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
    backgroundRGBA: (opacity: number) => `rgba(127, 217, 255, ${opacity})`,
    statusBarStyle: 'light',
  },
  colors: _colors,
} as ColorsType;

export default Colors;
