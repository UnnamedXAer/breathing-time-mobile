import { format } from 'date-fns';
import { t } from 'i18n-js';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { getDateOptions } from '../../helpers/date';
import { calculateAverage } from '../../helpers/summary';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';
import SummaryResultsHeader from './SummaryResultsHeader';

interface Props {
  exercise: {
    date: Date;
    rounds: number[];
  };
  onRowPress: (idx: number) => void;
  share: () => void;
  disabled?: boolean;
  selectedRounds?: boolean[];
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

  const cellFontSize = Layout.spacing(
    Layout.window.height > 700 ? 2.3 : exercise.rounds.length > 3 ? 1.7 : 2,
  );

  return (
    <>
      <Text style={styles.completeDateText}>
        {t('ex.summary.completed_at', [
          format(exercise.date, 'eeee, do MMMM, p', getDateOptions()),
        ])}
      </Text>
      <FlatList
        style={styles.list}
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
              <Text style={[styles.cellHeader, { fontSize: cellFontSize }]}>
                {selectedRounds ? (selectedRounds[idx] ? '✔' : '➖') + ' ' : null}
                {t('ex.summary.round_with_num', [idx + 1])}
              </Text>
              <Text
                style={[
                  styles.cellText,
                  {
                    fontSize: cellFontSize,
                  },
                ]}>
                {time} s
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.averageContainer}>
        <Text style={{ fontSize: cellFontSize, textAlign: 'center' }}>
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
  list: { marginTop: Layout.spacing(2) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing(2),
    paddingVertical: Layout.spacing(),
  },
  cellHeader: {
    fontWeight: 'bold',
    paddingRight: Layout.spacing(),
  },
  cellText: {
    textAlign: 'right',
    paddingLeft: Layout.spacing(),
    width: 120,
  },
  averageContainer: {
    marginVertical: Layout.spacing(2),
    flexGrow: 1,
  },
  completeDateText: { textAlign: 'center' },
});
