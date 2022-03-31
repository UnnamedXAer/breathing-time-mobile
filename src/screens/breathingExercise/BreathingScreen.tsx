import { useIsFocused } from '@react-navigation/core';
import { Sound } from 'expo-av/build/Audio';
import { t } from 'i18n-js';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import BreathingAnimation from '../../components/breathingExercise/BreathingAnimation';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import { BreathPace } from '../../constants/sounds';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { SoundContext } from '../../navigation/exerciseBottomTab/SoundsContext';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { RootState } from '../../store/types';

let lastPressedAt = 0;

export default function BreathingScreen({
  navigation,
}: ExerciseTabScreenProps<'Breathing'>) {
  const [started, setStarted] = useCounterStarted(BreathPace.normal);
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
  const { sounds } = useContext(SoundContext);

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

  const playSound = useCallback((sound: Sound | null) => {
    if (sound !== null) {
      try {
        __DEV__ && console.log('Playing Sound');
        sound
          .replayAsync()
          .catch((err) => __DEV__ && console.log('Play sound: ', err as Error));
      } catch (err) {
        __DEV__ && console.log('SOUND_PLAYER: ', err as Error);
      }
    } else {
      __DEV__ && console.log('Sound is null');
    }
  }, []);

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
    playSound(sounds.breathing);

    const interval = setIntervalWithTimeout(() => {
      playSound(sounds.breathing);

      setCounter((prev) => prev + 1);
    }, breathTime);

    return () => {
      sounds.breathing?.stopAsync().catch((err) => {
        __DEV__ && console.log('breathing: breathSound.stopAsync: ERROR:', err);
      });
      interval.clear();
    };
  }, [sounds.breathing, breathTime, focused, nextStep, playSound, started]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.pressable} onPress={screenPressHandler}>
        <Header title={t('ex.breathing.title')} />
        {!started ? (
          <StartTip text={t('ex.breathing.start_tip')} />
        ) : (
          <>
            <BreathingAnimation
              counter={counter}
              duration={breathTime}
              disableAnimation={disableAnimation}
            />

            <Counter value={counter} />

            <Footer
              text={t('ex.breathing.skip_to_next')}
              navigation={navigation}></Footer>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
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
