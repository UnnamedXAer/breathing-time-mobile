/* eslint-disable @typescript-eslint/no-var-requires */
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { fontsMap } from '../helpers/fonts';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        void SplashScreen.preventAutoHideAsync();

        await Font.loadAsync(fontsMap);
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
