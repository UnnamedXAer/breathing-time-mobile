import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Breathing from '../../screens/breathingExercise/BreathingScreen';
import HoldingIn from '../../screens/breathingExercise/HoldingInScreen';
import HoldingOut from '../../screens/breathingExercise/HoldingOutScreen';
import Start from '../../screens/breathingExercise/StartScreen';
import Summary from '../../screens/breathingExercise/SummaryScreen';
import { ExerciseStackParamList } from './types';

const Stack = createNativeStackNavigator<ExerciseStackParamList>();

export function BreathingExerciseStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerBackVisible: false,
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Breathing" component={Breathing} />
      <Stack.Screen name="HoldingOut" component={HoldingOut} />
      <Stack.Screen name="HoldingIn" component={HoldingIn} />
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
}
