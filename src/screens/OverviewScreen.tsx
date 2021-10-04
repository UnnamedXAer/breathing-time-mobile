import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Alert,
} from 'react-native';
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

export default function OverviewScreen({ navigation }: RootStackScreenProps<'Overview'>) {
  useTranslationChange();
  const scheme = useColorScheme();

  const [results, setResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResultsOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await readResultsOverview();
      setResults(r);
    } catch (err) {
      setError((err as SQLError).message);
    }
    setLoading(false);
  };

  useEffect(() => {
    void getResultsOverview();
  }, []);

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

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1">Results Overview</Headline>
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
