import * as React from 'react';
import { Share, StyleSheet, ToastAndroid, View } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/breathingExercise/Header';
import AppButton from '../../components/ui/Button';
import ShareButton from '../../components/ui/ShareButton';
import { Text } from '../../components/ui/Themed';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';

import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import { RootState } from '../../store/types';

interface Props extends ExerciseTabScreenProps<'Summary'> {}

export default function SummaryScreen({ navigation }: Props) {
  const holdTimes = useSelector((state: RootState) => state.exercise.holdTimes);
  const scheme = useColorScheme();

  const averageTime = (holdTimes.reduce((pv, v) => pv + v) / holdTimes.length)
    .toFixed(3)
    .replace(/((\.0+)|(0+))$/g, '');

  const share = async () => {
    let text = '';
    holdTimes.forEach((v, idx) => {
      if (idx > 0) {
        text += '\n';
      }
      text += `Round ${idx + 1}:\t${v} s`;
    });
    if (holdTimes.length > 1) {
      text += `\n\nAverage time: ${averageTime} seconds.`;
    }

    try {
      await Share.share(
        {
          title: 'Breathing Exercise Results',
          message: text,
        },
        {
          dialogTitle: 'Share my results',
          subject: 'Breathing Exercise Results',
          tintColor: Colors[scheme].primary,
        },
      );
    } catch (err) {
      ToastAndroid.show('Sorry, could not open share dialog.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Summary" />
      <View style={styles.results}>
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
              <Text style={styles.cellHeader}>Round {idx + 1}</Text>
              <Text style={styles.cellText}>{time} s</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.averageContainer}>
        <Text style={styles.averageText}>
          Average Time: <Text style={{ fontWeight: 'bold' }}> {averageTime}</Text> seconds
        </Text>
      </View>

      <AppButton
        title="Home"
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
