import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  text: string;
}

const StartTip: React.FC<Props> = ({ text }) => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[scheme].backgroundRGBA(0.6),
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default StartTip;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: Layout.window.height * 0.05,
    marginBottom: Layout.window.height * 0.1,
  },
});
