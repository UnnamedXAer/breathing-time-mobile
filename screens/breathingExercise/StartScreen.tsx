import {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
} from '@react-navigation/native';
import { NativeStackNavigationEventMap } from '@react-navigation/native-stack/lib/typescript/src/types';
import * as React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Button, StyleSheet } from 'react-native';
import Counter from '../../components/Counter';

import { Text, View } from '../../components/Themed';
import useStateAndRef from '../../hooks/useStateAndRef';
import {
  ExerciseStackParamList,
  ExerciseStackScreenProps,
} from '../../navigation/exerciseStack/types';
import { TimeoutReturn } from '../../types/types';

interface Props extends ExerciseStackScreenProps<'Start'> {}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  const countdownTime = 12313;
  const [count, setCount] = useState(false);
  const interval = useRef<TimeoutReturn>(void 0);
  const [counter, setCounter, counterRef] = useStateAndRef(countdownTime);

  useEffect(() => {
    if (!count) {
      return;
    }

    const cb: EventListenerCallback<
      NativeStackNavigationEventMap &
        EventMapCore<StackNavigationState<ExerciseStackParamList>>,
      'beforeRemove'
    > = (ev) => {
      if (
        ((ev.data.action.payload as { name: string } | undefined)?.name as string) ===
        'Breathing'
      ) {
        return;
      }

      if (!count) {
        return;
      }

      setCount(false);
      ev.preventDefault();

      Alert.alert('Warning!', 'Cancel Exercise?', [
        {
          text: 'Yes',
          onPress: () => {
            navigation.dispatch(ev.data.action);
          },
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            setCount(true);
          },
        },
      ]);
    };

    navigation.addListener('beforeRemove', cb);

    return () => {
      navigation.removeListener('beforeRemove', cb);
    };
  }, [navigation, count]);

  useEffect(() => {
    if (!count) {
      if (interval.current) {
        clearInterval(interval.current!);
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
        clearInterval(interval.current!);
        interval.current = void 0;

        navigation.replace('Breathing');

        return;
      }
      setCounter((v) => v - 1);
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current!);
        interval.current = void 0;
      }
    };
  }, [count]);

  const startExercise = () => {
    setCounter((v) => v - 1);
    setCount(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise - Start</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {counter === countdownTime ? (
        <View>
          <Button onPress={startExercise} title="START" />
          <Button
            onPress={() => navigation.replace('BreathingInstruction')}
            title="See Instructions"
          />
        </View>
      ) : (
        <Counter text="Get Ready!" value={counter ? counter : 'Go'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default StartScreen;
