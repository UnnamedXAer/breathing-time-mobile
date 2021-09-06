import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Footer from '../../components/breathingExercise/Footer';
import Counter from '../../components/Counter';
import AppButton from '../../components/ui/Button';
import { Text } from '../../components/ui/Themed';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';

let lastPressedAt = 0;

export default function HoldingOutScreen({
  navigation,
}: ExerciseStackScreenProps<'HoldingOut'>) {
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const startIntervalTime = useRef(-1);
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);

  const completeScreen = useCallback(() => {
    setNextStep(true);
    __devCheckActualGoldOutTime(startIntervalTime.current, counter);
    startIntervalTime.current = -1;
    navigation.navigate('HoldingIn');
  }, [counter, navigation]);

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
        <Text></Text>
        <Text style={styles.title}>Holding Out</Text>
        <Text style={styles.title}>
          - the stop breathing phase until strong urge to breath.
        </Text>

        <Counter value={counter} />
        <AppButton
          onPress={completeScreen}
          title="NEXT PHASE"
          size="large"
          mode="contained"
        />

        <Footer text="To go to the recovery phase press the button or tap twice on the screen."></Footer>
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

function __devCheckActualGoldOutTime(startIntervalTime: number, counter: number) {
  if (__DEV__) {
    const realTime = (Date.now() - startIntervalTime) / 1000;
    const counterTime = (counter + 1) * 1000;

    console.log('(->', realTime, '|', counterTime, '|', counter);
    if (realTime - counterTime >= 1) {
      const msg = `
	  		>> Holding In
			Actual screen time is greater than counter time for more than 1s.
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
