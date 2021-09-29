import { t } from 'i18n-js';
import React, { useEffect } from 'react';
import { Share, StyleSheet, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/breathingExercise/Header';
import AppButton from '../../components/ui/Button';
import ShareButton from '../../components/ui/ShareButton';
import { Text } from '../../components/ui/Themed';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { cleanExercise, finishExercise } from '../../store/exercise';
import { RootState } from '../../store/types';

interface Props extends ExerciseTabScreenProps<'Summary'> {}

function calculateAverage(holdTimes: number[]) {
  if (holdTimes.length === 0) {
    return '-';
  }

  return (holdTimes.reduce((pv, v) => pv + v) / holdTimes.length)
    .toFixed(3)
    .replace(/((\.0+)|(0+))$/g, '');
}

export default function SummaryScreen({ navigation }: Props) {
  const holdTimes = useSelector((state: RootState) => state.exercise.holdTimes);
  const scheme = useColorScheme();
  const dispatch = useDispatch();

  const averageTime = calculateAverage(holdTimes);

  useEffect(() => {
    dispatch(finishExercise());
    return () => {
      dispatch(cleanExercise());
    };
  }, [dispatch]);

  const share = async () => {
    let text = '';
    holdTimes.forEach((v, idx) => {
      if (idx > 0) {
        text += '\n';
      }
      text += `${t('ex.summary.round_with_num', [idx + 1])}:\t${v} s`;
    });
    if (holdTimes.length > 1) {
      text += `\n\n${t('ex.summary.averageTime')} ${averageTime} ${t(
        'ex.summary.seconds',
        {
          count: +averageTime,
        },
      )}.`;
    }

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
      <View style={styles.results}>
        {holdTimes.length === 0 ? (
          <Text
            style={{
              fontSize: Layout.spacing(3),
              marginVertical: Layout.spacing(5),
              textAlign: 'center',
            }}>
            {t('ex.summary.no_rounds_finished')}
          </Text>
        ) : (
          <>
            <ShareButton onPress={share} style={styles.shareBtn} />
            {holdTimes.map((time, idx) => {
              return (
                <View
                  style={[
                    styles.row,
                    {
                      backgroundColor: idx % 2 ? Colors[scheme].textRGBA(0.06) : void 0,
                    },
                  ]}
                  key={idx}>
                  <Text style={styles.cellHeader}>
                    {t('ex.summary.round_with_num', [idx + 1])}
                  </Text>
                  <Text style={styles.cellText}>{time} s</Text>
                </View>
              );
            })}
          </>
        )}
      </View>

      {holdTimes.length > 0 && (
        <View style={styles.averageContainer}>
          <Text style={styles.averageText}>
            {t('ex.summary.averageTime')}{' '}
            <Text style={{ fontWeight: 'bold' }}> {averageTime}</Text>{' '}
            {t('ex.summary.seconds', {
              count: +averageTime,
            })}
          </Text>
        </View>
      )}

      <AppButton
        title={t('header.home')}
        mode="contained"
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
  },
  results: {},
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
  shareBtn: {
    alignSelf: 'flex-end',
    marginTop: Layout.spacing(2),
  },
});
