import Constants from 'expo-constants';
import { t } from 'i18n-js';
import { ExerciseState } from '../store/exercise/types';

export function calculateAverage(holdTimes: number[]) {
  if (holdTimes.length === 0) {
    return '-';
  }

  return (holdTimes.reduce((pv, v) => pv + v) / holdTimes.length)
    .toFixed(3)
    .replace(/((\.0+)|(0+))$/g, '');
}

export function prepareShareText(date: Date, holdTimes: ExerciseState['holdTimes']) {
  const averageTime = calculateAverage(holdTimes);

  const text = [
    Constants.manifest!.name,
    '\n_______________________\n',
    t('ex.title'),
    '\n',
    date.toLocaleString(),
    '\n\n',
    t('ex.summary.results_header'),
  ];
  holdTimes.forEach((v, idx) => {
    text.push(`\n${t('ex.summary.round_with_num', [idx + 1])} \t-> \t${v} s`);
  });
  if (holdTimes.length > 1) {
    text.push(
      `\n\n${t('ex.summary.averageTime')} ${averageTime} ${t('ex.summary.seconds', {
        count: +averageTime,
      })}.`,
    );
  }

  return text.join('');
}
