import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import { Text } from '../ui/Themed';

interface Props {
  text: string;
}

const StartTip: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default StartTip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(250,250,250, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: Layout.window.height * 0.06,
    marginBottom: Layout.window.height * 0.1,
  },
});
