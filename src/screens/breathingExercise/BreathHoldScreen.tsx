import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import AppButton from '../../components/ui/Button';
import Layout from '../../constants/Layout';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { addHoldTime } from '../../store/exercise';

let lastPressedAt = 0;

export default function BreathHoldScreen({
  navigation,
}: ExerciseTabScreenProps<'BreathHold'>) {
  const dispatch = useDispatch();
  const [started, setStarted] = useCounterStarted(2000);
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const startIntervalTime = useRef(-1);
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  const completeScreen = useCallback(() => {
    setNextStep(true);
    dispatch(addHoldTime((Date.now() - startIntervalTime.current) / 1000));
    // __devCheckActualTime(startIntervalTime.current, counter);
    startIntervalTime.current = -1;
    navigation.jumpTo('Recovery');
  }, [dispatch, navigation]);

  useEffect(() => {
    if (!focused) {
      startIntervalTime.current = -1;
      setCounter(0);
      setNextStep(false);
    }
  }, [focused]);

  useEffect(() => {
    if (nextStep || !focused || !started) {
      return;
    }

    if (startIntervalTime.current === -1) {
      startIntervalTime.current = Date.now();
    }
    const interval = setIntervalWithTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 998);

    return () => {
      interval.clear();
    };
  }, [focused, nextStep, started]);

  const screenPressHandler = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (Date.now() - lastPressedAt <= 500) {
      completeScreen();
      return;
    }

    lastPressedAt = Date.now();
  };

  return (
    <Pressable style={styles.pressable} onPress={screenPressHandler}>
      <View style={styles.container}>
        <Header
          title={t('ex.hold.title')}
          roundInfo={!started ? void 0 : t('ex.hold.round_info')}
        />
        {!started ? (
          <StartTip text={t('ex.hold.start_tip')} />
        ) : (
          <>
            <Counter value={counter} />
            <AppButton
              onPress={completeScreen}
              title={t('ex.hold.next_phase')}
              size="large"
              mode="contained"
              containerStyle={styles.btnContainer}
              textStyle={styles.btnText}
            />

            <Footer text={t('ex.hold.skip_to_next')} navigation={navigation}></Footer>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    padding: Layout.spacing(2),
  },
  btnText: {
    fontSize: Layout.spacing(5),
    fontVariant: ['small-caps'],
  },
});

function __devCheckActualTime(startIntervalTime: number, counter: number) {
  if (__DEV__) {
    const realTime = (Date.now() - startIntervalTime) / 1000;
    const counterTime = counter / 1000;

    console.log('Breath Hold (->', realTime, '|', counterTime, '|', counter);
    if (realTime - counterTime >= 1) {
      const msg = `
			  Actual screen time is greater than counter time for more than 1s.
			  recoveryTime: ${counter};
			  startTime: ${startIntervalTime}
			  counter: ${realTime};
			  counterTime: ${counterTime};
			  difference: ${realTime - counterTime};
			  ---------------------------------------`;
      console.warn(msg);
    }
  }
}
