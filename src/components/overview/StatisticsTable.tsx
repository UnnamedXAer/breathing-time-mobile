import { t } from 'i18n-js';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OverviewStatistics } from '../../../storage/sqlite';
import Layout from '../../constants/Layout';
import { Text } from '../ui/Themed';

interface Props {
  statistics: OverviewStatistics | null;
}

export default function StatisticsTable({ statistics }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.statistics}>
        {statistics && (
          <>
            <StatisticsTableColumn
              side="left"
              data={statistics.total}
              title={t('overview.stats_title_total')}
            />
            {statistics.range && (
              <StatisticsTableColumn
                side="right"
                data={statistics.range}
                title={t('overview.stats_title_range')}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

interface ColumnProps {
  side: 'right' | 'left';
  title: string;
  data: OverviewStatistics['total'] | NonNullable<OverviewStatistics['range']>;
}

function StatisticsTableColumn({ data, title, side }: ColumnProps) {
  return (
    <View
      style={{
        [side === 'left' ? 'marginRight' : 'marginLeft']: Layout.spacing(1),
        flex: 0.5,
        alignItems: 'center',
      }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.hCell}>{t('overview.stats_sessions')}</Text>
        <Text style={styles.vCell}>{data.exCnt}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.hCell}>{t('overview.stats_rounds')}</Text>
        <Text style={styles.vCell}>{data.roundCnt}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.hCell}>{t('overview.stats_avg_round_time')}</Text>
        <Text style={styles.vCell}>{data.avgRoundTime} s</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.hCell}>{t('overview.stats_max_round_time')}</Text>
        <Text style={styles.vCell}>{data.maxRoundTime} s</Text>
      </View>
    </View>
  );
}

const fontSize = (() => {
  let factor = 1.6;
  if (Layout.window.width < 350) factor = 1.4;
  else if (Layout.window.width < 600) factor = 1.8;
  else factor = 2.5;
  return Layout.spacing(factor);
})();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  statistics: {
    flexDirection: 'row',
    maxWidth: 430,
  },
  title: {
    fontSize,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  hCell: {
    fontSize,
    width: Layout.window.width < 350 ? 90 : Layout.window.width < 410 ? 110 : 130,
  },
  vCell: {
    fontSize,
    flex: 1,
  },
});
