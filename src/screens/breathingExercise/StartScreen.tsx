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
import { t } from 'i18n-js';

interface Props extends ExerciseTabScreenProps<'Start'> {}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const countdownTime = __DEV__ ? 0 : 3;
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
      <Header title={t('ex.start.title')} />
      <View style={styles.content}>
        {!started ? (
          <>
            <WarningNote
              style={styles.warningNote}
              textSize={Layout.spacing(Layout.window.height < 700 ? 1.8 : 2.2)}
            />
            <View style={styles.startBtnWrapper}>
              <AppButton
                onPress={startExercise}
                title={t('ex.start.start')}
                size="large"
                mode="contained"
                containerStyle={styles.startBtnContainer}
                textStyle={styles.startBtnText}
              />
            </View>
          </>
        ) : (
          <Counter
            text={t('ex.start.get_ready')}
            value={counter > 0 ? counter : t('ex.start.go')}
            fontSize={Layout.window.height * (t('ex.start.go').length < 5 ? 0.15 : 0.07)}
          />
        )}
      </View>
      <View style={styles.footer}>
        {!started && (
          <>
            <AppButton
              onPress={() => navigation.goBack()}
              mode="outlined"
              title={t('common.back')}
            />
            <AppButton
              onPress={() => navigation.replace('BreathingInstruction')}
              size="small"
              mode="outlined"
              title={t('ex.start.see_instructions')}
            />
          </>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  warningNote: {
    marginHorizontal: Layout.spacing(),
  },
  startBtnWrapper: {
    marginVertical: Layout.spacing(),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnContainer: {
    padding: Layout.spacing(2),
  },
  startBtnText: {
    fontSize: Layout.spacing(5),
    fontVariant: ['small-caps'],
  },
  footer: {
    marginBottom: Layout.spacing(),
  },
});

export default StartScreen;
