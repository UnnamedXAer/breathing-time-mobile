import * as React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import AppButton from '../../components/ui/Button';
import Counter from '../../components/Counter';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { TimeoutReturn } from '../../types/types';
import { StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import Header from '../../components/breathingExercise/Header';
import WarningNote from '../../components/WarningNote';

interface Props extends ExerciseTabScreenProps<'Start'> {}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const countdownTime = 0;
  const [count, setCount] = useState(false);
  const timeoutRef = useRef<TimeoutReturn>(void 0);
  const lastTick = useRef(0);
  const [counter, setCounter] = useState(countdownTime);
  const [started, setStarted] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (started && counter <= 0) {
      setCount(false);
      const timeout = setTimeout(() => {
        navigation.jumpTo('Breathing');
      }, 999);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [counter, navigation, started]);

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

    lastTick.current = startTime.current = Date.now();
    timeoutRef.current = setTimeout(decrement, tm);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = void 0;
      }
    };
  }, [count]);

  const startExercise = () => {
    setCount(true);
    setStarted(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Let's begin your breathing!" />
      <View style={styles.content}>
        {!started ? (
          <>
            <WarningNote style={styles.warningNote} />
            <View style={styles.startBtnWrapper}>
              <AppButton
                onPress={startExercise}
                title="START"
                size="large"
                mode="contained"
                containerStyle={{ padding: Layout.spacing(2) }}
                textStyle={{ fontSize: Layout.spacing(5), fontVariant: ['small-caps'] }}
              />
            </View>
          </>
        ) : (
          <Counter
            text="Get Ready!"
            value={counter > 0 ? counter : 'Go'}
            fontSize={Layout.window.height * 0.15}
          />
        )}
      </View>
      <View style={styles.footer}>
        {!started && (
          <AppButton
            onPress={() => navigation.replace('BreathingInstruction')}
            size="small"
            mode="outlined"
            title="See Instructions"
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Layout.window.height * 0.04,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  warningNote: {
    marginHorizontal: Layout.spacing(),
  },
  startBtnWrapper: {
    // paddingBottom: Layout.window.height * 0.18,
    marginVertical: Layout.spacing(),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: Layout.spacing(),
  },
});

export default StartScreen;
