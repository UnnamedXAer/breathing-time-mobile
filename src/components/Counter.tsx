import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';

interface Props {
  value: number | string;
  text?: string;
}

const Counter: React.FC<Props> = ({ value, text }) => {
  return (
    <View style={styles.container}>
      {text && <Text style={styles.text}>{text}</Text>}
      <Text style={styles.value}>{value}</Text>
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
    fontSize: Layout.spacing(8),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Counter;
