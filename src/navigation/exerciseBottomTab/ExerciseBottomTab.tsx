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

const BottomTab = createBottomTabNavigator<ExerciseTabParamList>();

export function BreathingExerciseTabNavigator() {
  const scheme = useColorScheme();
  const backgroundColor = Colors[scheme].background;
  const exerciseStarted = useSelector((state: RootState) => state.exercise.started);

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
        <BottomTab.Screen
          name="Breathing"
          component={Breathing}
          initialParams={{ sound: { XXX: 'My sound!' } }}
        />
        <BottomTab.Screen name="BreathHold" component={BreathHold} />
        <BottomTab.Screen name="Recovery" component={Recovery} />
        <BottomTab.Screen name="Summary" component={Summary} />
      </BottomTab.Navigator>
    </View>
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
