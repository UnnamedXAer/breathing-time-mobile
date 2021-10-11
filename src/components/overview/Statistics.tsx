import { Entypo } from '@expo/vector-icons';
import { SQLError } from 'expo-sqlite';
import { t } from 'i18n-js';
import React, { useEffect, useState } from 'react';
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
  const [expanded, setExpanded] = useState(true);
  const [statistics, setStatistics] = useState<OverviewStatistics | null>(null);

  const getStatistic = async () => {
    setLoading(true);
    try {
      const statistics = await getOverviewStatistics(dates);
      setStatistics(statistics);
    } catch (err) {
      setError(__DEV__ ? (err as SQLError).message : t('overview.read_settings_error'));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }
    void getStatistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates, expanded]);

  const triggerExpand = () => {
    setExpanded((pv) => !pv);
    console.log('triggering');
    setError(null);
  };

  console.log(expanded);

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
                  <Text>Sessions: {statistics.totalExCnt} </Text>
                  <Text>Rounds: {statistics.totalRoundCnt}</Text>
                  <Text>Avg round time: {statistics.totalAvgRoundTime}s</Text>
                </View>
                {Number.isFinite(statistics.rangeExCnt) && (
                  <View style={{ marginLeft: Layout.spacing(1) }}>
                    <Text>Selected date range:</Text>
                    <Text>Sessions: {statistics.rangeExCnt} </Text>
                    <Text>Rounds: {statistics.rangeRoundCnt}</Text>
                    <Text>Avg round time: {statistics.rangeAvgRoundTime}s</Text>
                  </View>
                )}
              </>
            )}
          </View>
        )
      )}
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
    minHeight: 75,
    backgroundColor: 'orange',
  },
});
