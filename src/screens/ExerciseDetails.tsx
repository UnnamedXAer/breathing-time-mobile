import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import { Text } from '../components/ui/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import Headline from '../components/ui/Headline';
import {
  ExerciseWithRounds,
  getExerciseDetails,
  removeRound,
  Round,
} from '../../storage/sqlite';
import { SQLError } from 'expo-sqlite';
import ExerciseResultsTable from '../components/breathingExercise/ExerciseResultsTable';
import { shareExerciseResults } from '../helpers/share';
import Button from '../components/ui/Button';

export default function ExerciseDetails({
  navigation,
  route,
}: RootStackScreenProps<'ExerciseDetails'>) {
  useTranslationChange();
  const scheme = useColorScheme();
  const [exercise, setExercise] = useState<ExerciseWithRounds | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getExercise = async () => {
    setLoading(true);
    setError(null);
    try {
      const exercise = await getExerciseDetails(route.params.id);
      setExercise(exercise);
    } catch (err) {
      setError((err as SQLError).message);
    }
    setLoading(false);
  };

  useEffect(() => {
    void getExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roundPressHandler = (idx: number) => {
    let message = t('details.delete_question', [exercise!.rounds[idx].time]);

    if (exercise!.rounds.length <= 1) {
      message += t('details.delete_question_includes_exercise');
    }

    Alert.alert(
      'Delete',
      message,
      [
        {
          text: t('details.delete_confirm'),
          onPress: () => deleteRound(exercise!.rounds[idx].id),
        },
        {
          text: t('common.cancel'),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const deleteRound = async (id: Round['id']) => {
    try {
      await removeRound(id);
      const exerciseRemoved = exercise!.rounds.length <= 1;
      ToastAndroid.show(
        t('details.delete_success' + (exerciseRemoved ? '_with_exercise' : '')),
        ToastAndroid.SHORT,
      );
      if (exerciseRemoved) {
        navigation.goBack();
        return;
      }

      setExercise((prevState) => {
        if (prevState === null) {
          return null;
        }
        return {
          ...prevState,
          rounds: [...prevState.rounds.filter((r) => r.id !== id)],
        };
      });
    } catch (err) {
      ToastAndroid.show(t('details.delete_failure'), ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1">{t('details.title')}</Headline>
        {exercise ? (
          <View>
            <ExerciseResultsTable
              exercise={{
                date: exercise.date,
                rounds: exercise.rounds.map((r) => r.time),
              }}
              share={() =>
                shareExerciseResults(
                  exercise.date,
                  exercise.rounds.map((r) => r.id, Colors[scheme].primary),
                )
              }
              onRowPress={roundPressHandler}
              disabled={false}
            />
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: Colors.colors.error }}>
            {t('details.read_exercise_error')}
          </Text>
        ) : (
          <Text>{t('details.exercise_not_found')}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: Layout.spacing(Layout.window.height > 600 ? 3 : 1),
    alignItems: 'center',
  },
  container: {
    padding: Layout.spacing(2),
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
  },
  beImg: { padding: Layout.spacing(2) },
  beLabel: { fontWeight: 'bold' },
});
