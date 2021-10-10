import { SQLError } from 'expo-sqlite';
import { t } from 'i18n-js';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createTables, saveRounds } from '../../../storage/sqlite';
import ExerciseResultsTable from '../../components/breathingExercise/ExerciseResultsTable';
import Header from '../../components/breathingExercise/Header';
import Alert from '../../components/ui/Alert';
import AppButton from '../../components/ui/Button';
import { Text } from '../../components/ui/Themed';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { shareExerciseResults } from '../../helpers/share';
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

  //   const holdTimes = useSelector((state: RootState) => state.exercise.holdTimes);
  const [holdTimes, setHoldTimes] = useState(getRandomResults());
  const [selectedRounds, setSelectedRounds] = useState<boolean[]>(
    Array(holdTimes.length).fill(true),
  );

  const completeDate = useRef(new Date());

  const scheme = useColorScheme();
  const dispatch = useDispatch();

  const saveResults = async () => {
    const toSave: number[] = [];
    for (let i = 0; i < holdTimes.length; i++) {
      if (selectedRounds[i]) {
        toSave.push(holdTimes[i]);
      }
    }

    if (toSave.length === 0) {
      ToastAndroid.show(t('ex.summary.nothing_to_save'), ToastAndroid.SHORT);
      return;
    }

    setSaving(true);
    setSavingError(null);
    let i = 0;
    try {
      do {
        await createTables();
        await saveRounds(toSave, completeDate.current);
        setResultsSaved(true);
        // const newHoldTimes = getRandomResults();
        // setHoldTimes(newHoldTimes);
        // setSelectedRounds(Array(newHoldTimes.length).fill(true));
        i++;
      } while (__DEV__ && i < 1);
      ToastAndroid.show(t('ex.summary.rounds_saved_toast'), ToastAndroid.SHORT);
    } catch (err) {
      setSavingError(__DEV__ ? (err as SQLError).message : t('ex.summary.save_error'));
    }
    setSaving(false);
  };

  useEffect(() => {
    completeDate.current = new Date();
    dispatch(finishExercise());
    return () => {
      dispatch(cleanExercise());
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header title={t('ex.summary.title')} />

      {holdTimes.length === 0 ? (
        <Text style={styles.noRoundsText}>{t('ex.summary.no_rounds_finished')}</Text>
      ) : (
        <>
          <ExerciseResultsTable
            selectedRounds={selectedRounds}
            exercise={{
              date: completeDate.current,
              rounds: holdTimes,
            }}
            share={() =>
              shareExerciseResults(
                completeDate.current,
                holdTimes,
                Colors[scheme].primary,
              )
            }
            disabled={resultsSaved || saving}
            onRowPress={(idx: number) =>
              setSelectedRounds((pv) => {
                const updated = [...pv];
                updated[idx] = !updated[idx];
                return updated;
              })
            }
          />
          <View style={styles.saveContainer}>
            <Text>
              {t('ex.summary.only_checked_will_save')} (
              {selectedRounds.filter((x) => x).length}/{holdTimes.length})
            </Text>
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
              <Alert
                content={savingError}
                hideIcon
                onPress={() => setSavingError(null)}
                type="error"
                textStyle={{ textAlign: 'auto' }}
              />
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
  saveContainer: { flexGrow: 1, alignItems: 'center' },
});
