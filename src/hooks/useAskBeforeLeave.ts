import { useEffect } from 'react';
import { Alert } from 'react-native';
import {
  BeforeRemoveEvent,
  RootStackScreenProps,
  RootStackParamList,
} from '../navigation/types';

export default function useAskBeforeLeave(
  focused: boolean,
  navigation: RootStackScreenProps<keyof RootStackParamList>['navigation'],
) {
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
  }, [focused, navigation]);

  return void 0;
}
