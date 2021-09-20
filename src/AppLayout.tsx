import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Colors from './constants/Colors';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getSavedPreferences } from './store/exercise';
import { AppDispatch } from './store/types';

export default function AppLayout() {
  const isLoadingComplete = useCachedResources();
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void dispatch(getSavedPreferences());
  }, [dispatch]);

  if (!isLoadingComplete) {
    return null; // <ActivityIndicator color={Colors.primary} />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={Colors[colorScheme].statusBarStyle} />
      </SafeAreaProvider>
    );
  }
}
