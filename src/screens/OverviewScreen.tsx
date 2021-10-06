import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Alert,
  Pressable,
  Platform,
  StyleProp,
  TextStyle,
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
import { TextInput } from 'react-native-gesture-handler';
import { DatesFromTo } from '../types/types';

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

  const dateInputStyle: TextStyle = {
    backgroundColor: Colors[scheme].background,
    color: Colors[scheme].text,
    borderColor: Colors[scheme].accent,
    borderWidth: 3,
    width: 150,
    textAlign: 'center',
  };

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
  }, [dates]);

  const renderItem: ListRenderItem<Exercise> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.id);
          navigation.navigate('ExerciseDetails', {
            id: item.id,
          });
        }}>
        <Text style={{ fontSize: Layout.spacing(2), paddingVertical: Layout.spacing(1) }}>
          ID: {item.id} | Date: {item.date.toLocaleString()} | Rounds: {item.roundsCnt}
        </Text>
      </TouchableOpacity>
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
            width: '100%',
            padding: Layout.spacing(1),
          }}>
          <Pressable
            onPress={() => {
              setSelectedDateInput('from');
              setShowDatePicker(true);
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.1 : 1 })}>
            <TextInput
              editable={false}
              placeholder={t('overview.start_date_placeholder')}
              value={
                dates.from ? I18n.toTime('date.formats.long_date', dates.from) : void 0
              }
              style={dateInputStyle}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedDateInput('to');
              setShowDatePicker(true);
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.1 : 1 })}>
            <TextInput
              editable={false}
              placeholder={t('overview.end_date_placeholder')}
              value={dates.to ? I18n.toTime('date.formats.long_date', dates.to) : void 0}
              style={dateInputStyle}
            />
          </Pressable>
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
