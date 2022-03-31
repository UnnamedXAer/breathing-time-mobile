import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Text, View } from '../../components/ui/Themed';
import Layout from '../../constants/Layout';
import Breathing from '../../screens/breathingExercise/BreathingScreen';
import Recovery from '../../screens/breathingExercise/RecoveryScreen';
import BreathHold from '../../screens/breathingExercise/BreathHoldScreen';
import Start from '../../screens/breathingExercise/StartScreen';
import Summary from '../../screens/breathingExercise/SummaryScreen';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExerciseTabParamList } from './types';
import { t } from 'i18n-js';
import { Fonts } from '../../constants/fonts';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { SoundContext, SoundsContextState } from './SoundsContext';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { SoundName, Sounds } from '../../constants/sounds';

const BottomTab = createBottomTabNavigator<ExerciseTabParamList>();

export function BreathingExerciseTabNavigator() {
  const scheme = useColorScheme();
  const backgroundColor = Colors[scheme].background;
  const exerciseStarted = useSelector((state: RootState) => state.exercise.started);
  const breathTime = useSelector((state: RootState) => state.exercise.breathTime);

  const [breathSounds, setBreathSounds] = React.useState<SoundsContextState>({
    sounds: { breathing: null, breathIn: null, breathOut: null },
  });

  __DEV__ && console.log('started: ', exerciseStarted);

  React.useEffect(() => {
    if (!exerciseStarted) {
      __DEV__ && console.log('effect create sounds - skipped', exerciseStarted);
      return;
    }

    void (async () => {
      __DEV__ && console.log('about to create sounds');
      try {
        const now_b = Date.now();
        // let sounds: [
        //   {
        //     sound: Audio.Sound;
        //     status: AVPlaybackStatus;
        //   },
        //   {
        //     sound: Audio.Sound;
        //     status: AVPlaybackStatus;
        //   },
        //   {
        //     sound: Audio.Sound;
        //     status: AVPlaybackStatus;
        //   },
        // ];
        // if (__DEV__ && false) {
        //   sounds = await Promise.all([
        //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
        //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
        //     Audio.Sound.createAsync(Sounds[SoundName.DebugBreathSound]),
        //   ]);
        // } else {
        //   sounds = await Promise.all([
        //     Audio.Sound.createAsync(Sounds[breathTime]),
        //     Audio.Sound.createAsync(Sounds[SoundName.breathIn]),
        //     Audio.Sound.createAsync(Sounds[SoundName.breathOut]),
        //   ]);
        // }

        const sounds = await Promise.all([
          Audio.Sound.createAsync(Sounds[breathTime]),
          Audio.Sound.createAsync(Sounds[SoundName.breathIn]),
          Audio.Sound.createAsync(Sounds[SoundName.breathOut]),
        ]);

        __DEV__ && console.log(`sounds created in ${Date.now() - now_b}ms.`);

        __DEV__ &&
          console.log(
            'sounds created, is there any sound?',
            breathSounds.sounds.breathing !== null,
            breathSounds.sounds.breathIn !== null,
            breathSounds.sounds.breathOut !== null,
          );
        setBreathSounds({
          sounds: {
            breathing: sounds[0].status.isLoaded ? sounds[0].sound : null,
            breathIn: sounds[1].status.isLoaded ? sounds[1].sound : null,
            breathOut: sounds[2].status.isLoaded ? sounds[2].sound : null,
          },
        });
      } catch (err) {
        __DEV__ && console.log('createSound: ERROR: ' + (err as Error).toString());
      }
    })();
  }, [breathSounds.sounds, breathTime, exerciseStarted]);

  //   console.log('sound: ', breathSound.sound !== null);

  React.useEffect(() => {
    if (!exerciseStarted) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      __DEV__ && console.log('sounds CLEANUP', Promise.allSettled);
      Promise.all([
        breathSounds.sounds.breathing?.unloadAsync(),
        breathSounds.sounds.breathIn?.unloadAsync(),
        breathSounds.sounds.breathOut?.unloadAsync(),
      ])
        .then(() => {
          __DEV__ && console.log('sounds unloaded');
          //   setBreathSounds((pv) => ({
          //     ...pv,
          //     sounds: {
          //       breathIn: null,
          //       breathOut: null,
          //       breathing: null,
          //     },
          //   }));
        })
        .catch((err) => {
          __DEV__ && console.log('unloadSounds: ' + (err as Error).toString());
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseStarted]); // skipped breathSounds.sounds

  React.useEffect(() => {
    if (!exerciseStarted) {
      return;
    }
    activateKeepAwake();
    return () => {
      deactivateKeepAwake();
    };
  }, [exerciseStarted]);

  return (
    <SoundContext.Provider value={breathSounds}>
      <View style={{ flex: 1, backgroundColor }}>
        <LinearGradient
          style={styles.gradient}
          colors={[Colors[scheme].primary, backgroundColor]}>
          <Text style={styles.customTitleText} numberOfLines={1} adjustsFontSizeToFit>
            {t('ex.title')}
          </Text>
        </LinearGradient>

        <BottomTab.Navigator
          initialRouteName="Start"
          sceneContainerStyle={{
            padding: Layout.spacing(),
            backgroundColor,
          }}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            unmountOnBlur: true,
            headerShown: false,
          }}>
          <BottomTab.Screen name="Start" component={Start} />
          <BottomTab.Screen name="Breathing" component={Breathing} />
          <BottomTab.Screen name="BreathHold" component={BreathHold} />
          <BottomTab.Screen name="Recovery" component={Recovery} />
          <BottomTab.Screen name="Summary" component={Summary} />
        </BottomTab.Navigator>
      </View>
    </SoundContext.Provider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: Layout.window.width,
    paddingTop: StatusBar.currentHeight
      ? StatusBar.currentHeight + Layout.spacing()
      : Layout.spacing(5),
  },
  customTitleText: {
    fontSize: Layout.spacing(4),
    marginBottom: Layout.window.height > 600 ? Layout.spacing() : 0,
    paddingBottom: Layout.spacing(),
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.LatoBoldItalic,
    textShadowColor: 'black',
    textShadowRadius: 10,
    textShadowOffset: {
      height: 3,
      width: -1,
    },
  },
  tabBar: {
    display: 'none',
  },
});
