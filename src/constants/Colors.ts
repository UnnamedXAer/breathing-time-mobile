const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const _colors = {
  placeholder: '#2f95dc',
  disabled: '#666',
  error: '#d00000',
  warning: '#ffba08',
  info: '#3a86ff',
} as const;

export default {
  light: {
    primary: 'rgb(1, 77, 77)',
    text: 'rgb(18, 18, 18)',
    textRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
    background: 'rgb(253, 253, 253)',
    backgroundRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: 'rgb(12, 171, 171)',
    text: 'rgb(253, 253, 253)',
    textRGBA: (opacity: number) => `rgba(253, 253, 253, ${opacity})`,
    background: 'rgb(18, 18, 18)',
    backgroundRGBA: (opacity: number) => `rgba(18, 18, 18, ${opacity})`,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  colors: _colors,
} as const;
