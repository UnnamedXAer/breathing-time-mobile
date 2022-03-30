import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export type ExerciseTabParamList = {
  Start: undefined;
  Breathing: { sound: { XXX: string } };
  BreathHold: undefined;
  Recovery: undefined;
  Summary: undefined;
};

export type ExerciseTabScreenProps<Screen extends keyof ExerciseTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ExerciseTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
