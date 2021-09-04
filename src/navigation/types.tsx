import {
  EventArg,
  EventListenerCallback,
  EventMapCore,
  NavigatorScreenParams,
  StackNavigationState,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationEventMap } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootTabParamList } from './bottomTab/types';
import { ExerciseStackParamList } from './exerciseStack/types';

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  BreathingExerciseStack: NavigatorScreenParams<ExerciseStackParamList> | undefined;
  BreathingInstruction: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type BeforeRemoveCallback = EventListenerCallback<
  NativeStackNavigationEventMap &
    EventMapCore<StackNavigationState<ExerciseStackParamList>>,
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
