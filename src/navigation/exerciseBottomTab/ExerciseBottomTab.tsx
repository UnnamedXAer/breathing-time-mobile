import * as React from 'react';
import { StatusBar } from 'react-native';
import { Text, View } from '../../components/ui/Themed';
import Layout from '../../constants/Layout';
import Breathing from '../../screens/breathingExercise/BreathingScreen';
import Recovery from '../../screens/breathingExercise/RecoveryScreen';
import BreathHold from '../../screens/breathingExercise/BreathHoldScreen';
import Start from '../../screens/breathingExercise/StartScreen';
import Summary from '../../screens/breathingExercise/SummaryScreen';
import { ExerciseTabParamList as ExerciseTabParamList } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator<ExerciseTabParamList>();

export function BreathingExerciseTabNavigator() {
  const scheme = useColorScheme();
  const marginTop = StatusBar.currentHeight
    ? StatusBar.currentHeight + Layout.spacing()
    : Layout.spacing(5);

  const backgroundColor = Colors[scheme].background;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{
          width: Layout.window.width,
          paddingTop: marginTop,
        }}
        colors={[Colors.primary, Colors[scheme].background]}
        start={{
          x: 0,
          y: 0,
        }}>
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

      <Stack.Navigator
        screenOptions={
          {
            //   contentStyle: {
            //     backgroundColor,
            //     paddingHorizontal: Layout.spacing(),
            //   },
            //   headerShown: false,
            //   headerBackVisible: false,
          }
        }>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Breathing" component={Breathing} />
        <Stack.Screen name="BreathHold" component={BreathHold} />
        <Stack.Screen name="Recovery" component={Recovery} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </View>
  );
}
