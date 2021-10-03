import {
  EventArg,
  EventListenerCallback,
  EventMapCore,
  NavigatorScreenParams,
  StackNavigationState,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationEventMap } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ExerciseTabParamList } from './exerciseBottomTab/types';

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackParamList = {
  About: undefined;
  NotFound: undefined;
  BreathingExerciseBottomTab: NavigatorScreenParams<ExerciseTabParamList> | undefined;
  BreathingInstruction: undefined;
  Preferences: undefined;
  Home: undefined;
  Overview: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type BeforeRemoveCallback = EventListenerCallback<
  NativeStackNavigationEventMap &
    EventMapCore<StackNavigationState<ExerciseTabParamList>>,
  'beforeRemove'
>;

export type BeforeRemoveEvent = EventArg<
  'beforeRemove',
  true,
  {
    action: Readonly<{
      type: string;
      // eslint-disable-next-line @typescript-eslint/ban-types
      payload?: object | undefined;
      source?: string | undefined;
      target?: string | undefined;
    }>;
  }
>;
