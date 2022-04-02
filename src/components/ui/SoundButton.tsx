import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  style?: ViewStyle;
  muted: boolean;
}

const SoundButton: React.FC<Props> = ({ onPress, style, muted }) => {
  const scheme = useColorScheme();

  const dynamicContainerStyle: ViewStyle = {
    // backgroundColor: Colors[scheme].background,
    // borderColor: Colors[scheme].textRGBA(0.3),
    borderWidth: 0,
    ...style,
  };

  const stroke = Colors[scheme].textRGBA(0.6);

  return (
    <TouchableOpacity style={[styles.container, dynamicContainerStyle]} onPress={onPress}>
      {muted && (
        <View style={styles.line}>
          <Text>X</Text>
        </View>
      )}
      <Svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        opacity={style?.opacity}>
        <Path
          d="M2 14.9588L2 9.04123C2 8.46617 2.44772 8 3 8H6.58579C6.851 8 7.10536 7.8903 7.29289 7.69503L10.2929 4.30706C10.9229 3.65112 12 4.11568 12 5.04332V18.9567C12 19.8908 10.91 20.3524 10.2839 19.6834L7.29437 16.3145C7.10615 16.1134 6.84791 16 6.57824 16H3C2.44772 16 2 15.5338 2 14.9588Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          clipRule="evenodd"
          stroke={stroke}
        />
        <Path
          d="M16 8.5C17.3333 10.2778 17.3333 13.7222 16 15.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          clipRule="evenodd"
          stroke={stroke}
        />
        <Path
          d="M19 5C22.9879 8.80835 23.0121 15.2171 19 19"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          clipRule="evenodd"
          stroke={stroke}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default SoundButton;

const styles = StyleSheet.create({
  container: {
    padding: Layout.baseRadius,
    borderRadius: Layout.baseRadius,
    position: 'relative',
  },
  line: {
    height: 24,
    width: 2,
    backgroundColor: Colors.colors.error,
    transform: [{ rotateY: '45deg' }, { rotateZ: '45deg' }],
    position: 'absolute',
    zIndex: 12121212,
    right: 14,
    top: 3,
    opacity: 0.8,
  },
});
