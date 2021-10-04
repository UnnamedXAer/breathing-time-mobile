import { SQLError } from 'expo-sqlite';
import { t } from 'i18n-js';
import React, { useEffect, useRef, useState } from 'react';
import {
  ColorValue,
  FlatList,
  Share,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createTables, saveRounds } from '../../../storage/sqlite';
import ExerciseResultsTable from '../../components/breathingExercise/ExerciseResultsTable';
import Header from '../../components/breathingExercise/Header';
import SummaryResultsHeader from '../../components/breathingExercise/SummaryResultsHeader';
import AppButton from '../../components/ui/Button';
import { Text } from '../../components/ui/Themed';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { shareExerciseResults } from '../../helpers/share';
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
    let i = 0;
    try {
      while (i < 1) {
        await createTables();
        await saveRounds(toSave, completeDate.current);
        //   setResultsSaved(true);
        const newHoldTimes = getRandomResults();
        setHoldTimes(newHoldTimes);
        setSelectedRounds(Array(newHoldTimes.length).fill(true));
        i++;
      }
      ToastAndroid.show(t('ex.summary.rounds_saved_toast'), ToastAndroid.SHORT);
    } catch (err) {
      setSavingError((err as SQLError).message);
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
});
