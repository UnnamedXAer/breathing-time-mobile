import { t } from 'i18n-js';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import ShareButton from '../ui/ShareButton';
import { Text } from '../ui/Themed';

interface Props {
  onPress: () => void;
}

const SummaryResultsHeader = ({ onPress: share }: Props) => {
  const scheme = useColorScheme();

  return (
    <View style={[styles.resultsHeader, { backgroundColor: Colors[scheme].background }]}>
      <Text style={styles.resultsHeaderText}>{t('ex.summary.results_header')}</Text>
      <ShareButton onPress={share} />
    </View>
  );
};

export default SummaryResultsHeader;

const styles = StyleSheet.create({
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: Layout.spacing(),
    paddingHorizontal: Layout.spacing(),
    elevation: 6,
  },
  resultsHeaderText: {
    fontSize: Layout.spacing(3),
    fontWeight: 'bold',
  },
  dateText: {
    textAlign: 'center',
  },
});
