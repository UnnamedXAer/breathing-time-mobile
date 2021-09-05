import * as React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import AppButton from '../../components/ui/Button';
import Counter from '../../components/Counter';

import { Text } from '../../components/ui/Themed';
import useStateAndRef from '../../hooks/useStateAndRef';
import { ExerciseStackScreenProps } from '../../navigation/exerciseStack/types';
import { TimeoutReturn } from '../../types/types';
import { StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';

interface Props extends ExerciseStackScreenProps<'Start'> {}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const countdownTime = 11;
  const [count, setCount] = useState(false);
  const interval = useRef<TimeoutReturn>(void 0);
  const [counter, setCounter, counterRef] = useStateAndRef(countdownTime);

  useEffect(() => {
    if (!count) {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = void 0;
      }
      return;
    }

    if (interval.current) {
      console.log('trying to set interval while already counting');
      return;
    }

    interval.current = setInterval(() => {
      if (counterRef.current <= 0) {
        clearInterval(interval.current as NodeJS.Timer);
        interval.current = void 0;

        navigation.navigate('Breathing');

        return;
      }
      setCounter((v) => v - 1);
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = void 0;
      }
    };
  }, [count, counterRef, navigation, setCounter]);

  const startExercise = () => {
    setCounter((v) => v - 1);
    setCount(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {counter === countdownTime ? (
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
