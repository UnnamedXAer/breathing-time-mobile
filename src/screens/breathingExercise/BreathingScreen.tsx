import { EventListenerCallback, EventMapCore } from '@react-navigation/core';
import { NativeStackNavigationEventMap } from '@react-navigation/native-stack/lib/typescript/src/types';
import { StackNavigationState } from '@react-navigation/routers';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, useWindowDimensions } from 'react-native';

import { Text, View } from '../../components/ui/Themed';
import setIntervalWithTimeout from '../../helpers/setInterval';
import {
  ExerciseStackParamList,
  ExerciseStackScreenProps,
} from '../../navigation/exerciseStack/types';
import BreathingAnimation from './animation/BreathingAnimation';

const breathsPerRound = 15;
const breathTime = 1000;
export default function BreathingScreen({
  navigation,
}: ExerciseStackScreenProps<'Breathing'>) {
  const dims = useWindowDimensions();
  const [counter, setCounter] = useState(0);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const startIntervalTime = useRef(-1);

  if (counter >= breathsPerRound && !nextStep) {
    setNextStep(true);
  }

  useEffect(() => {
    if (!nextStep) {
      return;
    }
    const timeout = setTimeout(() => {
      console.log((Date.now() - startIntervalTime.current) / 1000, counter);
      navigation.replace('HoldingOut');
    }, breathTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation, nextStep, counter]);

  useEffect(() => {
    if (nextStep) {
      return;
    }

    if (startIntervalTime.current === -1) {
      startIntervalTime.current = Date.now();
    }
    const interval = setIntervalWithTimeout(() => {
      setCounter((prev) => prev + 1);
    }, breathTime);

    return () => {
      interval.clear();
    };
  }, [nextStep]);

  useEffect(() => {
    const callback: EventListenerCallback<
      NativeStackNavigationEventMap &
        EventMapCore<StackNavigationState<ExerciseStackParamList>>,
      'beforeRemove'
    > = (ev) => {
      if (
        ((ev.data.action.payload as { name: string } | undefined)?.name as string) ===
        'HoldingOut'
      ) {
        return;
      }

      ev.preventDefault();

      Alert.alert('Warning!', 'Cancel Exercise?', [
        {
          text: 'Yes',
          onPress: () => {
            navigation.dispatch(ev.data.action);
          },
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {},
        },
      ]);
    };

    navigation.addListener('beforeRemove', callback);

    return () => {
      navigation.removeListener('beforeRemove', callback);
    };
  }, [navigation]);

  return (
    <Pressable style={styles.container} onPress={() => setNextStep(true)}>
      <Switch
        value={disableAnimation}
        onChange={() => setDisableAnimation((prev) => !prev)}
      />
      <Text style={styles.title}>Tap twice to go to the next phase.</Text>
      <BreathingAnimation dims={dims} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Breathing</Text>
      <Text style={styles.title}>{counter}</Text>
    </Pressable>
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
