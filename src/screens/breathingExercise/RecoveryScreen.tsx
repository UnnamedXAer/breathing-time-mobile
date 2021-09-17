import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import Layout from '../../constants/Layout';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import {
  ExerciseTabParamList,
  ExerciseTabScreenProps,
} from '../../navigation/exerciseBottomTab/types';
import { TimeoutReturn } from '../../types/types';

let lastPressedAt = 0;

// mocked values
const maxRounds = 2;
let currentRound = 1;
const recoveryTime = 5;

export default function RecoveryScreen({
  navigation,
}: ExerciseTabScreenProps<'Recovery'>) {
  const [started, setStarted] = useCounterStarted(2000);
  const [counter, setCounter] = useState(recoveryTime);
  const startIntervalTime = useRef(-1);
  const isLastRound = currentRound >= maxRounds;
  const [count, setCount] = useState(false);
  const timeoutRef = useRef<TimeoutReturn>(void 0);
  const exitTimeoutRef = useRef<TimeoutReturn>(void 0);
  const lastTick = useRef(0);
  const [userForcedNextScreen, setUserForcedNextScreen] = useState(false);

  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  const nextScreen = useCallback(() => {
    if (!focused) {
      return;
    }
    let nextScreenName: keyof ExerciseTabParamList = 'Breathing';
    if (isLastRound) {
      nextScreenName = 'Summary';
    }
    currentRound++;
    navigation.jumpTo(nextScreenName);
  }, [focused, isLastRound, navigation]);

  useEffect(() => {
    if (userForcedNextScreen) {
      //   __devCheckActualTime(startIntervalTime.current, recoveryTime - counter);
      setCount(false);
      nextScreen();
    }
  }, [nextScreen, userForcedNextScreen]);

  useEffect(() => {
    if (!focused || counter > 1) {
      return;
    }
    setCount(false);

    exitTimeoutRef.current = setTimeout(() => {
      //   __devCheckActualTime(startIntervalTime.current, recoveryTime - counter);
      nextScreen();
    }, 995);
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = void 0;
      }
    };
  }, [counter, nextScreen, focused]);

  useEffect(() => {
    if (!focused) {
      startIntervalTime.current = -1;
      setCounter(recoveryTime);
      setCount(false);
      setUserForcedNextScreen(false);
      return;
    }
    if (started) {
      setCounter(recoveryTime);
      setCount(true);
    }
  }, [focused, started]);

  useEffect(() => {
    if (!count) {
      return;
    }
    let tm = 998;
    const decrement = () => {
      tm = 2000 - (Date.now() - lastTick.current);
      if (tm > 1020) tm = 1020;
      else if (tm < 980) tm = 980;
      timeoutRef.current = setTimeout(decrement, tm);
      lastTick.current = Date.now();
      setCounter((c) => c - 1);
    };

    lastTick.current = startIntervalTime.current = Date.now();
    timeoutRef.current = setTimeout(decrement, tm);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = void 0;
      }
    };
  }, [count]);

  const screenPressHandler = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (Date.now() - lastPressedAt <= 500) {
      setCount(false);
      setUserForcedNextScreen(true);
      return;
    }

    lastPressedAt = Date.now();
  };

  return (
    <Pressable style={styles.pressable} onPress={screenPressHandler}>
      <View style={styles.container}>
        <Header
          title="Recovery"
          roundInfo={
            !started
              ? void 0
              : `Take one deep breath and hold for ${recoveryTime} seconds.`
          }
        />
        {!started ? (
          <StartTip text="Inhale deeply and stop breathing." />
        ) : (
          <>
            <Counter
              value={counter}
              containerStyle={{ marginBottom: Layout.window.height * 0.25 }}
            />
            <Footer
              text={`Tap twice on the screen to skip to the ${
                isLastRound ? 'Summary screen' : 'next round'
              }.`}></Footer>
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

function __devCheckActualTime(startIntervalTime: number, recoveryTime: number) {
  if (__DEV__) {
    const realTime = (Date.now() - startIntervalTime) / 1000;
    const counterTime = (recoveryTime + 1) / 1000;

    console.log('Recovery (->', realTime, '|', counterTime, '|', recoveryTime);
    if (realTime - counterTime >= 1) {
      const msg = `
			Actual screen time is greater than counter time for more than 1s.
			recoveryTime: ${recoveryTime};
			startTime: ${startIntervalTime}
			realTime: ${realTime};
			counterTime: ${counterTime};
			difference: ${realTime - counterTime};
			---------------------------------------`;
      console.warn(msg);
    }
  }
}