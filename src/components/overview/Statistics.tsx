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

interface Props {
  dates: DatesFromTo;
}

export default function Statistics({ dates }: Props) {
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
      setLoading(false);
    } catch (err) {
      if (datesForStats.current) {
        setError(__DEV__ ? (err as SQLError).message : t('overview.read_settings_error'));
      }
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
  }, [dates, expanded]);

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
        <Text>{!expanded && 'Expand'}</Text>
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
          expanded && (
            <View style={styles.statistics}>
              {statistics && (
                <>
                  <View style={{ marginRight: Layout.spacing(1) }}>
                    <Text>Total:</Text>
                    <Text>Sessions: {statistics.total.exCnt} </Text>
                    <Text>Rounds: {statistics.total.roundCnt}</Text>
                    <Text>Avg round time: {statistics.total.avgRoundTime}s</Text>
                    <Text>Max round time: {statistics.total.maxRoundTime}s</Text>
                  </View>
                  {statistics.range && (
                    <View style={{ marginLeft: Layout.spacing(1) }}>
                      <Text>Selected date range:</Text>
                      <Text>Sessions: {statistics.range.exCnt} </Text>
                      <Text>Rounds: {statistics.range.roundCnt}</Text>
                      <Text>Avg round time: {statistics.range.avgRoundTime}s</Text>
                      <Text>Max round time: {statistics.range.maxRoundTime}s</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          )
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
  statistics: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
