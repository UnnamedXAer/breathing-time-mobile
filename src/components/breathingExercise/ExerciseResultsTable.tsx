import { t } from 'i18n-js';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { calculateAverage } from '../../helpers/summary';
import useColorScheme from '../../hooks/useColorScheme';
import SummaryResultsHeader from './SummaryResultsHeader';

interface Props {
  exercise: {
    date: Date;
    rounds: number[];
  };
  onRowPress: (idx: number) => void;
  share: () => void;
  disabled?: boolean;
  selectedRounds: boolean[];
}

const ExerciseResultsTable = ({
  exercise,
  onRowPress,
  share,
  disabled,
  selectedRounds,
}: Props) => {
  const scheme = useColorScheme();
  const averageTime = calculateAverage(exercise.rounds);

  return (
    <>
      <FlatList
        style={{ marginTop: Layout.spacing(2) }}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<SummaryResultsHeader onPress={share} />}
        data={exercise.rounds}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ index: idx, item: time }) => {
          return (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onRowPress(idx)}
              style={[
                styles.row,
                {
                  backgroundColor: idx % 2 ? Colors[scheme].textRGBA(0.06) : void 0,
                },
              ]}
              key={idx}>
              <Text style={styles.cellHeader}>
                {selectedRounds[idx] ? '✔' : '➖'}{' '}
                {t('ex.summary.round_with_num', [idx + 1])}
              </Text>
              <Text style={styles.cellText}>{time} s</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.averageContainer}>
        <Text style={styles.averageText}>
          {t('ex.summary.averageTime')}{' '}
          <Text style={{ fontWeight: 'bold' }}> {averageTime}</Text>{' '}
          {t('ex.summary.seconds', {
            count: +averageTime,
          })}
        </Text>
      </View>
    </>
  );
};

export default ExerciseResultsTable;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing(2),
    paddingVertical: Layout.spacing(),
  },
  cellHeader: {
    fontSize: Layout.spacing(2.5),
    fontWeight: 'bold',
    paddingRight: Layout.spacing(),
  },
  cellText: {
    textAlign: 'right',
    fontSize: Layout.spacing(2.5),
    paddingLeft: Layout.spacing(),
    width: 120,
  },
  averageContainer: {
    marginVertical: Layout.spacing(2),
  },
  averageText: {
    fontSize: Layout.spacing(2.5),
  },
});
