import { SQLError } from 'expo-sqlite';
import { t } from 'i18n-js';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Share,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createTables, saveRounds } from '../../../storage/sqlite';
import Header from '../../components/breathingExercise/Header';
import SummaryResultsHeader from '../../components/breathingExercise/SummaryResultsHeader';
import AppButton from '../../components/ui/Button';
import { Text } from '../../components/ui/Themed';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { calculateAverage, prepareShareText } from '../../helpers/summary';
import useColorScheme from '../../hooks/useColorScheme';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { cleanExercise, finishExercise } from '../../store/exercise';
import { RootState } from '../../store/types';

interface Props extends ExerciseTabScreenProps<'Summary'> {}

function getRandomResults() {
  const len = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  const out = [
    Math.floor(Math.random() * (256000 - 30000 + 1) + 30000) / 1000,
    Math.floor(Math.random() * (256000 - 30000 + 1) + 30000) / 1000,
    Math.floor(Math.random() * (256000 - 30000 + 1) + 30000) / 1000,
    Math.floor(Math.random() * (256000 - 30000 + 1) + 30000) / 1000,
    Math.floor(Math.random() * (256000 - 30000 + 1) + 30000) / 1000,
  ];

  out.length = len;
  return out;
}

export default function SummaryScreen({ navigation }: Props) {
  const [saving, setSaving] = useState(false);
  const [savingError, setSavingError] = useState<null | string>(null);
  const [resultsSaved, setResultsSaved] = useState(false);

  const holdTimes = useSelector((state: RootState) => state.exercise.holdTimes);
  //   const [holdTimes, setHoldTimes] = useState(getRandomResults());
  const [selectedRounds, setSelectedRounds] = useState<boolean[]>(
    Array(holdTimes.length).fill(true),
  );

  const scheme = useColorScheme();
  const dispatch = useDispatch();

  const averageTime = calculateAverage(holdTimes);

  const saveResults = async () => {
    const toSave: number[] = [];
    for (let i = 0; i < holdTimes.length; i++) {
      if (selectedRounds[i]) {
        toSave.push(holdTimes[i]);
      }
    }

    if (toSave.length === 0) {
      ToastAndroid.show('Nothing to save', ToastAndroid.SHORT);
      return;
    }

    setSaving(true);
    try {
      await createTables();
      const r = await saveRounds(toSave);
      setResultsSaved(true);
      //   const newHoldTimes = getRandomResults();
      //   setHoldTimes(newHoldTimes);
      //   setSelectedRounds(Array(newHoldTimes.length).fill(true));
      ToastAndroid.show(`Rounds saved (${r.rowsAffected})`, ToastAndroid.SHORT);
      console.log('rounds saved');
    } catch (err) {
      console.log('creating err', err);
      setSavingError((err as SQLError).message);
    }
    setSaving(false);
  };

  useEffect(() => {
    dispatch(finishExercise());
    return () => {
      //   dispatch(cleanExercise());
    };
  }, [dispatch]);

  const share = async () => {
    const text = prepareShareText(holdTimes, averageTime);
    try {
      await Share.share(
        {
          title: t('ex.summary.share_results_title'),
          message: text,
        },
        {
          dialogTitle: t('ex.summary.share_results_dialog_title'),
          subject: t('ex.summary.share_results_title'),
          tintColor: Colors[scheme].primary,
        },
      );
    } catch (err) {
      ToastAndroid.show(t('ex.summary.fail_to_open_share_msg'), ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('ex.summary.title')} />

      {holdTimes.length === 0 ? (
        <Text style={styles.noRoundsText}>{t('ex.summary.no_rounds_finished')}</Text>
      ) : (
        <>
          <FlatList
            style={{ marginTop: Layout.spacing(2) }}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<SummaryResultsHeader onPress={share} />}
            data={holdTimes}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ index: idx, item: time }) => {
              return (
                <TouchableOpacity
                  disabled={resultsSaved || saving}
                  onPress={() =>
                    setSelectedRounds((pv) => {
                      const updated = [...pv];
                      updated[idx] = !updated[idx];
                      return updated;
                    })
                  }
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
          <View style={{ flexGrow: 1 }}>
            <Text>Only checked rows will be saved</Text>
            <AppButton
              title={t(
                resultsSaved ? 'ex.summary.save_success' : 'ex.summary.save_results',
              )}
              mode="contained"
              loading={saving}
              disabled={resultsSaved}
              onPress={saveResults}
            />
            {savingError && (
              <Text
                style={{
                  color: Colors.colors.error,
                  textAlign: 'center',
                  marginTop: Layout.spacing(),
                }}>
                {savingError}
              </Text>
            )}
          </View>
        </>
      )}
      <AppButton
        title={t('header.home')}
        mode="outlined"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: Layout.window.height > 700 ? Layout.spacing(2) : 0,
  },
  noRoundsText: {
    fontSize: Layout.spacing(3),
    marginVertical: Layout.spacing(5),
    textAlign: 'center',
  },
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
