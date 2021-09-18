import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  BeforeRemoveEvent,
  RootStackScreenProps,
  RootStackParamList,
} from '../navigation/types';
import { cleanExercise } from '../store/exercise';

export default function useAskBeforeLeave(
  focused: boolean,
  navigation: RootStackScreenProps<keyof RootStackParamList>['navigation'],
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!focused) {
      return;
    }

    const callback = (ev: BeforeRemoveEvent) => {
      ev.preventDefault();

      Alert.alert(
        'Warning!',
        'Cancel Exercise?',
        [
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
              dispatch(cleanExercise());
              navigation.dispatch(ev.data.action);
            },
          },
          {
            text: 'No',
            style: 'cancel',
            onPress: () => {},
          },
        ],
        {
          cancelable: true,
        },
      );
    };

    navigation.addListener('beforeRemove', callback);

    return () => {
      navigation.removeListener('beforeRemove', callback);
    };
  }, [dispatch, focused, navigation]);

  return void 0;
}
