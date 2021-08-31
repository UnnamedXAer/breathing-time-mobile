import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';

export default function StartScreen({ navigation }: ExerciseStackScreenProps<'Start'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise - Start</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        onPress={() =>
          navigation.navigate('BreathingExerciseStack', {
            screen: 'Breathing',
          })
        }
        title="START"
      />
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
