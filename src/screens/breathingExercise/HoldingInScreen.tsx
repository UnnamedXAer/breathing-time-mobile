import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import Counter from '../../components/Counter';
import Layout from '../../constants/Layout';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import {
  ExerciseStackParamList,
  ExerciseStackScreenProps,
} from '../../navigation/exerciseStack/types';

let lastPressedAt = 0;

// mocked values
const maxRounds = 3;
const currentRound = 3;
const holdInTime = 15;

export default function HoldingInScreen({
  navigation,
}: ExerciseStackScreenProps<'HoldingIn'>) {
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const startIntervalTime = useRef(-1);
  const isLastRound = currentRound >= maxRounds;
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  const completeScreen = useCallback(() => {
    setNextStep(true);
    __devCheckActualGoldOutTime(startIntervalTime.current, counter);
    startIntervalTime.current = -1;
    let nextScreen: keyof ExerciseStackParamList = 'Breathing';
    if (isLastRound) {
      nextScreen = 'Summary';
    }
    navigation.navigate(nextScreen);
  }, [counter, isLastRound, navigation]);

  useEffect(() => {
    if (!focused) {
      startIntervalTime.current = -1;
      setCounter(0);
      setNextStep(false);
    }
  }, [focused]);

  useEffect(() => {
    if (nextStep || !focused) {
      return;
    }

    if (startIntervalTime.current === -1) {
      startIntervalTime.current = Date.now();
    }
    const interval = setIntervalWithTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      interval.clear();
    };
  }, [focused, nextStep]);

  const screenPressHandler = () => {
    if (Date.now() - lastPressedAt <= 500) {
      setNextStep(true);
      completeScreen();
      return;
    }

    lastPressedAt = Date.now();
  };

  return (
    <Pressable style={styles.pressable} onPress={screenPressHandler}>
      <View style={styles.container}>
        <Header
          title="Recovery"
          roundInfo={`Take one deep breath and hold for ${holdInTime} seconds.`}
        />
        <Counter
          value={counter}
          containerStyle={{ marginBottom: Layout.window.height * 0.25 }}
        />
        <Footer
          text={`Tap twice on the screen to skip to the ${
            isLastRound ? 'Summary screen' : 'next round'
          }.`}></Footer>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function __devCheckActualGoldOutTime(...args: number[]) {}
