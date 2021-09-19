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
  text: 'rgb(18, 18, 18)',
  textRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
  background: 'rgb(253, 253, 253)',
  backgroundRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
} as const;

type ThemeType = {
  [key in keyof typeof light]: typeof light[key] extends string
    ? string
    : typeof light[key];
};
type ColorsType = { [key in ColorSchemeName]: ThemeType } & {
  colors: typeof _colors;
};

const Colors = {
  light,
  dark: {
    primary: 'rgb(12, 171, 171)',
    text: 'rgb(253, 253, 253)',
    textRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
    background: 'rgb(18, 18, 18)',
    backgroundRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
  },
  bluish: {
    primary: 'rgb(255, 230, 153)',
    text: 'rgb(0, 0, 102)',
    background: 'rgb(112, 153, 194)',
    textRGBA: (opacity: number) => `rgba(0, 0, 102, ${opacity})`,
    backgroundRGBA: (opacity: number) => `rgba(112, 153, 194, ${opacity})`,
  },
  colors: _colors,
} as ColorsType;

export default Colors;
