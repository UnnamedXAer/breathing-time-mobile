import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import Counter from '../../components/Counter';
import AppButton from '../../components/ui/Button';
import Layout from '../../constants/Layout';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';

let lastPressedAt = 0;

export default function HoldingOutScreen({
  navigation,
}: ExerciseTabScreenProps<'HoldingOut'>) {
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const startIntervalTime = useRef(-1);
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  const completeScreen = useCallback(() => {
    setNextStep(true);
    // __devCheckActualTime(startIntervalTime.current, counter);
    startIntervalTime.current = -1;
    // navigation.navigate('BreathingExerciseStack', { screen: 'HoldingIn' });
    navigation.jumpTo('HoldingIn');
  }, [navigation]);

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
    }, 998);

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
          title="Breath Hold"
          roundInfo="Exhale and stop breathing until you feel urge to inhale."
        />

        <Counter value={counter} />
        <AppButton
          onPress={completeScreen}
          title="Next Phase"
          size="large"
          mode="contained"
          containerStyle={{ padding: Layout.spacing(2) }}
          textStyle={{ fontSize: Layout.spacing(5), fontVariant: ['small-caps'] }}
        />

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
