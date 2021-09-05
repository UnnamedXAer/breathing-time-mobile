/* eslint-disable @typescript-eslint/no-var-requires */
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { FontSource } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { latoFontsMap } from '../helpers/fonts';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        void SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf') as FontSource,
          'zen-tokyo-zoo':
            require('../assets/fonts/ZenTokyoZoo-Regular.ttf') as FontSource,
          ...latoFontsMap,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        void SplashScreen.hideAsync();
      }
    }

    void loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
