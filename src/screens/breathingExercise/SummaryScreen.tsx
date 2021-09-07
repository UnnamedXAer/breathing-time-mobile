import * as React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../../components/ui/Button';

import { Text, View } from '../../components/ui/Themed';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';

interface Props extends ExerciseTabScreenProps<'Summary'> {}

export default function SummaryScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise - Summary</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <AppButton
        title="Home"
        onPress={() => {
          navigation.navigate('Root', { screen: 'Home' });
        }}
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
