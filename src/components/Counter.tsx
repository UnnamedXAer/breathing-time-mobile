import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './ui/Themed';
import Layout from '../constants/Layout';

interface Props {
  value: number | string;
  text?: string;
  fontSize?: number;
  containerStyle?: ViewStyle;
}
const defaultFontSize = Layout.window.height * 0.25;
const Counter: React.FC<Props> = ({
  value,
  text,
  fontSize = defaultFontSize,
  containerStyle,
}) => {
  if (value > 999) {
    fontSize = Layout.window.height * 0.18;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {text && <Text style={[styles.text]}>{text}</Text>}
      <Text style={[styles.value, { fontSize }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - Layout.spacing(2),
  },
  text: {
    fontSize: Layout.spacing(6),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.spacing(4),
  },
  value: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: Layout.spacing(),
  },
});

export default Counter;
