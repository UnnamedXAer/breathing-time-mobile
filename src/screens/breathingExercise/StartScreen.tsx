import * as React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import AppButton from '../../components/ui/Button';
import Counter from '../../components/Counter';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { TimeoutReturn } from '../../types/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import Header from '../../components/breathingExercise/Header';
import WarningNote from '../../components/WarningNote';
import { t } from 'i18n-js';
import { useDispatch } from 'react-redux';
import { startExercise as startExerciseAction } from '../../store/exercise';
import { SoundContext } from '../../navigation/exerciseBottomTab/SoundsContext';

const warningTextSize = Layout.spacing(
  Layout.window.height < 600 ? 1.3 : Layout.window.height < 700 ? 1.8 : 2.2,
);

interface Props extends ExerciseTabScreenProps<'Start'> {}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const countdownTime = __DEV__ ? 0 : 3;
  const [count, setCount] = useState(false);
  const timeoutRef = useRef<TimeoutReturn>(void 0);
  const lastTick = useRef(0);
  const [counter, setCounter] = useState(countdownTime);
  const [started, setStarted] = useState(false);
  const startTime = useRef(Date.now());
  const { loadSounds } = React.useContext(SoundContext);

  useEffect(() => {
    if (started && counter <= 0) {
      setCount(false);
      const timeout = setTimeout(() => {
        dispatch(startExerciseAction());
        navigation.jumpTo('Breathing');
      }, 999);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [counter, dispatch, navigation, started]);

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

  const startExercise = async () => {
    setCount(true);
    await loadSounds();
    setStarted(true);
  };

  return (
    <View style={styles.container}>
      <Header title={t('ex.start.title')} />
      <View style={{ flex: 1, justifyContent: started ? 'center' : 'flex-start' }}>
        {!started ? (
          <>
            <ScrollView>
              <WarningNote style={styles.warningNote} textSize={warningTextSize} />
            </ScrollView>

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
  warningNote: {
    marginHorizontal: Layout.spacing(),
  },
  startBtnWrapper: {
    marginVertical: Layout.spacing(),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexBasis: 115,
    flexGrow: 0,
  },
  startBtnContainer: {
    paddingHorizontal: Layout.spacing(2),
    paddingVertical: Layout.spacing(2),
  },
  startBtnText: {
    fontSize: Layout.spacing(Layout.window.height < 600 ? 3.5 : 5),
    fontVariant: ['small-caps'],
  },
  footer: {
    marginBottom: Layout.spacing(),
  },
});

export default StartScreen;
