import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem, Pressable } from 'react-native';
import { Text } from '../components/ui/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import Headline from '../components/ui/Headline';
import { Exercise, getExercisesList } from '../../storage/sqlite';
import { SQLError } from 'expo-sqlite';
import { DatesFromTo } from '../types/types';
import { format } from 'date-fns';
import { getDateOptions } from '../helpers/date';
import DatesFilter from '../components/overview/DatesFilter';
import Alert from '../components/ui/Alert';
import Statistics from '../components/overview/Statistics';
import { useFocusEffect } from '@react-navigation/core';

const startDatePlaceholder = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
export default function OverviewScreen({ navigation }: RootStackScreenProps<'Overview'>) {
  useTranslationChange();
  const scheme = useColorScheme();

  const [results, setResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [exercisesListError, setExercisesListError] = useState<string | null>(null);
  const [refreshStats, setRefreshStats] = useState(false);

  const [dates, setDates] = useState<DatesFromTo>({
    from: startDatePlaceholder,
    to: new Date(),
  });

  const dateOptions = getDateOptions();

  const getExercises = async (currentDates: DatesFromTo) => {
    if (currentDates.from && currentDates.to && currentDates.from > currentDates.to) {
      return setExercisesListError(t('overview.incorrect_dates'));
    }

    setLoading(true);
    setExercisesListError(null);
    try {
      const r = await getExercisesList(currentDates);

      setResults(r);
    } catch (err) {
      if ((err as SQLError).message.includes('no such table: exercise')) {
        return setResults([]);
      }
      setExercisesListError(
        __DEV__ ? (err as SQLError).message : t('overview.read_results_error'),
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getExercises(dates);
      setRefreshStats((pv) => !pv);
    }, [dates]),
  );

  const renderItem: ListRenderItem<Exercise> = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('ExerciseDetails', {
            id: item.id,
          });
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          backgroundColor: index % 2 ? Colors[scheme].textRGBA(0.06) : void 0,
          paddingHorizontal: Layout.spacing(2),
          paddingVertical: Layout.spacing(Layout.window.height > 700 ? 2 : 1.5),
          alignItems: 'center',
        })}>
        <Text style={{ fontSize: Layout.spacing(2), marginBottom: Layout.spacing(1) }}>
          {format(item.date, 'eeee, do MMMM yyyy, p', dateOptions)}
        </Text>
        <Text style={{ fontSize: Layout.spacing(2) }}>
          {t('overview.session_rounds_count', [item.roundsCnt])} |{' '}
          {t('overview.session_avr_time', [item.averageTime])}
        </Text>
      </Pressable>
    );
  };

  const dateChangeHandler = (updatesDates: DatesFromTo) => {
    setDates(updatesDates);
  };

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1" style={styles.titleText}>
          {t('overview.title')}
        </Headline>
        <DatesFilter dates={dates} onDateChange={dateChangeHandler} scheme={scheme} />
        {exercisesListError && (
          <Alert
            type={'error'}
            content={exercisesListError}
            hideIcon
            textStyle={{ textAlign: 'auto' }}>
            {exercisesListError}
          </Alert>
        )}
        <FlatList
          refreshing={loading}
          data={results}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
          contentContainerStyle={{
            flex: results.length === 0 ? 1 : void 0,
            paddingBottom: Layout.spacing(3),
          }}
          ListEmptyComponent={
            !exercisesListError ? (
              <Text style={styles.noResultsText}>
                {t('overview.no_results' + (dates.from || dates.to ? '_for_range' : ''))}
              </Text>
            ) : null
          }
        />
        <Statistics dates={dates} refresh={refreshStats} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: Layout.spacing(1),
  },
  container: {
    paddingTop: Layout.spacing(),
    paddingHorizontal: Layout.spacing(),
    flex: 1,
  },
  titleText: { textAlign: 'center' },
  noResultsText: {
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
    fontSize: Layout.spacing(2),
    opacity: 0.7,
  },
  errorText: {
    color: Colors.colors.error,
    textAlign: 'center',
    fontSize: Layout.spacing(2),
    borderWidth: 1,
    borderColor: Colors.colors.error,
    paddingVertical: Layout.spacing(2),
    paddingHorizontal: Layout.spacing(1),
  },
});
