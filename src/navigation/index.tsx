import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AboutScreen from '../screens/AboutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootStackScreenProps } from './types';
import LinkingConfiguration from './LinkingConfiguration';
import { BreathingExerciseTabNavigator } from './exerciseBottomTab/ExerciseBottomTab';
import BreathingInstructionScreen from '../screens/BreathingInstructionScreen';
import Colors from '../constants/Colors';
import { ColorSchemeName } from '../hooks/useColorScheme';
import PreferencesScreen from '../screens/PreferencesScreen';
import HomeScreen from '../screens/HomeScreen';
import { Fonts } from '../constants/fonts';
import { Text } from '../components/ui/Themed';
import { Pressable } from 'react-native';
import Layout from '../constants/Layout';
import SimpleLineIcons from '@expo/vector-icons/build/SimpleLineIcons';
// import Constants from 'expo-constants';
import * as Application from 'expo-application';
import OverviewScreen from '../screens/OverviewScreen';
import ExerciseDetails from '../screens/ExerciseDetails';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator colorScheme={colorScheme} />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors[colorScheme].text,
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerTitleStyle: {
          fontFamily: Fonts.Lato,
        },
        contentStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootStackScreenProps<'Home'>) => ({
          // title: Constants.manifest!.name,
          title: Application.applicationName,
          headerTitle: (props) => (
            <Text
              adjustsFontSizeToFit
              {...props}
              style={{
                color: props.tintColor,
                textAlign: 'center',
                fontSize: Layout.spacing(4),
                width: '96.5%',
                paddingRight: 25,
                paddingBottom: 2,
                fontFamily: Fonts.LatoBoldItalic,
                textShadowColor: Colors[colorScheme].textRGBA(0.7),
                textShadowRadius: 6,
                textShadowOffset: {
                  height: 2,
                  width: -1,
                },
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.push('About')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <SimpleLineIcons
                name="info"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="BreathingExerciseBottomTab"
        component={BreathingExerciseTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="BreathingInstruction"
        component={BreathingInstructionScreen}
        options={{ title: '' }}
      />
      <Stack.Screen name="Overview" component={OverviewScreen} options={{ title: '' }} />

      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{ title: '' }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
