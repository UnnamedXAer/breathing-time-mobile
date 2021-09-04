import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { View } from '../../components/ui/Themed';
import Layout from '../../constants/Layout';
import Breathing from '../../screens/breathingExercise/BreathingScreen';
import HoldingIn from '../../screens/breathingExercise/HoldingInScreen';
import HoldingOut from '../../screens/breathingExercise/HoldingOutScreen';
import Start from '../../screens/breathingExercise/StartScreen';
import Summary from '../../screens/breathingExercise/SummaryScreen';
import { ExerciseStackParamList } from './types';

const Stack = createNativeStackNavigator<ExerciseStackParamList>();

export function BreathingExerciseStackNavigator() {
  const marginTop = StatusBar.currentHeight
    ? StatusBar.currentHeight + Layout.spacing()
    : Layout.spacing(5);
  return (
    <View style={{ flex: 1, marginTop }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
        }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Breathing" component={Breathing} />
        <Stack.Screen name="HoldingOut" component={HoldingOut} />
        <Stack.Screen name="HoldingIn" component={HoldingIn} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </View>
  );
}
