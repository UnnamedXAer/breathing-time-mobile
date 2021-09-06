import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './ui/Themed';
import Layout from '../constants/Layout';

interface Props {
  value: number | string;
  text?: string;
  fontSize?: number;
}
const defaultFontSize = Layout.window.height * 0.25;
const Counter: React.FC<Props> = ({ value, text, fontSize = defaultFontSize }) => {
  return (
    <View style={styles.container}>
      {text && <Text style={[styles.text]}>{text}</Text>}
      <Text style={[styles.value, { fontSize }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: Layout.spacing(6),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.spacing(4),
  },
  value: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Counter;
