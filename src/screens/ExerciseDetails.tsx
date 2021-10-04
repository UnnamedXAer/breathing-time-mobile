import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
  readExerciseResults,
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

  const getResultsOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const exercise = await readExerciseResults(route.params.id);
      setExercise(exercise);
    } catch (err) {
      setError((err as SQLError).message);
    }
    setLoading(false);
  };

  useEffect(() => {
    void getResultsOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roundPressHandler = (idx: number) => {
    Alert.alert(
      'Delete',
      'Do you really want to delete this round? It is irreversible.',
      [
        {
          text: 'Yes, delete',
          onPress: () => deleteRound(exercise!.rounds[idx].id),
        },
        {
          text: 'Cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const deleteRound = async (id: Round['id']) => {
    console.log('id', id);
    try {
      const r = await removeRound(id);
      console.log(
        'deleted rounds (',
        r,
        '). id: ',
        id,
        ', time:',
        exercise?.rounds.find((r) => r.id === id)?.time,
      );
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
      setError((err as SQLError).message);
    }
  };

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1">Session Results</Headline>
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
              selectedRounds={[]}
              disabled={false}
            />
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: Colors.colors.error }}>{error}</Text>
        ) : (
          <Text>Couldn&apos;t find that exercise.</Text>
        )}
      </View>
      <Button onPress={getResultsOverview} mode="text" title="refresh" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: Layout.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
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
