import React from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import Headline from './Headline';
import WarningSvg from './icons/WarningSvg';
import { Text } from './Themed';

interface Props {
  style?: ViewStyle;
  textSize?: number;
  textStyle?: TextStyle;
  title?: string;
  content: string;
  onPress?: () => void;
  type?: Extract<keyof typeof Colors['colors'], 'warning' | 'error' | 'info'>;
  hideIcon?: boolean;
}

const Alert: React.FC<Props> = ({
  title,
  content,
  style,
  textStyle,
  textSize,
  onPress,
  type = 'info',
  hideIcon,
}) => {
  const scheme = useColorScheme();
  const color = Colors.colors[type];

  if (type !== 'warning') {
    hideIcon = true;
  }
  const textSizeDef = textSize
    ? textSize
    : Layout.spacing(Layout.window.height > 600 ? 2.2 : 1.8);

  const pressableStyleFn = ({ pressed }: PressableStateCallbackType) => [
    styles.container,
    {
      borderColor: color,
      opacity: pressed ? 0.5 : 1,
      elevation: 2,
      backgroundColor: Colors[scheme].background,
    },
    hideIcon && {
      paddingHorizontal: Layout.spacing(1),
      paddingVertical: Layout.spacing(1),
    },
    style,
  ];

  return (
    <Pressable style={pressableStyleFn} onPress={onPress}>
      {!hideIcon && (
        <WarningSvg
          fill={Colors.colors.warning}
          opacity={0.6}
          width={48}
          height={48}
          style={styles.icon}
        />
      )}

      <View style={styles.content}>
        {title && <Headline variant="h3">{title}</Headline>}
        <Text
          style={{
            fontSize: textSizeDef,
            textAlign: 'justify',
            textAlignVertical: 'center',
            ...textStyle,
          }}>
          {content}
        </Text>
      </View>
    </Pressable>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    width: '100%',
    borderRadius: Layout.baseRadius,
    paddingRight: Layout.spacing(),
    paddingBottom: Layout.spacing(),
  },
  content: {
    flex: 1,
  },
  icon: {
    display: 'flex',
    width: 48,
    height: 48,
    marginRight: Layout.spacing(),
  },
});
