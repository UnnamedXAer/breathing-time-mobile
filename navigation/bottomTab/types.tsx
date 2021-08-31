import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExerciseStackParamList } from '../exerciseStack/types';
import { RootStackParamList } from '../types';

export type RootTabParamList = {
  Home: undefined;
  BreathingExerciseStack: NavigatorScreenParams<ExerciseStackParamList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
