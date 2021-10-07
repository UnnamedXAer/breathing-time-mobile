import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  Platform,
} from 'react-native';
import { Text } from '../components/ui/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';
import I18n, { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import Headline from '../components/ui/Headline';
import { Exercise, readResultsOverview } from '../../storage/sqlite';
import { SQLError } from 'expo-sqlite';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import { DatesFromTo } from '../types/types';
import AppButton from '../components/ui/Button';
import { format } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';

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
  const [selectedDateInput, setSelectedDateInput] = useState<'from' | 'to'>('from');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateOptions = {
    locale: I18n.locale === 'pl' ? pl : enUS,
  };

  const color = Colors[scheme].text;

  const getResultsOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await readResultsOverview(dates);
      setResults(r);
    } catch (err) {
      setError((err as SQLError).message);
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
          {format(item.date, 'eeee, do MMMM, p', dateOptions)}
        </Text>
        <Text style={{ fontSize: Layout.spacing(2) }}>
          Rounds: {item.roundsCnt} | Average: {item.averageTime}s
        </Text>
      </Pressable>
    );
  };

  const dateChangeHandler = (ev: Event | AndroidEvent, selectedDate?: Date) => {
    const currentDate =
      ev.type === 'neutralButtonPressed'
        ? null
        : selectedDate || dates[selectedDateInput];

    setShowDatePicker(Platform.OS === 'ios');
    setDates((pv) => ({ ...pv, [selectedDateInput]: currentDate }));
  };

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1">Results Overview</Headline>
        {showDatePicker && (
          <DateTimePicker
            value={dates[selectedDateInput] || new Date()}
            onChange={dateChangeHandler}
            mode="date"
            display="calendar"
            maximumDate={new Date()}
            neutralButtonLabel={t('common.clear')}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            maxWidth: 400,
            width: '100%',
            alignSelf: 'center',
            padding: Layout.spacing(1),
          }}>
          <AppButton
            onPress={() => {
              setSelectedDateInput('from');
              setShowDatePicker(true);
            }}
            size="small"
            color={dates.from ? color : Colors[scheme].textRGBA(0.6)}
            title={
              dates.from
                ? format(dates.from, 'P', dateOptions)
                : t('overview.start_date_placeholder')
            }
            containerStyle={styles.dateBtnContainer}
          />
          <AppButton
            onPress={() => {
              setSelectedDateInput('to');
              setShowDatePicker(true);
            }}
            size="small"
            color={dates.to ? color : Colors[scheme].textRGBA(0.6)}
            title={
              dates.to
                ? format(dates.to, 'P', dateOptions)
                : t('overview.end_date_placeholder')
            }
            containerStyle={styles.dateBtnContainer}
          />
        </View>
        <FlatList
          refreshing={loading}
          data={results}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
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
  beImg: {
    padding: Layout.spacing(2),
  },
  beLabel: {
    fontWeight: 'bold',
  },
  dateBtnContainer: {
    width: 120,
    height: 38,
  },
});
