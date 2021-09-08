import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/ui/Button';

import { Text, View } from '../components/ui/Themed';
import { restoreDefault, updateSettings } from '../store/exercise';
import { RootState } from '../store/types';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const disableAnimation = useSelector(
    (state: RootState) => state.exercise.disableAnimation,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Disable animation</Text>
        <Switch
          value={disableAnimation}
          onValueChange={(ev) => {
            console.log(ev);
            dispatch(updateSettings({ propName: 'disableAnimation', value: ev }));
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
    alignItems: 'center',
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
