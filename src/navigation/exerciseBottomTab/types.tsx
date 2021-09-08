import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../bottomTab/types';
import { RootStackParamList } from '../types';

export type ExerciseTabParamList = {
  Start: undefined;
  Breathing: undefined;
  BreathHold: undefined;
  Recovery: undefined;
  Summary: undefined;
};

export type ExerciseTabScreenProps<Screen extends keyof ExerciseTabParamList> =
  CompositeScreenProps<
    /**/ CompositeScreenProps<
      BottomTabScreenProps<ExerciseTabParamList, Screen>,
      BottomTabScreenProps<RootTabParamList>
    > /**/,
    NativeStackScreenProps<RootStackParamList>
  >;
