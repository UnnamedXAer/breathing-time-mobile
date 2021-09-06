import * as React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import AppButton from '../../components/ui/Button';
import Counter from '../../components/Counter';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';
import { TimeoutReturn } from '../../types/types';
import { StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';

interface Props extends ExerciseStackScreenProps<'Start'> {}

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
        navigation.replace('Breathing');
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
      <View style={styles.content}>
        {!started ? (
          <View style={styles.startBtnWrapper}>
            <AppButton
              onPress={startExercise}
              title="START"
              size="large"
              mode="contained"
              scale={1.6}
            />
          </View>
        ) : (
          <Counter
            text="Get Ready!"
            value={counter > 0 ? counter : 'Go'}
            fontSize={Layout.window.height * 0.15}
          />
        )}
      </View>
      <View style={styles.footer}>
        <AppButton
          onPress={() => navigation.replace('BreathingInstruction')}
          size="small"
          mode="outlined"
          title="See Instructions"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  startBtnWrapper: {
    paddingBottom: Layout.window.height * 0.2,
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    marginBottom: Layout.spacing(),
  },
});

export default StartScreen;