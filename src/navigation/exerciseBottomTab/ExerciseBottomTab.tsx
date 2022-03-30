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
import { SoundContext } from './SoundsContext';
import { Audio } from 'expo-av';
import { BreathPace, Sounds } from '../../constants/sounds';

const BottomTab = createBottomTabNavigator<ExerciseTabParamList>();

export function BreathingExerciseTabNavigator() {
  const scheme = useColorScheme();
  const backgroundColor = Colors[scheme].background;
  const exerciseStarted = useSelector((state: RootState) => state.exercise.started);
  const breathTime = useSelector((state: RootState) => state.exercise.breathTime);

  const [breathSound, setBreathSound] = React.useState<{
    sound: Audio.Sound | null;
    pace: BreathPace;
  }>({ sound: null, pace: breathTime });

  React.useEffect(() => {
    if (!exerciseStarted) {
      console.log(
        'effect load sound - skipped',
        exerciseStarted,
        // breathTime,
        // breathSound.sound === null ? 'sound is empty ' : 'sound object',
      );
      return;
    }

    void (async () => {
      console.log('about to create sound');
      try {
        const sound = (await Audio.Sound.createAsync(Sounds[breathTime])).sound;
        console.log('sound created', sound._loaded);
        setBreathSound((pV) => ({ ...pV, sound: sound }));
      } catch (err) {
        __DEV__ && console.log('createSound: ERROR: ' + (err as Error).toString());
      }
    })();
  }, [breathTime, exerciseStarted]);

  //   console.log('sound: ', breathSound.sound !== null);

  React.useEffect(() => {
    if (!exerciseStarted && breathSound.sound !== null) {
      () => {
        console.log('sound cleanup');
        if (breathSound.sound == null) {
          console.log('effect cleanup - skipped');
          return;
        }
        breathSound.sound
          .unloadAsync()
          .then(() => {
            console.log('sound unloaded');
            setBreathSound((pv) => ({ ...pv, sound: null }));
          })
          .catch((err) => {
            __DEV__ && console.log('unloadSound: ' + (err as Error).toString());
          });
      };
    }
  }, [breathSound.sound, exerciseStarted]);

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
    <SoundContext.Provider value={breathSound.sound}>
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
