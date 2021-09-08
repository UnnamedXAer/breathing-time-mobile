import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from './types';
import LinkingConfiguration from './LinkingConfiguration';
import { RootBottomTabNavigator } from './bottomTab/BottomTab';
import { BreathingExerciseTabNavigator } from './exerciseBottomTab/ExerciseBottomTab';
import BreathingInstructionScreen from '../screens/BreathingInstructionScreen';
import Colors from '../constants/Colors';
import { ColorSchemeName } from '../hooks/useColorScheme';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator colorScheme={colorScheme} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}>
      <Stack.Screen
        name="Root"
        component={RootBottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BreathingExerciseBottomTab"
        component={BreathingExerciseTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BreathingInstruction"
        component={BreathingInstructionScreen}
        options={{ title: 'Instructions' }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
