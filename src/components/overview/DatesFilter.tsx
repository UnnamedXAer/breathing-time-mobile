import { format } from 'date-fns';
import { t } from 'i18n-js';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { ColorSchemeName } from '../../hooks/useColorScheme';
import { DatesFromTo } from '../../types/types';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import { getDateOptions } from '../../helpers/date';
import AppButton from '../ui/Button';

interface Props {
  dates: DatesFromTo;
  scheme: ColorSchemeName;
  onDateChange: (updatesDates: DatesFromTo) => void;
}

export default function DatesFilter({ dates, scheme, onDateChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const color = Colors[scheme].text;
  const [selectedDateInput, setSelectedDateInput] = useState<'from' | 'to'>('from');
  const dateOptions = getDateOptions();

  const dateChangeHandler = (ev: Event | AndroidEvent, selectedDate?: Date) => {
    const currentDate =
      ev.type === 'neutralButtonPressed'
        ? null
        : selectedDate || dates[selectedDateInput];

    setShowDatePicker(Platform.OS === 'ios');

    onDateChange({ ...dates, [selectedDateInput]: currentDate });
  };

  return (
    <View style={styles.datesContainer}>
      {showDatePicker && (
        <DateTimePicker
          value={dates[selectedDateInput] || new Date()}
          onChange={dateChangeHandler}
          mode="date"
          maximumDate={new Date()}
          neutralButtonLabel={t('common.clear')}
        />
      )}
      <AppButton
        onPress={() => {
          setSelectedDateInput('from');
          setShowDatePicker(true);
        }}
        size="small"
        color={dates.from ? color : Colors[scheme].textRGBA(0.6)}
        title={
          dates.from
            ? format(dates.from, 'P', dateOptions)
            : t('overview.start_date_placeholder')
        }
        containerStyle={styles.dateBtnContainer}
      />
      <AppButton
        onPress={() => {
          setSelectedDateInput('to');
          setShowDatePicker(true);
        }}
        size="small"
        color={dates.to ? color : Colors[scheme].textRGBA(0.6)}
        title={
          dates.to
            ? format(dates.to, 'P', dateOptions)
            : t('overview.end_date_placeholder')
        }
        containerStyle={styles.dateBtnContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    padding: Layout.spacing(1),
  },
  dateBtnContainer: {
    width: 120,
    height: 38,
  },
});
