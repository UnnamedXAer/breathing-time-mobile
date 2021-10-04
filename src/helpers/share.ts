import { t } from 'i18n-js';
import { ColorValue, Share, ToastAndroid } from 'react-native';
import { prepareShareText } from './summary';

export async function shareExerciseResults(
  date: Date,
  rounds: number[],
  tintColor?: ColorValue,
) {
  const text = prepareShareText(date, rounds);
  try {
    await Share.share(
      {
        title: t('ex.summary.share_results_title'),
        message: text,
      },
      {
        dialogTitle: t('ex.summary.share_results_dialog_title'),
        subject: t('ex.summary.share_results_title'),
        tintColor: tintColor,
      },
    );
  } catch (err) {
    ToastAndroid.show(t('ex.summary.fail_to_open_share_msg'), ToastAndroid.SHORT);
  }
}
