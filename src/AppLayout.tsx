import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { View } from './components/ui/Themed';
import Colors from './constants/Colors';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getSavedPreferences } from './store/exercise';
import { getSavedSettings } from './store/settings';
import { AppDispatch } from './store/types';

export default function AppLayout() {
  const isLoadingComplete = useCachedResources();
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void dispatch(getSavedPreferences());
    void dispatch(getSavedSettings());
  }, [dispatch]);

  if (!isLoadingComplete) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          size={'large'}
          style={{
            opacity: 0.7,
            transform: [{ scale: 1.5 }],
            marginBottom: 30,
          }}
          color={Colors[colorScheme].primary}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={Colors[colorScheme].statusBarStyle} />
      </SafeAreaProvider>
    );
  }
}
