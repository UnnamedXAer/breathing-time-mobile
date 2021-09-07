import { useIsFocused } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import Counter from '../../components/Counter';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';
import BreathingAnimation from './animation/BreathingAnimation';

let lastPressedAt = 0;

// mocked values
const breathsPerRound = 0;
const breathTime = 1400;

export default function BreathingScreen({
  navigation,
}: ExerciseStackScreenProps<'Breathing'>) {
  const dims = useWindowDimensions();
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [userForcedNextStep, setUserForcedNextStep] = useState(false);
  const startIntervalTime = useRef(-1);
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  if (counter >= breathsPerRound && !nextStep) {
    setNextStep(true);
  }

  const completeScreen = useCallback(() => {
    __devCheckActualBreathingTime(
      startIntervalTime.current,
      counter,
      breathTime,
      breathsPerRound,
    );
    startIntervalTime.current = -1;
    navigation.navigate('HoldingOut');
  }, [counter, navigation]);

  useEffect(() => {
    if (!focused) {
      startIntervalTime.current = -1;
      setCounter(0);
      setUserForcedNextStep(false);
      setNextStep(false);
    }
  }, [focused]);

  useEffect(() => {
    if (!nextStep) {
      return;
    }

    if (userForcedNextStep) {
      completeScreen();
      return;
    }

    const timeout = setTimeout(completeScreen, breathTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [completeScreen, nextStep, userForcedNextStep]);

  useEffect(() => {
    if (nextStep || !focused) {
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
  }, [focused, nextStep]);

  const screenPressHandler = () => {
    if (Date.now() - lastPressedAt <= 500) {
      setNextStep(true);
      setUserForcedNextStep(true);
      return;
    }

    lastPressedAt = Date.now();
  };

  return (
    <Pressable style={styles.pressable} onPress={screenPressHandler}>
      <View style={styles.container}>
        <Header title="Breathing" />

        <BreathingAnimation dims={dims} />

        <Counter value={counter} />

        <Footer text="Press the button or tap twice on the screen go to the next phase."></Footer>
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
});

function __devCheckActualBreathingTime(
  startIntervalTime: number,
  counter: number,
  breathTime: number,
  breathsPerRound: number,
) {
  if (__DEV__ && breathsPerRound) {
    const realTime = (Date.now() - startIntervalTime) / 1000;
    const counterTime = ((counter + 1) * breathTime) / 1000;

    // console.log('(->', realTime, '|', counterTime, '|', counter);
    if (realTime - counterTime >= 1) {
      const msg = `
		Actual screen time is greater than counter time for more than 1s.
		breathsPerRound: ${breathsPerRound} (+ final timeout)
		breathTime: ${breathTime};
		counter: ${counter};
		startTime: ${startIntervalTime}
		realTime: ${realTime};
		counterTime: ${counterTime};
		difference: ${realTime - counterTime};
		---------------------------------------`;
      console.warn(msg);
    }
  }
}
