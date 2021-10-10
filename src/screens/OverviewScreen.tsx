import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem, Pressable } from 'react-native';
import { Text } from '../components/ui/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import Headline from '../components/ui/Headline';
import { Exercise, readResultsOverview } from '../../storage/sqlite';
import { SQLError } from 'expo-sqlite';
import { DatesFromTo } from '../types/types';
import { format } from 'date-fns';
import { getDateOptions } from '../helpers/date';
import DatesFilter from '../components/overview/DatesFilter';
import Alert from '../components/ui/Alert';

const startDatePlaceholder = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
export default function OverviewScreen({ navigation }: RootStackScreenProps<'Overview'>) {
  useTranslationChange();
  const scheme = useColorScheme();

  const [results, setResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<DatesFromTo>({
    from: startDatePlaceholder,
    to: new Date(),
  });

  const getEmptyListText = (noTable?: boolean) => {
    if (noTable) {
      return t('overview.no_results_at_all');
    }
    return t('overview.no_results' + (dates.from || dates.to ? '_for_range' : ''));
  };

  const [emptyListText, setEmptyListText] = useState(getEmptyListText());

  const dateOptions = getDateOptions();

  const getResultsOverview = async () => {
    if (dates.from && dates.to && dates.from > dates.to) {
      return setError(t('overview.incorrect_dates'));
    }

    setLoading(true);
    setError(null);
    try {
      const r = await readResultsOverview(dates);
      setResults(r);
    } catch (err) {
      if ((err as SQLError).message.includes('no such table: exercise')) {
        return setEmptyListText(getEmptyListText(true));
      }
      setError(__DEV__ ? (err as SQLError).message : t('overview.read_results_error'));
    }
    setLoading(false);
  };

  useEffect(() => {
    void getResultsOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

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
        {error && (
          <Alert
            type={'error'}
            content={error || ''}
            hideIcon
            textStyle={{ textAlign: 'auto' }}>
            {error}
          </Alert>
        )}
        <FlatList
          refreshing={loading}
          data={results}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
          contentContainerStyle={{
            flex: results.length === 0 ? 1 : void 0,
          }}
          ListEmptyComponent={
            !error ? <Text style={styles.noResultsText}>{emptyListText}</Text> : null
          }
        />
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
    padding: Layout.spacing(),
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
