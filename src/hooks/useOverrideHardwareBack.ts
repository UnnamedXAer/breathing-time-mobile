import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { RootStackParamList, RootStackScreenProps } from '../navigation/types';

export function useOverrideHardwareBack(
  navigation: RootStackScreenProps<keyof RootStackParamList>['navigation'],
) {
  useFocusEffect(
    useCallback(() => {
      const backPressHandler = () => {
        navigation.navigate('Root', { screen: 'Home' });
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backPressHandler);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
      };
    }, [navigation]),
  );
}
