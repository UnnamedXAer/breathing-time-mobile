import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../bottomTab/types';
import { RootStackParamList } from '../types';

export type ExerciseStackParamList = {
  Start: undefined;
  Breathing: undefined;
  HoldingOut: undefined;
  HoldingIn: undefined;
  Summary: undefined;
};

export type ExerciseStackScreenProps<Screen extends keyof ExerciseStackParamList> =
  CompositeScreenProps<
    /**/ CompositeScreenProps<
      NativeStackScreenProps<ExerciseStackParamList, Screen>,
      BottomTabScreenProps<RootTabParamList>
    > /**/,
    NativeStackScreenProps<RootStackParamList>
  >;
