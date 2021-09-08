import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Switch } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/ui/Button';

import { Text, View } from '../components/ui/Themed';
import {
  customizableExerciseStateProps,
  restoreDefault,
  updateSettings,
} from '../store/exercise';
import { RootState } from '../store/types';
import {
  ExerciseCustomizableProps,
  ExerciseCustomizableState,
} from '../store/exercise/types';
import Layout from '../constants/Layout';

export default function SettingsScreen() {
  const dispatch = useDispatch();

  const exerciseConfig = useSelector((state: RootState) => {
    const config = {} as ExerciseCustomizableState;

    customizableExerciseStateProps.forEach(
      <K extends ExerciseCustomizableProps>(prop: K) => {
        config[prop] = state.exercise[prop];
      },
    );

    return config;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Slider
        value={exerciseConfig.numberOfRounds}
        minimumValue={1}
        maximumValue={10}
        step={1}
        onValueChange={(value) => {
          dispatch(
            updateSettings({ propName: 'numberOfRounds', value: value as number }),
          );
        }}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Disable animation</Text>
        <Switch
          value={exerciseConfig.disableAnimation}
          onValueChange={(value) => {
            dispatch(updateSettings({ propName: 'disableAnimation', value }));
          }}
        />
      </View>

      <Button
        title="Restore Default"
        onPress={() => {
          dispatch(restoreDefault());
        }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing(2),
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  switchLabel: {},
});
