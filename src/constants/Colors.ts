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
  primary: 'rgb(1, 77, 77)',
  light: {
    text: 'rgb(18, 18, 18)',
    background: 'rgb(253, 253, 253)',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: 'rgb(253, 253, 253)',
    background: 'rgb(18, 18, 18)',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  colors: _colors,
};