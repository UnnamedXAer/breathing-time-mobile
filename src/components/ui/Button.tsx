import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { ColorSchemeName } from '../../hooks/useColorScheme';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from './Themed';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonMode = 'outlined' | 'contained' | 'text';

interface Props {
  onPress: (...args: unknown[]) => void | Promise<void>;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  theme?: ColorSchemeName;
  size?: ButtonSize;
  mode?: ButtonMode;
  error?: boolean;
  color?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  allowFontScaling?: boolean;
  accessibilityLabel?: string;
}

const fontSizeMap = {
  medium: Layout.window.height > 600 ? 3 : 2.5,
  small: Layout.window.height > 600 ? 2 : 1.8,
  large: Layout.window.height > 600 ? 4 : 3.5,
};

export default function Button({
  onPress,
  title,
  loading,
  disabled,
  theme,
  mode = 'outlined',
  size = 'medium',
  error,
  color,
  containerStyle,
  textStyle,
  allowFontScaling,
  accessibilityLabel,
}: Props) {
  let colorScheme = useColorScheme();
  if (theme) {
    colorScheme = theme;
  }

  //   const fontSize = Layout.spacing(size === 'medium' ? 3 : size === 'small' ? 2 : 4);
  const fontSize = Layout.spacing(fontSizeMap[size]);

  let borderColor = 'transparent';
  if (disabled && mode !== 'text') {
    borderColor = Colors.colors.disabled;
  } else if (error) {
    borderColor = Colors.colors.error;
  } else if (mode !== 'text') {
    borderColor = Colors[colorScheme].text;
  }

  let textColor: string = Colors[colorScheme].text;
  if (disabled) {
    textColor = Colors.light.textRGBA(0.7); //Colors[colorScheme].textRGBA(0.8); //Colors.colors.disabled;
  } else if (color) {
    textColor = color;
  } else if (mode === 'contained') {
    textColor = Colors[colorScheme].background;
  }

  const backgroundColor =
    mode === 'contained' ? borderColor : Colors[colorScheme].background;

  const styles = StyleSheet.create({
    touchable: {
      borderRadius: 2,
      borderColor,
      backgroundColor,
      borderWidth: 1,
      padding: Layout.spacing(size === 'small' ? 0.5 : 1),
      margin: Layout.spacing(),
      shadowColor: '#fff',
      shadowOffset: {
        width: Layout.baseRadius,
        height: Layout.baseRadius,
      },
      shadowOpacity: 0.6,
      elevation: 5,
      justifyContent: 'center',
    },
    container: {
      marginHorizontal: Layout.spacing(),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      width: fontSize,
      height: fontSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {},
    text: {
      marginLeft: loading ? Layout.spacing() : 0,
      fontSize,
      color: textColor,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        busy: loading,
        disabled,
      }}
      style={styles.touchable}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={mode === 'contained' ? 0.7 : 0.4}>
      <View style={[styles.container, containerStyle]}>
        {loading && (
          <View style={styles.iconContainer}>
            <ActivityIndicator color={textColor} size={fontSize} />
          </View>
        )}
        {title && (
          <Text
            style={[styles.text, textStyle]}
            allowFontScaling={allowFontScaling}
            selectable={false}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
