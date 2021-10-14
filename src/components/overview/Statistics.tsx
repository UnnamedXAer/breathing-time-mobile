import { Entypo } from '@expo/vector-icons';
import { SQLError } from 'expo-sqlite';
import { t } from 'i18n-js';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { getOverviewStatistics, OverviewStatistics } from '../../../storage/sqlite';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { DatesFromTo } from '../../types/types';
import Alert from '../ui/Alert';
import { Text } from '../ui/Themed';
import StatisticsTable from './StatisticsTable';

interface Props {
  dates: DatesFromTo;
  refresh: boolean;
}

export default function Statistics({ dates, refresh }: Props) {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [statistics, setStatistics] = useState<OverviewStatistics | null>(null);
  const datesForStats = useRef<DatesFromTo | null>(null);

  const getStatistic = async (currentDates: DatesFromTo) => {
    datesForStats.current = { ...currentDates };
    setLoading(true);
    setError(null);
    try {
      const statistics = await getOverviewStatistics(currentDates);
      if (
        !datesForStats.current ||
        datesForStats.current.from !== currentDates.from ||
        datesForStats.current.to !== currentDates.to
      ) {
        return;
      }

      setStatistics(statistics);
    } catch (err) {
      if (datesForStats.current) {
        if ((err as SQLError).message.includes('no such table')) {
          setStatistics({
            total: {
              avgRoundTime: 0,
              exCnt: 0,
              maxRoundTime: 0,
              roundCnt: 0,
            },
          });
          return;
        }
        setError(__DEV__ ? (err as SQLError).message : t('overview.read_settings_error'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      datesForStats.current = null;
    };
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    void getStatistic(dates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates, expanded, refresh]);

  const triggerExpand = () => {
    if (expanded) {
      datesForStats.current = null;
      setLoading(false);
    }
    setExpanded((pv) => !pv);
    setError(null);
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        borderTopWidth: 1,
        borderTopColor: Colors[scheme].textRGBA(0.2),
      })}
      onPress={triggerExpand}>
      <View style={styles.expandIndicator}>
        <Text>{!expanded && t('overview.stats_expand')}</Text>
        <Entypo
          name={expanded ? 'chevron-thin-down' : 'chevron-thin-up'}
          size={expanded ? 15 : 24}
          color={Colors[scheme].primary}
        />
      </View>

      <View
        style={{
          minHeight: expanded ? 85 : void 0,
        }}>
        {error ? (
          <Alert content={error} type="error" onPress={triggerExpand} />
        ) : loading ? (
          <ActivityIndicator color={Colors[scheme].primary} />
        ) : (
          expanded && <StatisticsTable statistics={statistics} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expandIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Layout.spacing(),
  },
});
