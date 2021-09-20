import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Colors from './constants/Colors';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getSavedPreferences } from './store/exercise';
import { getSavedSettings } from './store/settings';
import { AppDispatch } from './store/types';
import AppLoading from 'expo-app-loading';

export default function AppLayout() {
  const isLoadingComplete = useCachedResources();
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void dispatch(getSavedPreferences());
    void dispatch(getSavedSettings());
  }, [dispatch]);

  if (!isLoadingComplete) {
    return <AppLoading autoHideSplash />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={Colors[colorScheme].statusBarStyle} />
      </SafeAreaProvider>
    );
  }
}
