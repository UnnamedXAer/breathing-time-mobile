import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Layout from '../../../constants/Layout';

interface Props {
  dims: {
    width: number;
    height: number;
  };
}

const BreathingAnimation: React.FC<Props> = ({ dims }) => {
  const dynamicContainer: ViewStyle = { width: 100 };

  useEffect(() => {
    dynamicContainer.width = dims.height;
  }, []);

  return <View style={[styles.container, dynamicContainer]}></View>;
};

export default BreathingAnimation;

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * 0.9,
    maxWidth: 300,
    maxHeight: 300,
    height: Layout.window.height * 0.4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
