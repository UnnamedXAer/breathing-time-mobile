import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import Layout from '../../constants/Layout';
import { playSound, stopSound } from '../../helpers/sounds';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { SoundContext } from '../../navigation/exerciseBottomTab/SoundsContext';
import {
  ExerciseTabParamList,
  ExerciseTabScreenProps,
} from '../../navigation/exerciseBottomTab/types';
import { RootState } from '../../store/types';
import { TimeoutReturn } from '../../types/types';

let lastPressedAt = 0;

function calculateCounter(screenStartTime: number, recoveryTime: number): number {
  const screenTime = (Date.now() - screenStartTime) / 1000;

  if (recoveryTime - screenTime <= 1) {
    return 1;
  }
  const newCounter = recoveryTime - Math.floor(screenTime);
  return newCounter;
}

export default function RecoveryScreen({
  navigation,
}: ExerciseTabScreenProps<'Recovery'>) {
  const { recoveryTime, numberOfRounds, holdTimes, disableBreathing, disableStartTips } =
    useSelector((state: RootState) => state.exercise);
  const [started, setStarted] = useCounterStarted(2000);
  const [counter, setCounter] = useState(recoveryTime);
  const startIntervalTime = useRef(-1);
  const isLastRound = holdTimes.length >= numberOfRounds;
  const [count, setCount] = useState(false);
  const timeoutRef = useRef<TimeoutReturn>(void 0);
  const exitTimeoutRef = useRef<TimeoutReturn>(void 0);
  const lastTick = useRef(0);
  const soundTimeout = useRef<NodeJS.Timeout | null>(null);
  const [userForcedNextScreen, setUserForcedNextScreen] = useState(false);
  const { sounds } = useContext(SoundContext);

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
    navigation.jumpTo(nextScreenName);
  }, [focused, isLastRound, navigation]);

  const appStateChangeHandler = (appState: AppStateStatus) => {
    if (appState === 'active' && startIntervalTime.current > 0) {
      setCounter(calculateCounter(startIntervalTime.current, recoveryTime));
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', appStateChangeHandler);
    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [focused, recoveryTime, started]);

  useEffect(() => {
    if (disableBreathing || disableStartTips) {
      return;
    }
    let playing = false;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    soundTimeout.current = setTimeout(async () => {
      soundTimeout.current = null;
      playing = true;
      await playSound(sounds.breathIn);
      playing = false;
    }, 550);

    return () => {
      if (playing) {
        void stopSound(sounds.breathIn);
      }
    };
  }, [disableBreathing, disableStartTips, sounds.breathIn]);

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
      if (soundTimeout.current) {
        clearTimeout(soundTimeout.current);
        soundTimeout.current = null;
      }
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
          title={t('ex.recovery.title')}
          roundInfo={!started ? void 0 : t('ex.recovery.round_info', [recoveryTime])}
        />
        {!started ? (
          <StartTip text={t('ex.recovery.start_tip')} />
        ) : (
          <>
            <Counter
              value={counter}
              containerStyle={{ marginBottom: Layout.window.height * 0.2 }}
            />
            <Footer
              text={t(`ex.recovery.${isLastRound ? 'skip_to_summary' : 'skip_to_next'}`)}
              navigation={navigation}
            />
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
