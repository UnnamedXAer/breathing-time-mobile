import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  windowRatio: width / height,
  isSmallDevice: width < 375,
  baseRadius: 4,
  spacing: (x = 1) => x * 8,
};
