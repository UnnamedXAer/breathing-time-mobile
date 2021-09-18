import { useIsFocused } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { RootState } from '../../store/types';
import BreathingAnimation from './animation/BreathingAnimation';

let lastPressedAt = 0;

export default function BreathingScreen({
  navigation,
}: ExerciseTabScreenProps<'Breathing'>) {
  const [started, setStarted] = useCounterStarted(2000);
  const [counter, setCounter] = useState(1);
  const [nextStep, setNextStep] = useState(false);
  const [userForcedNextStep, setUserForcedNextStep] = useState(false);
  const disableAnimation = useSelector(
    (state: RootState) => state.exercise.disableAnimation,
  );
  const breathsPerRound = useSelector(
    (state: RootState) => state.exercise.breathsPerRound,
  );
  const breathTime = useSelector((state: RootState) => state.exercise.breathTime);
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
    navigation.jumpTo('BreathHold');
  }, [breathTime, breathsPerRound, counter, navigation]);

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
  }, [breathTime, completeScreen, nextStep, userForcedNextStep]);

  useEffect(() => {
    if (nextStep || !focused || !started) {
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
  }, [breathTime, focused, nextStep, started]);

  const screenPressHandler = () => {
    if (!started) {
      setStarted(true);
      return;
    }
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
        {!started ? (
          <StartTip text="Breath deeply with counter." />
        ) : (
          <>
            <BreathingAnimation
              counter={counter}
              duration={breathTime}
              disableAnimation={disableAnimation}
            />

            <Counter value={counter} />

            <Footer
              text="Tap twice on the screen to skip to the next phase."
              navigation={navigation}></Footer>
          </>
        )}
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
  if (!!false && __DEV__ && breathsPerRound) {
    const realTime = (Date.now() - startIntervalTime) / 1000;
    const counterTime = ((counter + 1) * breathTime) / 1000;

    console.log('Breathing (->', realTime, '|', counterTime, '|', counter);
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
