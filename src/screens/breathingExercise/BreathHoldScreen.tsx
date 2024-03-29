import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Vibration,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/breathingExercise/Footer';
import Header from '../../components/breathingExercise/Header';
import StartTip from '../../components/breathingExercise/StartTip';
import Counter from '../../components/Counter';
import Alert from '../../components/ui/Alert';
import AppButton from '../../components/ui/Button';
import Layout from '../../constants/Layout';
import { BreathPace } from '../../constants/breathing';
import setIntervalWithTimeout from '../../helpers/setInterval';
import useAskBeforeLeave from '../../hooks/useAskBeforeLeave';
import useCounterStarted from '../../hooks/useCounterStarted';
import { useOverrideHardwareBack } from '../../hooks/useOverrideHardwareBack';
import { SoundContext } from '../../navigation/exerciseBottomTab/SoundsContext';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { addHoldTime } from '../../store/exercise';
import { playSound, stopSound } from '../../helpers/sounds';
import { RootState } from '../../store/types';

let lastPressedAt = 0;

function calculateCounter(screenStartTime: number): number {
  const screenTimeMs = Date.now() - screenStartTime;
  const newCounter = Math.floor(screenTimeMs / 1000);
  return newCounter;
}

export default function BreathHoldScreen({
  navigation,
}: ExerciseTabScreenProps<'BreathHold'>) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [started, setStarted] = useCounterStarted(BreathPace.normal);
  const [counter, setCounter] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const { disableBreathing, disableStartTips } = useSelector(
    (state: RootState) => state.exercise,
  );
  const startIntervalTime = useRef(-1);
  const soundTimeout = useRef<NodeJS.Timeout | null>(null);
  const focused = useIsFocused();
  useAskBeforeLeave(focused, navigation as any);
  useOverrideHardwareBack(navigation as any);
  const { sounds } = useContext(SoundContext);

  const pushHoldTime = () => {
    const endTime = Date.now();
    const holdTime = (endTime - startIntervalTime.current) / 1000;
    dispatch(addHoldTime(holdTime));
    // __devCheckActualTime(counter, startIntervalTime.current, endTime);
    startIntervalTime.current = -1;
  };

  const completeScreen = useCallback(() => {
    setNextStep(true);
    pushHoldTime();
    navigation.jumpTo('Recovery');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const appStateChangeHandler = (appState: AppStateStatus) => {
    if (appState === 'active' && startIntervalTime.current > 0) {
      setCounter(calculateCounter(startIntervalTime.current));
    }
  };

  useEffect(() => {
    const sub = AppState.addEventListener('change', appStateChangeHandler);
    return () => {
      sub.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (disableBreathing || disableStartTips) {
      return;
    }
    let playing = false;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    soundTimeout.current = setTimeout(async () => {
      soundTimeout.current = null;
      playing = true;
      await playSound(sounds.breathInOut);
      playing = false;
    }, 550);

    return () => {
      if (playing) {
        void stopSound(sounds.breathInOut);
      }
    };
  }, [disableBreathing, disableStartTips, sounds.breathInOut]);

  useEffect(() => {
    if (!focused) {
      startIntervalTime.current = -1;
      setCounter(0);
      setNextStep(false);
    }
  }, [focused]);

  useEffect(() => {
    if (counter === 600) {
      setShowAlert(true);
      Vibration.vibrate(Platform.OS === 'ios' ? [0, 400, 200, 400] : [0, 200, 200, 200]);
    }
  }, [counter]);

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
      if (soundTimeout.current) {
        clearTimeout(soundTimeout.current);
        soundTimeout.current = null;
      }
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
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.pressable} onPress={screenPressHandler}>
        <Header
          title={t('ex.hold.title')}
          roundInfo={!started || showAlert ? void 0 : t('ex.hold.round_info')}
        />
        {!started ? (
          <StartTip text={t('ex.hold.start_tip')} />
        ) : (
          <>
            {showAlert && (
              <Alert
                title={t('ex.hold.warning_title')}
                content={t('ex.hold.warning_text')}
                onPress={() => {
                  setShowAlert(false);
                }}
              />
            )}
            <Counter value={counter} />
            <AppButton
              onPress={completeScreen}
              title={t('ex.hold.next_phase')}
              size="large"
              mode="contained"
              containerStyle={styles.btnContainer}
              textStyle={styles.btnText}
              allowFontScaling={false}
            />

            <Footer
              text={t('ex.hold.skip_to_next')}
              navigation={navigation}
              onLeaveConfirm={pushHoldTime}></Footer>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    padding: Layout.spacing(2),
  },
  btnText: {
    fontSize: Layout.spacing(Layout.window.height < 600 ? 4 : 5),
    fontVariant: ['small-caps'],
  },
});

function __devCheckActualTime(counter: number, startTime: number, endTime: number) {
  if (__DEV__) {
    const realTime = (endTime - startTime) / 1000;

    console.log('Breath Hold (->', realTime, '|', counter);
    if (realTime - counter >= 1) {
      const msg = `
			  Actual screen time is greater than counter time for more than 1s.
			  startTime: ${startTime}
			  endTime: ${endTime}
			  counter: ${counter};
			  realTime: ${realTime};
			  difference: ${realTime - counter};
			  ---------------------------------------`;
      console.warn(msg);
    }
  }
}
