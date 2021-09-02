import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { Text, View } from '../../components/Themed';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';
import BreathingAnimation from './animation/BreathingAnimation';

export default function BreathingScreen({
  navigation,
}: ExerciseStackScreenProps<'Breathing'>) {
  const dims = useWindowDimensions();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter >= 15) {
      navigation.replace('HoldingOut');
    }
  }, []);

  return (
    <View style={styles.container}>
      <BreathingAnimation dims={dims} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Breathing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
