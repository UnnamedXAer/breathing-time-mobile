import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { Text, View } from '../../components/ui/Themed';
import Layout from '../../constants/Layout';
import Breathing from '../../screens/breathingExercise/BreathingScreen';
import HoldingIn from '../../screens/breathingExercise/HoldingInScreen';
import HoldingOut from '../../screens/breathingExercise/HoldingOutScreen';
import Start from '../../screens/breathingExercise/StartScreen';
import Summary from '../../screens/breathingExercise/SummaryScreen';
import { ExerciseStackParamList } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Stack = createNativeStackNavigator<ExerciseStackParamList>();

export function BreathingExerciseStackNavigator() {
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
        screenOptions={{
          contentStyle: {
            backgroundColor,
            paddingHorizontal: Layout.spacing(),
          },
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
