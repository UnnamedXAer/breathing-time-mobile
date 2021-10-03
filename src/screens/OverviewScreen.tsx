import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ListRenderItem } from 'react-native';
import { Text } from '../components/ui/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import Headline from '../components/ui/Headline';
import { Exercise, readResults } from '../../storage/sqlite';
import { SQLError } from 'expo-sqlite';

export default function OverviewScreen({ navigation }: RootStackScreenProps<'Home'>) {
  useTranslationChange();
  const scheme = useColorScheme();

  const [results, setResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResultsOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await readResults();
      console.log(JSON.stringify(r, null, 2));
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
      <View>
        <Text>
          ID: {item.id} | Date: {item.exerciseDate.toLocaleString()} | Rounds:{' '}
          {item.rounds.length}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.scroll, styles.scrollContent]}>
      <View style={styles.container}>
        <Headline variant="h1">Results Overview</Headline>
        <FlatList refreshing={loading} data={results} renderItem={renderItem} />
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
