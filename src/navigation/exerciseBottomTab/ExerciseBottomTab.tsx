import * as React from 'react';
import { StatusBar } from 'react-native';
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

const BottomTab = createBottomTabNavigator<ExerciseTabParamList>();

export function BreathingExerciseTabNavigator() {
  const scheme = useColorScheme();
  const marginTop = StatusBar.currentHeight
    ? StatusBar.currentHeight + Layout.spacing()
    : Layout.spacing(5);

  const backgroundColor = Colors[scheme].background;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <LinearGradient
        style={{
          width: Layout.window.width,
          paddingTop: marginTop,
        }}
        colors={[Colors[scheme].primary, Colors[scheme].background]}>
        <Text
          style={{
            fontSize: Layout.spacing(4),
            marginBottom: Layout.spacing(2),
            textAlign: 'center',
            fontFamily: 'zen-tokyo-zoo',
            color: '#fff',
            textShadowColor: 'black',
            textShadowRadius: 1,
            textShadowOffset: {
              height: 1,
              width: 0,
            },
          }}>
          Breathing Exercise
        </Text>
      </LinearGradient>

      <BottomTab.Navigator
        initialRouteName="Start"
        sceneContainerStyle={{
          padding: Layout.spacing(),
          backgroundColor,
        }}
        screenOptions={{
          tabBarStyle: {
            display: 'none',
          },
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
  );
}
